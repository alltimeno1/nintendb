// 스크롤 이벤트 등록
const btnTop = <HTMLElement>document.querySelector('#to-top')

window.addEventListener('scroll', onScroll)
btnTop.addEventListener('click', scrollTop)

// 스크롤 이벤트
let lastScrollY = 0

function onScroll(): void {
  const STANDARD = 30

  if (window.scrollY > STANDARD) {
    // 스크롤이 30px을 넘었을 때
    btnTop.classList.add('show')
  } else {
    // 스크롤이 30px을 넘지 않을 때
    btnTop.classList.remove('show')
  }

  lastScrollY = window.scrollY
}

// 스크롤 이벤트2
function scrollTop(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
