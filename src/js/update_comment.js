const button = document.querySelector('button')
const text = document.querySelector('textarea')
const [id, password] = document.querySelectorAll('input')
const idx = window.location.pathname.split('/')[2]

button.addEventListener('click', postRequest)

function postRequest() {
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
  })

  window.location.reload()
}
