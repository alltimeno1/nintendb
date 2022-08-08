const hiddenInput = document.querySelector('#commentbox input[type=hidden]') as HTMLInputElement
const form = document.querySelector('#commentbox form') as HTMLFormElement
const button = document.querySelector('#commentbox .submit') as HTMLButtonElement
const text = document.querySelector('#commentbox textarea') as HTMLElement
const gameId = window.location.pathname.split('/')[2]

hiddenInput.value = gameId
form.action = `/title/${gameId}`

function postCommentByKey(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    e.stopPropagation()
    button.click()
  }
}

button.addEventListener('click', window.location.reload)
text.addEventListener('keydown', postCommentByKey)
