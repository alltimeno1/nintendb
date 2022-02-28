function write_msg(){
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

const btn = document.querySelector('.btn-dark');

btn.addEventListener('click', write_msg);