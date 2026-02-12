const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 1. 네이버 접속
    await page.goto("https://www.naver.com", { waitUntil: "networkidle2" });
    console.log("네이버 접속 완료!");

    // 2. 검색어 입력
    const searchWord = "강승우";
    await page.type("input[name='query']", searchWord);

    // 3. 검색 버튼 클릭 + 페이지 이동 대기
    await Promise.all([
        page.click("button[type='submit']"),
        page.waitForNavigation({ waitUntil: "networkidle2" })
    ]);
    console.log("검색 결과 페이지 로딩 완료!");

    // 4. AJAX 로딩 고려: div.cm_inner_bx 최소 2개 로드될 때까지 기다리기
    async function waitForElements(page, selector, minLength = 2, timeout = 15000) {
        const polling = 500;
        const maxTime = Date.now() + timeout;
        while(Date.now() < maxTime){
            const els = await page.$$(selector);
            if(els.length >= minLength) return els;
            await new Promise(r => setTimeout(r, polling));
        }
        throw new Error(`Timeout: ${selector} 요소를 찾을 수 없습니다.`);
    }

    // 5. 두 번째 div.cm_inner_bx 선택
    const divs = await waitForElements(page, "div.cm_inner_bx");
    const targetDiv = divs[1]; // 두 번째
    console.log("두 번째 div.cm_inner_bx 찾음");

    // 6. div 안의 a 태그 선택
    const aTag = await targetDiv.$("a");
    if(!aTag) throw new Error("a 태그를 찾을 수 없습니다.");
    console.log("a 태그 찾음. Ctrl 클릭 시작!");

    // 7. Ctrl 클릭 30번 반복 (evaluate 안에서 안정적 클릭)
    for (let i = 0; i < 100; i++) {
        await page.evaluate((el) => {
            const evt = new MouseEvent("click", { bubbles: true, ctrlKey: true });
            el.dispatchEvent(evt);
        }, aTag);
        console.log(`클릭 ${i+1}번 완료!`);
        await new Promise(r => setTimeout(r, 200));
    }

    console.log("Ctrl 클릭 종료!");

    await browser.close();
    console.log("브라우저 종료 완료!");
})();
