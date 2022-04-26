import * as puppeteer from 'puppeteer'

export default async function getEngName(id: string): Promise<string | void> {
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()

    await page.setViewport({
      width: 1440,
      height: 1080,
    })
    await page.goto('https://www.grac.or.kr/Statistics/GameStatistics.aspx')

    await page.type('#ctl00_ContentHolder_txtRatingNbr', id)

    await page.click('#ctl00_ContentHolder_lbtnSearch')

    await page.waitForSelector(
      '#ctl00_ContentHolder_rptGradeDoc_ctl00_hlkGameTitle'
    )
    await page.click('#ctl00_ContentHolder_rptGradeDoc_ctl00_hlkGameTitle')

    const [popup]: [popup: any] = await Promise.all([
      new Promise((resolve) => page.on('popup', resolve)),
    ])

    await popup.waitForSelector('#lblOriGameTitle')

    const result: string =
      (await popup.$eval('#lblOriGameTitle', (el: any) => el.textContent)) || ''

    return result
  } catch (error) {
    console.log(error)
  } finally {
    await browser.close()
  }
}
