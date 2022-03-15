// 댓글 작성
function writeMsg() {
  const name = $('#nickname').val();
  const msg = $('#msg').val();
  if (!name || !msg) { // 닉네임이나 메세지 값이 없을 때
    alert("닉네임과 내용을 입력해주세요!!");
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

const btnReply = document.querySelector('.btn-dark');

btnReply.addEventListener('click', writeMsg);
