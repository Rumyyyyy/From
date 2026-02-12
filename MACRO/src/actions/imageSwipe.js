const { delay } = require('../utils/delay');

const swipeImages = async (page, min = 1, max = 4) => {
  const swipeCount =
    Math.floor(Math.random() * (max - min + 1)) + min;

  console.log(`🖼 이미지 스와이프 ${swipeCount}회`);

  const imageSelector = 'div[class^="Image_image"]';

  await page.waitForSelector(imageSelector, {
    visible: true,
    timeout: 15000,
  });

  const box = await page.$eval(imageSelector, el => {
    const r = el.getBoundingClientRect();
    return {
      x: r.x,
      y: r.y,
      width: r.width,
      height: r.height,
    };
  });

  for (let i = 0; i < swipeCount; i++) {
    const startX = box.x + box.width * 0.7;
    const endX = box.x + box.width * 0.3;
    const y = box.y + box.height / 2;

    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 20 });
    await page.mouse.up();

    await delay(1500, 2200);
  }
};

module.exports = { swipeImages };
