import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\sshas\\.gemini\\antigravity-ide\\brain\\6e5e8439-4083-43d8-9f4b-4e54768b0cd5\\media__1779618387457.png';
const dest = './public/advanced_karate.png';

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied advanced_karate.png to public folder.');
  } else {
    console.error('Source file does not exist:', src);
  }
} catch (err) {
  console.error('Error copying file:', err);
}
