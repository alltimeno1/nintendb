'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const axios_1 = require('axios')
const cheerio = require('cheerio')
const scrap_english_1 = require('./scrap_english')
async function scrapMeta(serialNum) {
  try {
    let engName = serialNum ? (await (0, scrap_english_1.default)(serialNum)) || '' : ''
    if (!engName) {
      return 0
    }
    const keyword = engName.toLowerCase().replace('ns ', '')
    const response = await axios_1.default.get(
      `https://www.metacritic.com/search/game/${encodeURI(
        keyword
      )}/results?plats[268409]=1&search_type=advanced`
    )
    const $ = cheerio.load(response.data)
    const result = parseInt($('.first_result .metascore_w').text())
    return result
  } catch (error) {
    console.log(error)
  }
}
exports.default = scrapMeta
