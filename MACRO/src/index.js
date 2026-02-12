const puppeteer = require('puppeteer');
const { delay } = require('./utils/delay');

const KEYWORD = '립밤';
const PRODUCT_URL =
  'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000235282';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  for (let i = 0; i < 15; i++) {
    console.log(`🔁 ${i + 1}번째 반복`);

    try {
      /* 1️⃣ 메인 접속 */
      await page.goto('https://www.oliveyoung.co.kr', {
        waitUntil: 'networkidle2',
      });
      await delay(2000, 3000);

      /* 2️⃣ 검색 */
      await page.waitForSelector('#query', { visible: true });
      await page.click('#query', { clickCount: 3 });
      await delay(300, 600);

      await page.type('#query', KEYWORD, { delay: 120 });
      await delay(500, 800);
      await page.keyboard.press('Enter');

      /* 3️⃣ 검색결과 대기 */
      await page.waitForSelector('.prd_info', { timeout: 15000 });
      await delay(2000, 3000);

      /* 4️⃣ 상품 이동 */
      await page.goto(PRODUCT_URL, {
        waitUntil: 'networkidle2',
      });
      await delay(3000, 4000);

      /* ============================= */
      /* 5️⃣ 이미지 넘기기 */
      /* ============================= */

      const nextBtnSelector = '.swiper-button-next';

      try {
        await page.waitForSelector(nextBtnSelector, { timeout: 5000 });

        const swipeCount = Math.floor(Math.random() * 3) + 1;

        for (let s = 0; s < swipeCount; s++) {
          await page.hover(nextBtnSelector);
          await delay(500, 800);

          await page.click(nextBtnSelector);
          await delay(1500, 2500);
        }
      } catch (e) {
        console.log('⚠️ 이미지 스와이프 실패');
      }

      /* ============================= */
      /* 6️⃣ 스크롤 */
      /* ============================= */

      for (let k = 0; k < 3; k++) {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight * 0.7);
        });
        await delay(1500, 2500);
      }

      /* ============================= */
      /* 7️⃣ 리뷰 클릭 */
      /* ============================= */

      try {
        await page.click('a[href="#reviewInfo"]');
        await delay(3000, 4000);
      } catch (e) {
        console.log('⚠️ 리뷰 클릭 실패');
      }

      await delay(4000, 6000);
    } catch (e) {
      console.log('⚠️ 오류 발생 → 다음 반복 진행');
    }
  }

  console.log('✅ 모든 반복 완료');
})();
