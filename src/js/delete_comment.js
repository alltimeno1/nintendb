const buttons = document.querySelectorAll('.delete')
const idx = window.location.pathname.split('/')[2]

buttons.forEach((button) => button.addEventListener('click', deleteComment))

function deleteComment(e) {
  const password = prompt('비밀번호를 입력해 주세요')
  const idx = e.target.parentElement.id
  console.log('idx', idx)

  fetch(`/title/:id`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment_id: idx,
      password: password,
    }),
  }).catch(console.log)

  window.location.reload()
}
