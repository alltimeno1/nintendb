const hiddenInput: any = document.querySelector('#commentbox input[type=hidden]')
const form: any = document.querySelector('#commentbox form')
const button: any = document.querySelector('#commentbox .submit')
const text = document.querySelector('#commentbox textarea')
const game_id = window.location.pathname.split('/')[2]

button?.addEventListener('click', window.location.reload)
text?.addEventListener('keydown', postCommentByKey)

hiddenInput.value = game_id
form.action = `/title/${game_id}`

function postCommentByKey(e: any): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    e.stopPropagation()
    button.click()
  }
}
