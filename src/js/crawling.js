const axios = require('axios')
const cheerio = require('cheerio')
const scrapMeta = require('./update_meta')

let href = []
let gameList = []

async function scrapTitlesUrl() {
  try {
    const response = await axios.get(
      'https://store.nintendo.co.kr/games/best-sellers'
    )

    const $ = cheerio.load(response.data)
    $('.category-product-item-title-link').each((idx, item) =>
      href.push(item.attribs.href)
    )
  } catch (error) {
    console.log(error)
  }
}

async function scrapTitleInfo() {
  try {
    await scrapTitlesUrl()

    for (link of href) {
      const response = await axios.get(link)
      const $ = cheerio.load(response.data)

      const name = $('.product > h1 > span').text()
      const selector = $('img')
      let image = ''

      $(selector).each((idx, data) => {
        const uri = data.attribs.src
        if (uri.includes('media/catalog/product')) {
          image = uri
        }
      })

      const date = $('.release_date .product-attribute-val')
        .text()
        .replace(/(\s*)/g, '')

      let price =
        $('.old-price .price').text() ||
        $('.product-page-info-form .price').text()
      let bargainPrice = $('.special-price .price').text() || price

      price = parseInt(price.replace('₩', '').replace(',', ''))
      bargainPrice = parseInt(bargainPrice.replace('₩', '').replace(',', ''))

      const discountRate = Math.round(((price - bargainPrice) / price) * 100)

      const genre = $('.game_category .product-attribute-val').text()
      const playerNum =
        $('.no_of_players .product-attribute-val').text() === '1명'
          ? '싱글'
          : '멀티'
      const language = $('.supported_languages .product-attribute-val')
        .text()
        .split(', ')[0]
      let serialNum = $(
        '.attribute-group-disclaimer .product-attribute-val'
      ).text()

      const idx = serialNum.indexOf('GC-')

      serialNum = idx !== -1 ? serialNum.substr(idx, 19) : null

      let rating = await scrapMeta(serialNum)

      rating = parseInt(rating) || 0

      gameList.push({
        name,
        image,
        date,
        rating,
        price,
        bargainPrice,
        discountRate,
        tag: `${language}, ${playerNum}, ${genre}`,
        serialNum,
      })
    }

    return gameList
  } catch (error) {
    console.log(error)
  }
}

module.exports = scrapTitleInfo
