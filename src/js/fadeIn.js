const bestItems = document.querySelectorAll('#best .item')
const newItems = document.querySelectorAll('#new .item')
const saleItems = document.querySelectorAll('#sale .item')
const top10 = document.querySelectorAll('.top10 .keyword')

function fadeInItems(selector, time) {
  for (let i = 0; i < selector.length; i++) {
    setTimeout(() => selector[i].classList.add('fadeIn'), time * i)
  }
}

if (
  window.location.pathname === '/home' ||
  window.location.pathname === '/rank'
) {
  fadeInItems(bestItems, 300)
  fadeInItems(newItems, 300)
  fadeInItems(saleItems, 300)
} else {
  fadeInItems(top10, 150)
}
