"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
async function getEngName(id) {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1440,
            height: 1080,
        });
        await page.goto('https://www.grac.or.kr/Statistics/GameStatistics.aspx');
        await page.type('#ctl00_ContentHolder_txtRatingNbr', id);
        await page.click('#ctl00_ContentHolder_lbtnSearch');
        const time = { timeout: 5000 };
        await page.waitForSelector('#ctl00_ContentHolder_rptGradeDoc_ctl00_hlkGameTitle', time);
        await page.click('#ctl00_ContentHolder_rptGradeDoc_ctl00_hlkGameTitle');
        const [popup] = await Promise.all([
            new Promise((resolve) => page.on('popup', resolve)),
        ]);
        await popup.waitForSelector('#lblOriGameTitle');
        const result = (await popup.$eval('#lblOriGameTitle', (el) => el.textContent)) || '';
        const idx = result.indexOf('(');
        if (idx !== -1) {
            return result.slice(0, idx);
        }
        return result;
    }
    catch (error) {
        console.log(error.message);
    }
    finally {
        await browser.close();
    }
}
exports.default = getEngName;
