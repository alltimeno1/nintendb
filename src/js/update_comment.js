const button = document.querySelector('.submit')
const text = document.querySelector('textarea')
const [id, password] = document.querySelectorAll('input')
const idx = window.location.pathname.split('/')[2]

button.addEventListener('click', postComment)
text.addEventListener('keydown', postCommentByKey)

function postCommentByKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    e.stopPropagation()
    postComment()
  }
}

function postComment() {
  if (id.value === '' || password.value === '' || text.value === '') {
    alert('아이디와 비밀번호, 내용을 입력해 주세요!')
    return
  }
  fetch(`/title/:id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      game_id: idx,
      id: id.value,
      password: password.value,
      text: text.value,
    }),
  }).catch(console.log)

  window.location.reload()
}
