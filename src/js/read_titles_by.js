// 데이터 불러오기
import data from './data.js'

const titleData = data

// 게임 박스 생성
function makeBoxHtml(id, title) {
  const { name, image, date, rating, price, tag } = title
  let details = ''

  if (id === 'best') {
    details = `<img class="meta" src="../static/img/metacritic.png">
      ${rating}`
  } else if (id === 'new') {
    details = date + ' 출시'
  } else if (id === 'sale') {
    details = '🇰🇷 ₩' + price
  }

  const titleHtml = `
    <img class="cover" src=${image}>
    <h5>${name}</h5>
    <span>
      ${details}
    </span>`

  return titleHtml
}

function readTitlesBy(id) {
  const box = document.querySelector(`#${id} .more`)

  titleData.forEach((title, idx) => {
    const item = document.createElement('a')

    item.className = 'item'
    item.href = `/title/${idx + 1}`
    item.innerHTML = makeBoxHtml(id, title)
    box.before(item)
  })
}

readTitlesBy('best')
readTitlesBy('new')
readTitlesBy('sale')
