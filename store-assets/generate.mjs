import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Screenshot 1280x800
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`file://${join(__dirname, 'screenshot.html')}`);
  await page.screenshot({
    path: join(__dirname, 'screenshot-1280x800.png'),
    type: 'png'
  });
  console.log('Generated: screenshot-1280x800.png');

  // Promo small 440x280
  await page.setViewport({ width: 440, height: 280 });
  await page.goto(`file://${join(__dirname, 'promo-small.html')}`);
  await page.screenshot({
    path: join(__dirname, 'promo-small-440x280.png'),
    type: 'png'
  });
  console.log('Generated: promo-small-440x280.png');

  await browser.close();
  console.log('Done!');
}

generateScreenshots().catch(console.error);
