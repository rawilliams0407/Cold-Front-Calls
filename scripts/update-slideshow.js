import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/hero-slideshow');
const OUTPUT_FILE = path.join(__dirname, '../src/data/hero-images.json');

// Extensions to look for
const VALID_EXTANSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function updateSlideshow() {
    try {
        if (!fs.existsSync(IMAGES_DIR)) {
            console.error(`Directory not found: ${IMAGES_DIR}`);
            process.exit(1);
        }

        const files = fs.readdirSync(IMAGES_DIR);

        const images = files
            .filter(file => VALID_EXTANSIONS.includes(path.extname(file).toLowerCase()))
            .sort() // Alphanumeric sort ensures 01.jpg comes before 02.jpg
            .map(file => `/hero-slideshow/${file}`);

        const jsonContent = JSON.stringify(images, null, 2);

        // Ensure output dir exists
        const outputDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, jsonContent);

        console.log(`✅ Successfully updated slideshow with ${images.length} images.`);
        console.log(`Mapped to: ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error updating slideshow:', error);
        process.exit(1);
    }
}

updateSlideshow();
