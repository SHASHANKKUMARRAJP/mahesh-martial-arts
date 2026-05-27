import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Copy user uploaded images to public folder on start/reload
try {
  const stickImg = 'C:/Users/sshas/.gemini/antigravity-ide/brain/71fe8afc-adef-4daa-9038-0c60c2c9b5ee/media__1779283608623.png';
  const cubeImg = 'C:/Users/sshas/.gemini/antigravity-ide/brain/71fe8afc-adef-4daa-9038-0c60c2c9b5ee/media__1779284084319.png';
  const karateImg = 'C:/Users/sshas/.gemini/antigravity-ide/brain/6e5e8439-4083-43d8-9f4b-4e54768b0cd5/media__1779618387457.png';
  
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public', { recursive: true });
  }
  if (fs.existsSync(stickImg)) {
    fs.copyFileSync(stickImg, './public/stick_rotation.png');
  }
  if (fs.existsSync(cubeImg)) {
    fs.copyFileSync(cubeImg, './public/rubiks_cube.png');
  }
  if (fs.existsSync(karateImg)) {
    fs.copyFileSync(karateImg, './public/advanced_karate.png');
  }
} catch (err) {
  console.error('Error copying media assets:', err);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '.',
        'C:/Users/sshas/.gemini/antigravity',
        'C:/Users/sshas/.gemini/antigravity-ide'
      ]
    }
  }
})
