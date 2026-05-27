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
