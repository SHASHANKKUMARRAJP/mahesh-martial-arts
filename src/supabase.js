import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

const getHeaders = () => ({
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
});

/**
 * Fetches data from the Supabase key-value table.
 * @param {string} key Unique identifier (e.g. 'gallery', 'sensei_photo')
 * @returns {Promise<any | null>} The parsed JSON data or null if not found/unconfigured.
 */
export const fetchDojoData = async (key) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/dojo_data?key=eq.${key}&select=value`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data[0].value;
      }
    }
  } catch (err) {
    console.warn(`Supabase fetch failed for key ${key}:`, err);
  }
  return null;
};

/**
 * Upserts data into the Supabase key-value table.
 * @param {string} key Unique identifier (e.g. 'gallery', 'sensei_photo')
 * @param {any} value Any JSON-serializable value
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export const saveDojoData = async (key, value) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  try {
    // 1. Postgrest Upsert syntax: POST with resolution=merge-duplicates header
    const res = await fetch(`${SUPABASE_URL}/rest/v1/dojo_data`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ key, value })
    });
    
    // 2. Fallback: If upsert is not supported, do a PUT on the specific row resource
    if (!res.ok) {
      const putRes = await fetch(`${SUPABASE_URL}/rest/v1/dojo_data?key=eq.${key}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ key, value })
      });
      return putRes.ok;
    }
    return true;
  } catch (err) {
    console.error(`Supabase save failed for key ${key}:`, err);
    return false;
  }
};

/**
 * Checks if Supabase is properly configured.
 */
export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Attempts to create a public storage bucket.
 * @param {string} bucketName Name of the storage bucket
 * @returns {Promise<boolean>} True if successfully created, false otherwise.
 */
export const createDojoBucket = async (bucketName) => {
  if (!isSupabaseConfigured) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: bucketName,
        name: bucketName,
        public: true,
        file_size_limit: 52428800, // 50MB limit
        allowed_mime_types: ['image/*', 'video/*']
      })
    });
    return res.ok;
  } catch (err) {
    console.warn(`Could not create bucket '${bucketName}':`, err);
    return false;
  }
};

/**
 * Uploads a file to a Supabase Storage bucket and returns its public URL.
 * @param {string} bucketName Name of the storage bucket
 * @param {File} file The file object to upload
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
export const uploadDojoFile = async (bucketName, file) => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase credentials not configured');
  }

  // Sanitize filename to avoid weird character issues in URLs
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${Date.now()}_${cleanName}`;

  try {
    // 1. Try to upload the file directly
    let res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucketName}/${filePath}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': file.type
      },
      body: file
    });

    // 2. If it fails due to bucket not existing, try to create bucket and retry
    if (!res.ok) {
      const errText = await res.text();
      let errJson = {};
      try { errJson = JSON.parse(errText); } catch (_) {}
      
      const isBucketError = errText.toLowerCase().includes('bucket not found') || 
                           errJson.message?.toLowerCase().includes('bucket not found');

      if (isBucketError) {
        console.log(`Bucket '${bucketName}' not found. Attempting to create it...`);
        const created = await createDojoBucket(bucketName);
        if (created) {
          // Retry the upload
          res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucketName}/${filePath}`, {
            method: 'POST',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': file.type
            },
            body: file
          });
        }
      }
    }

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`Upload failed (Status ${res.status}): ${errorMsg}`);
    }

    // 3. Return the public URL
    return `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${filePath}`;
  } catch (err) {
    console.error(`Supabase file upload failed for ${file.name}:`, err);
    throw new Error(
      `File upload failed: ${err.message}. Please verify that a public storage bucket named '${bucketName}' is created in your Supabase project and that its policies permit anonymous uploads. Alternatively, use a web URL link.`
    );
  }
};

