const checkboxes = <HTMLElement>document.querySelector('.checkboxes')
const gameTags = document.querySelectorAll('.gamelist')
let tagList: string[] = []

findInfo()

checkboxes.addEventListener('change', addTag)
checkboxes.addEventListener('change', checkbox)

function addTag(e: Event) {
  const { value } = e.target as HTMLButtonElement
  const bool = tagList.includes(value)

  if (bool) {
    const idx = tagList.findIndex((x) => x === value)

    if (idx >= 0) {
      tagList.splice(idx, 1)
    }
  } else {
    tagList.push(value)
  }
}

function checkbox() {
  gameTags.forEach((item: Types.HtmlInterface) => {
    if (!item.style) return

    if (tagList.every((tag) => item.tags?.includes(tag))) {
      item.style.display = ''
    } else {
      item.style.display = 'none'
    }
  })
}

function findInfo() {
  gameTags.forEach((item: Types.HtmlInterface) => {
    const name = item.querySelector('.gl-title a') as Types.HtmlInterface

    item.name = name.text

    item.querySelectorAll('.tag a').forEach((e: Types.HtmlInterface) => {
      if (!e.text) return

      if (item.tags) {
        item.tags.push(e.text.slice(1, -1))
      } else {
        item.tags = [e.text.slice(1, -1)]
      }
    })
  })
}
