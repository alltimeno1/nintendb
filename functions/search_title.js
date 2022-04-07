// 데이터 불러오기
import data from './data.js'
import { readAllTitles } from './read_title.js'

const searchBar = document.querySelector('.search_box input')
const checkboxes = document.querySelector('.checkboxes')
let tagList = []

searchBar.addEventListener('keypress', search)
checkboxes.addEventListener('change', addTag)
checkboxes.addEventListener('change', checkbox)

function search(e) {
  if (e.key === 'Enter') {
    const result = data.filter((title) => title.name.includes(e.target.value))

    rewriteTitles(result)
  }
}

function addTag(e) {
  const bool = tagList.includes(e.target.value)

  if (bool) {
    const idx = tagList.findIndex((x) => x === e.target.value)

    if (idx >= 0) {
      tagList.splice(idx, 1)
    }
  } else {
    tagList.push(e.target.value)
  }
}

function checkbox(e) {
  const result = data.filter((title) =>
    tagList.every((tag) => title.tag.includes(tag))
  )

  rewriteTitles(result)
}

function rewriteTitles(result) {
  const gameList = document.querySelectorAll('.gamelist')

  for (let item of gameList) {
    item.remove()
  }

  readAllTitles(result)
}
