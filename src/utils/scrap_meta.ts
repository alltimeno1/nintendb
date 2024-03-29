import axios from 'axios'
import * as cheerio from 'cheerio'
import getEngName from './scrap_english'

export default async function scrapMeta(serialNum: string) {
  try {
    const engName: string = (await getEngName(serialNum)) || ''
    const re = /[ぁ-ゔ]+|[ァ-ヴー]+[々〆〤]/

    if (!engName || engName.match(re)) {
      return 0
    }

    const keyword: string = engName.toLowerCase().replace('ns ', '')

    const response = await axios.get(
      `https://www.metacritic.com/search/game/${encodeURI(
        keyword
      )}/results?plats[268409]=1&search_type=advanced`
    )

    const $ = cheerio.load(response.data)

    const result: number = parseInt($('.first_result .metascore_w').text(), 10)

    return result
  } catch (error) {
    console.log(error)
  }
}
