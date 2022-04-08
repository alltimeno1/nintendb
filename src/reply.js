$('#nickname').on('input', activate)
$('#msg').on('input', activate)
$('.btn-dark').on('click', writeMsg)

// 댓글 작성
function writeMsg() {
  const name = $('#nickname').val()
  const msg = $('#msg').val()

  // 닉네임이나 메세지 값이 없을 때
  if (!name || !msg) {
    alert('닉네임과 내용을 입력해주세요!!')
    return
  }
  const temp_html = `
    <div class="card">
        <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p>${msg}</p>
            <footer class="blockquote-footer">${name}</cite></footer>
        </blockquote>
        </div>
    </div>`
  $(`#cards-box`).append(temp_html)
  alert('좋은 의견 감사합니다!')
}

// 아이디 비밀번호 입력시 버튼색 변경
function activate() {
  const name = $('#nickname').val()
  const msg = $('#msg').val()

  if (name && msg) {
    $('.btn-dark').css('background-color', '#1BBC9B')
  } else {
    $('.btn-dark').css('background-color', '#212529')
  }
}
