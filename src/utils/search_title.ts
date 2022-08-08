const checkboxes = document.querySelector('.checkboxes') as HTMLFormElement
const tagList: string[] = []

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

  checkboxes.submit()
}

checkboxes.addEventListener('change', addTag)
