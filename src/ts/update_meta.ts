import axios from 'axios'
import * as cheerio from 'cheerio'
import getEngName from './scrap_english'

export default async function scrapMeta(
  serialNum: string
): Promise<number | void> {
  try {
    let engName: string = (await getEngName(serialNum)) || ''

    if (!engName) {
      return 0
    }

    const keyword: string = engName.toLowerCase().replace('ns ', '')

    const response = await axios.get(
      `https://www.metacritic.com/search/game/${encodeURI(
        keyword
      )}/results?plats[268409]=1&search_type=advanced`
    )

    const $ = cheerio.load(response.data)

    const result: number = parseInt($('.first_result .metascore_w').text())

    return result
  } catch (error) {
    console.log(error)
  }
}
