const axios = require('axios')
const cheerio = require('cheerio')
const getEngName = require('./puppeteer')

async function scrapMeta(serialNum) {
  try {
    let engName = (await getEngName(serialNum)) || null

    if (!engName) {
      return engName
    }

    engName = engName.toLowerCase().replace('ns ', '')

    const response = await axios.get(
      `https://www.metacritic.com/search/game/${encodeURI(
        engName
      )}/results?plats[268409]=1&search_type=advanced`
    )

    const $ = cheerio.load(response.data)

    const result = $('.first_result .metascore_w').text() || 0

    console.log('result', result)

    return result
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = scrapMeta
