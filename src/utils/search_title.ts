const checkboxes = <HTMLElement>document.querySelector('.checkboxes')
const gameTags = document.querySelectorAll('.gamelist')
let tagList: string[] = []

findInfo()

checkboxes.addEventListener('change', addTag)
checkboxes.addEventListener('change', checkbox)

function addTag(e: any): void {
  const bool = tagList.includes(e.target.value)

  if (bool) {
    const idx = tagList.findIndex((x) => x === e.target.value)

    if (idx >= 0) {
      tagList.splice(idx, 1)
    }
  } else {
    tagList.push(e.target.value)
  }
  console.log(tagList)
}

function checkbox(e: any): void {
  gameTags.forEach((item: any) => {
    if (tagList.every((tag) => item.tags.includes(tag))) {
      item.style.display = ''
    } else {
      item.style.display = 'none'
    }
  })
}

function findInfo(): void {
  gameTags.forEach((item: any) => {
    item.name = item.querySelector('.gl-title a').text
    item.querySelectorAll('.tag a').forEach((e: any) => {
      if (item.tags) {
        item.tags.push(e.text.slice(1, -1))
      } else {
        item.tags = [e.text.slice(1, -1)]
      }
    })
  })
}
