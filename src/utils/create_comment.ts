const hiddenInput = <HTMLInputElement>document.querySelector('#commentbox input[type=hidden]')
const form = <HTMLFormElement>document.querySelector('#commentbox form')
const button = <HTMLElement>document.querySelector('#commentbox .submit')
const text = <HTMLElement>document.querySelector('#commentbox textarea')
const gameId = window.location.pathname.split('/')[2]

button.addEventListener('click', window.location.reload)
text.addEventListener('keydown', postCommentByKey)

hiddenInput.value = gameId
form.action = `/title/${gameId}`

function postCommentByKey(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    e.stopPropagation()
    button.click()
  }
}
