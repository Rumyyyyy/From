async function naturalScroll(page) {
  console.log('🌀 자연 스크롤');

  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.6);
    });
    await page.waitForTimeout(1200 + Math.random() * 800);
  }
}

module.exports = { naturalScroll };
