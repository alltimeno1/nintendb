import axios from 'axios'
import * as cheerio from 'cheerio'
import scrapMeta from './scrap_meta'
import scrapDesc from './scrap_description'

let href: string[] = []
let gameList: Types.Game[] = []

async function scrapTitlesUrl(URI: string): Promise<void> {
  try {
    const response = await axios.get(URI)
    const $ = cheerio.load(response.data)

    $('.category-product-item-title-link').each((idx: number, item: any) =>
      href.push(item.attribs.href)
    )
    console.log('Scrapping URI completed')
  } catch (error) {
    console.log(error)
  }
}

export default async function scrapTitleInfo(URI: string): Promise<Types.Game[] | void> {
  try {
    await scrapTitlesUrl(URI)

    for (let link of href) {
      const response = await axios.get(link)
      const $ = cheerio.load(response.data)

      const name: string = $('.product > h1 > span').text()

      if (name.includes('이용권') || name.includes('선불 번호')) continue

      const selector = $('img')
      let image: string = ''

      $(selector).each((idx: number, data: any) => {
        const uri: string = data.attribs.src
        if (uri.includes('media/catalog/product')) {
          image = uri
        }
      })

      const date: string = $('.release_date .product-attribute-val').text().replace(/(\s*)/g, '')

      const priceText: string =
        $('.old-price .price').text() || $('.product-page-info-form .price').text() || ''
      const bargainPriceText: string = $('.special-price .price').text() || priceText || ''
      const price: number = parseInt(priceText.replace(/[₩,]/g, '')) || 0
      const bargainPrice: number = parseInt(bargainPriceText.replace(/[₩,]/g, '')) || 0
      const discountRate: number = price ? Math.round(((price - bargainPrice) / price) * 100) : 0

      const genre: string = $('.game_category .product-attribute-val').text()
      const playerNum: string =
        $('.no_of_players .product-attribute-val').text() === '1명' ? '싱글' : '싱글, 멀티'
      const languages: string[] = $('.supported_languages .product-attribute-val')
        .text()
        .split(', ')
      const language: string =
        languages[0] === '한국어' ? languages.slice(0, 2).join(', ') : languages[0]
      const serialNumText: string =
        $('.attribute-group-disclaimer .product-attribute-val').text() || ''
      const idx: number = serialNumText.indexOf('GC-')
      const serialNum: string = idx !== -1 ? serialNumText.substr(idx, 19) : ''

      const rating: number = (await scrapMeta(serialNum)) || 0
      const tag: string = genre
        ? `${language}, ${playerNum}, ${genre}`
        : `${language}, ${playerNum}`
      const description: string = await scrapDesc($)

      const game: Types.Game = {
        name,
        image,
        date,
        rating,
        price,
        bargainPrice,
        discountRate,
        tag,
        serialNum,
        description,
      }

      gameList.push(game)
    }

    return gameList
  } catch (error) {
    console.log(error)
  }
}
