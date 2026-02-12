const findAndClickTargetProduct = async (page, targetUrl) => {
  // 검색 결과 로딩 대기 (사이트에 맞게 selector 조정 가능)
  await page.waitForSelector('a', { timeout: 10000 });

  const links = await page.$$('a');

  for (const link of links) {
    const href = await link.getAttribute('href');
    if (!href) continue;

    const fullUrl = href.startsWith('http')
      ? href
      : new URL(href, page.url()).href;

    if (fullUrl.includes(targetUrl)) {
      await link.click();
      return;
    }
  }

  throw new Error('❌ 고정 상품을 검색 결과에서 찾지 못함');
};

module.exports = { findAndClickTargetProduct };
