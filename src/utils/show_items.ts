const more = document.querySelector('.more') as HTMLButtonElement
const gamelists = document.querySelectorAll('.gamelists > ul > li')
let count = 0

function showItems() {
  for (let i = count; i < count + 10; i += 1) {
    gamelists[i]?.classList.remove('hide')
  }

  count += 10

  if (count >= gamelists.length) {
    more.classList.add('hide')
  }
}

window.addEventListener('load', showItems)
more.addEventListener('click', showItems)
