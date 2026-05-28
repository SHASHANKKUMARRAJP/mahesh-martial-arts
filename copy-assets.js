import fs from 'fs';
import path from 'path';

const assets = [
  {
    src: 'C:\\Users\\sshas\\.gemini\\antigravity-ide\\brain\\6e5e8439-4083-43d8-9f4b-4e54768b0cd5\\media__1779618387457.png',
    dest: './public/advanced_karate.png',
    name: 'advanced_karate.png'
  },
  {
    src: 'C:\\Users\\sshas\\.gemini\\antigravity-ide\\brain\\1eceaf0a-179e-49c9-90a9-ba01f6500d66\\media__1779972782398.jpg',
    dest: './public/mahesh_sensei.jpg',
    name: 'mahesh_sensei.jpg'
  }
];

for (const asset of assets) {
  try {
    if (fs.existsSync(asset.src)) {
      fs.copyFileSync(asset.src, asset.dest);
      console.log(`Successfully copied ${asset.name} to public folder.`);
    } else {
      console.error(`Source file does not exist: ${asset.src}`);
    }
  } catch (err) {
    console.error(`Error copying ${asset.name}:`, err);
  }
}
