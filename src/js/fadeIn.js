const bestItems = document.querySelectorAll('#best .item')
const newItems = document.querySelectorAll('#new .item')
const saleItems = document.querySelectorAll('#sale .item')

function fadeInItems(selector) {
  for (let i = 0; i < selector.length; i++) {
    setTimeout(() => selector[i].classList.add('fadeIn'), 300 * i)
  }
}

fadeInItems(bestItems)
fadeInItems(newItems)
fadeInItems(saleItems)
