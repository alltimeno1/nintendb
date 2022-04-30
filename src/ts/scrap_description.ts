export default async function scrapDesc($: any): Promise<string> {
  let desc: string = ''

  for (let i = 1; i < 5; i++) {
    const text: string = $(`.product.attribute.description p:nth-child(${i})`).text()

    if (desc.length >= 110) {
      break
    } else if (desc.length + text.length > 110) {
      const slicedText = text.slice(0, 110 - desc.length)
      const commaIdx: number = slicedText.lastIndexOf('.')
      const screamIdx: number = slicedText.lastIndexOf('!')
      const questionIdx: number = slicedText.lastIndexOf('?')

      desc += text.slice(0, Math.max(commaIdx, screamIdx, questionIdx) + 1) + ' '
      break
    } else if (!text.includes('예약')) {
      desc += text + ' '
    }
  }

  return desc.trim()
}
