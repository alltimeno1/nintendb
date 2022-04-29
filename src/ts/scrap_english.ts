import * as puppeteer from 'puppeteer'

export default async function getEngName(id: string): Promise<string | void> {
  const browser = await puppeteer.launch()
  console.log('serial num : ', id)
  try {
    const page = await browser.newPage()

    await page.setViewport({
      width: 1440,
      height: 1080,
    })
    await page.goto('https://www.grac.or.kr/Statistics/GameStatistics.aspx')

    await page.type('#ctl00_ContentHolder_txtRatingNbr', id)

    await page.click('#ctl00_ContentHolder_lbtnSearch')

    interface Option {
      timeout: number
    }

    const time: Option = { timeout: 5000 }

    await page.waitForSelector('#ctl00_ContentHolder_rptGradeDoc_ctl00_hlkGameTitle', time)

    await page.click('#ctl00_ContentHolder_rptGradeDoc_ctl00_hlkGameTitle')

    const [popup]: [popup: any] = await Promise.all([
      new Promise((resolve) => page.on('popup', resolve)),
    ])

    await popup.waitForSelector('#lblOriGameTitle')

    const result: string =
      (await popup.$eval('#lblOriGameTitle', (el: any) => el.textContent)) || ''

    const idx: number = result.indexOf('(')

    if (idx !== -1) {
      return result.slice(0, idx)
    }
    console.log('result : ', result)

    return result
  } catch (error: any) {
    console.log(error.message)
  } finally {
    await browser.close()
  }
}
