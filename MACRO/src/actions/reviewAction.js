async function visitReviewTab(page) {
  console.log('💬 리뷰 탭 방문');

  const REVIEW_TAB = 'a[href="#reviewInfo"]';

  await page.waitForSelector(REVIEW_TAB, { timeout: 5000 });
  await page.click(REVIEW_TAB);
  await page.waitForTimeout(2500 + Math.random() * 2000);

  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
}

module.exports = { visitReviewTab };
