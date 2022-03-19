// 스크롤 이벤트
let lastScrollY = 0;

function onScroll() {
  const STANDARD = 30;
  
  if (window.scrollY > STANDARD) { // 스크롤이 30px을 넘었을 때
    btnTop.classList.add('show');
  } else { // 스크롤이 30px을 넘지 않을 때
    btnTop.classList.remove('show');
  } 

  lastScrollY = window.scrollY;
}

// 스크롤 이벤트2
const scrollTop = () => window.scrollTo(0,0,"smooth");

const btnTop = document.querySelector('#to-top');

// 스크롤 이벤트
window.addEventListener('scroll', onScroll);
btnTop.addEventListener('click', scrollTop);