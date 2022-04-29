'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const axios_1 = require('axios')
const cheerio = require('cheerio')
const update_meta_1 = require('./update_meta')
let href = []
let gameList = []
async function scrapTitlesUrl(URI) {
  try {
    const response = await axios_1.default.get(URI)
    const $ = cheerio.load(response.data)
    $('.category-product-item-title-link').each((idx, item) => href.push(item.attribs.href))
    console.log('Scrapping URI completed')
  } catch (error) {
    console.log(error)
  }
}
async function scrapTitleInfo(URI) {
  try {
    await scrapTitlesUrl(URI)
    for (let link of href) {
      const response = await axios_1.default.get(link)
      const $ = cheerio.load(response.data)
      const name = $('.product > h1 > span').text()
      if (name.includes('이용권') || name.includes('선불 번호')) continue
      const selector = $('img')
      let image = ''
      $(selector).each((idx, data) => {
        const uri = data.attribs.src
        if (uri.includes('media/catalog/product')) {
          image = uri
        }
      })
      const date = $('.release_date .product-attribute-val').text().replace(/(\s*)/g, '')
      const priceText =
        $('.old-price .price').text() || $('.product-page-info-form .price').text() || ''
      const bargainPriceText = $('.special-price .price').text() || priceText || ''
      const price = parseInt(priceText.replace(/[₩,]/g, '')) || NaN
      const bargainPrice = parseInt(bargainPriceText.replace(/[₩,]/g, '')) || NaN
      const discountRate = Math.round(((price - bargainPrice) / price) * 100) || 0
      const genre = $('.game_category .product-attribute-val').text()
      const playerNum =
        $('.no_of_players .product-attribute-val').text() === '1명' ? '싱글' : '싱글, 멀티'
      const languages = $('.supported_languages .product-attribute-val').text().split(', ')
      const language = languages[0] === '한국어' ? languages.slice(0, 2).join(', ') : languages[0]
      const serialNumText = $('.attribute-group-disclaimer .product-attribute-val').text() || ''
      const idx = serialNumText.indexOf('GC-')
      const serialNum = idx !== -1 ? serialNumText.substr(idx, 19) : ''
      const rating = (await (0, update_meta_1.default)(serialNum)) || 0
      const tag = genre ? `${language}, ${playerNum}, ${genre}` : `${language}, ${playerNum}`
      const game = {
        name,
        image,
        date,
        rating,
        price,
        bargainPrice,
        discountRate,
        tag,
        serialNum,
      }
      gameList.push(game)
    }
    return gameList
  } catch (error) {
    console.log(error)
  }
}
exports.default = scrapTitleInfo
