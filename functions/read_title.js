// 데이터 불러오기
import data from './data.js'

const titleData = data

// 게임 박스 생성
function makeBoxHtml(id, image, name, date, rating, price) {
  let details = ''

  if (id === 'best') {
    details = `<img class="meta" src="../images/metacritic.png">
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

function readTitles(id) {
  const box = document.querySelector(`#${id} .more`)

  titleData.forEach(({ name, image, date, rating, price }, idx) => {
    const item = document.createElement('a')

    item.className = 'item'
    item.href = `/title/${idx + 1}`
    item.innerHTML = makeBoxHtml(id, image, name, date, rating, price)
    box.before(item)
  })
}

// 게임 리스트 생성
function makeListHtml(image, name, date, rating, price, idx, tag) {
  const titleHtml = `
    <img class="gl-img" src=${image} width="240" height="240">
    <div class="gl-info">
      <div class="header">
        <h2 class="gl-title"><a href="/title/${idx + 1}">${name}</a></h2>
        <p class="gl-date">${date} 출시</p>
      </div>
      <ul class="tags">
        <li class="tag"><a href="#">#${tag[0]}</a></li>
        <li class="tag"><a href="#">#${tag[1]}</a></li>
        <li class="tag"><a href="#">#${tag[2]}</a></li>
        <li class="tag"><a href="#">#${tag[3]}</a></li>
        <li class="tag"><a href="#">#${tag[4]}</a></li>
        <li class="tag"><a href="#">#${tag[5]}</a></li>
      </ul>
      <div class="stats">
        <img src="../images/metacritic.png" width="20" height="20">
        <span class="rating">${rating}</span>
      <span class="price">🇰🇷 ₩${price}</span>
      </div>
    </div>`

  return titleHtml
}

function readAllTitles(data = titleData) {
  const box = document.querySelector('.gamelists')

  data.forEach(({ name, image, date, rating, price, tag }, idx) => {
    const item = document.createElement('li')

    item.className = 'gamelist'
    item.innerHTML = makeListHtml(image, name, date, rating, price, idx, tag)
    box.appendChild(item)
  })
}

export { readTitles, readAllTitles }
