"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
const scrap_meta_1 = require("./scrap_meta");
const scrap_description_1 = require("./scrap_description");
const href = [];
const gameList = [];
async function scrapTitlesUrl(URI) {
    try {
        const response = await axios_1.default.get(URI);
        const $ = cheerio.load(response.data);
        $('.category-product-item-title-link').each((idx, item) => href.push(item.attribs.href));
        console.log('Scrapping URI completed');
    }
    catch (error) {
        console.log(error);
    }
}
async function scrapTitleInfo(URI) {
    try {
        await scrapTitlesUrl(URI);
        for (let link of href) {
            const response = await axios_1.default.get(link);
            const $ = cheerio.load(response.data);
            const name = $('.product > h1 > span').text();
            if (name.includes('이용권') || name.includes('선불 번호')) {
                continue;
            }
            const selector = $('img');
            let image = '';
            $(selector).each((idx, data) => {
                const uri = data.attribs.src;
                if (uri.includes('media/catalog/product')) {
                    image = uri;
                }
            });
            const date = new Date($('.release_date .product-attribute-val').text().replace(/(\s*)/g, ''));
            const tagName = '.product-page-info-form';
            const priceText = $(`${tagName} .old-price .price`).text() || $(`${tagName} .price`).text() || '';
            const bargainPriceText = $(`${tagName} .special-price .price`).text() || priceText;
            const price = parseInt(priceText.replace(/[₩,]/g, '')) || 0;
            const bargainPrice = parseInt(bargainPriceText.replace(/[₩,]/g, '')) || 0;
            const discountRate = price ? Math.round(((price - bargainPrice) / price) * 100) : 0;
            const genre = $('.game_category .product-attribute-val').text();
            const playerNum = $('.no_of_players .product-attribute-val').text() === '1명' ? '싱글' : '싱글, 멀티';
            const languages = $('.supported_languages .product-attribute-val')
                .text()
                .split(', ');
            const language = languages[0] === '한국어' ? languages.slice(0, 2).join(', ') : languages[0];
            const serialNumText = $('.attribute-group-disclaimer .product-attribute-val').text() || '';
            const idx = serialNumText.indexOf('GC-');
            const serialNum = idx !== -1 ? serialNumText.substr(idx, 19) : '';
            let rating = 0;
            const re = /[a-zA-z]{2}-[a-zA-z]{2}-[a-zA-z]{2}-[0-9]{6}-[0-9]{3}/;
            if (re.test(serialNum)) {
                rating = (await (0, scrap_meta_1.default)(serialNum)) || rating;
            }
            const tag = genre
                ? `${language}, ${playerNum}, ${genre}`
                : `${language}, ${playerNum}`;
            const description = await (0, scrap_description_1.default)($);
            const game = {
                name,
                image,
                date,
                rating,
                price,
                bargainPrice,
                discountRate,
                tag,
                description,
            };
            gameList.push(game);
        }
        return gameList;
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = scrapTitleInfo;
