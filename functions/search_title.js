// 데이터 불러오기
import data from './data.js'
import { readAllTitles } from './read_title.js'

const titleData = data

const searchBar = document.querySelector('.search_box input')
const checkboxes = document.querySelector('.checkboxes')
let tagList = []

searchBar.addEventListener('keypress', search)
checkboxes.addEventListener('change', addTag)
checkboxes.addEventListener('change', checkbox)

function search(e) {
  if (e.key === 'Enter') {
    const result = titleData.filter((title) =>
      title.name.includes(e.target.value)
    )
    const list = document.querySelectorAll('.gamelist')

    for (let item of list) {
      item.remove()
    }

    readAllTitles(result)
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
  const gameList = document.querySelectorAll('.gamelist')
  const result = titleData.filter((title) =>
    tagList.every((tag) => title.tag.includes(tag))
  )

  for (let item of gameList) {
    item.remove()
  }

  readAllTitles(result)
}
