// 댓글 작성
function writeMsg() {
  const name = $('#nickname').val();
  const msg = $('#msg').val();
  if (!name || !msg) {
    alert("닉네임과 내용을 입력해주세요!!")
    return
  }
  let temp_html = `
    <div class="card">
        <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p>${msg}</p>
            <footer class="blockquote-footer">${name}</cite></footer>
        </blockquote>
        </div>
    </div>`;
    $(`#cards-box`).append(temp_html);
    alert("좋은 의견 감사합니다!");
}

// 스크롤 이벤트
let lastScrollY = 0;

function onScroll() {
  const toTop = document.querySelector('#to-top');
  const STANDARD = 30;
  
  if (window.scrollY > STANDARD) { // 스크롤이 30px을 넘었을 때
    toTop.classList.add('show');
  } else { // 스크롤이 30px을 넘지 않을 때
    toTop.classList.remove('show');
  } 

  lastScrollY = window.scrollY;
}

// 스크롤 이벤트2
const scrollTop = () => window.scrollTo(0,0);

const btnReply = document.querySelector('.btn-dark');
const btnTop = document.querySelector('#to-top');

if (btnReply) {
  btnReply.addEventListener('click', writeMsg);
}
window.addEventListener('scroll', onScroll);
btnTop.addEventListener('click', scrollTop);