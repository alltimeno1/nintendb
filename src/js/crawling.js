const axios = require('axios')
const cheerio = require('cheerio')

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
  await scrapTitlesUrl()

  for (link of href) {
    const response = await axios.get(link)
    const $ = cheerio.load(response.data)

    const name = $('.product > h1 > span').text()
    const image = $('meta[property="og:image"]').attr('content')
    const date = $('.release_date .product-attribute-val')
      .text()
      .replace(/(\s*)/g, '')
    let price =
      $('.old-price .price').text() ||
      $('.product-page-info-form .price').text()
    let bargainPrice = $('.special-price .price').text() || price
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

    price = parseInt(price.replace('₩', '').replace(',', ''))
    bargainPrice = parseInt(bargainPrice.replace('₩', '').replace(',', ''))

    const idx = serialNum.indexOf('GC-')

    serialNum = idx !== -1 ? serialNum.substr(idx, 19) : null

    gameList.push({
      name,
      image,
      date,
      rating: 0,
      price,
      bargainPrice,
      tag: `${language}, ${playerNum}, ${genre}`,
      serialNum,
    })
  }

  return gameList
}

module.exports = scrapTitleInfo
