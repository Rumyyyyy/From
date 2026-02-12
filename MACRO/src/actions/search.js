const { SITE } = require('../config/site');
const { delay } = require('../utils/delay');

const searchKeyword = async (page, keyword) => {
  console.log('🔍 검색 키워드:', keyword);

  await page.goto(SITE.HOME);
  await page.waitForLoadState('domcontentloaded');
  await delay(1000, 1500);

  // 검색 인풋
  await page.click('#query');
  await page.fill('#query', keyword);
  await delay(500, 800);

  // 방법 1: 버튼 클릭 (가장 안정적)
  await page.click('#searchSubmit');

  // 방법 2 (대체용): Enter
  // await page.keyboard.press('Enter');

  await delay(2000, 3000);
};

module.exports = { searchKeyword };
