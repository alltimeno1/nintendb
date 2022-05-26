const x = <HTMLButtonElement>document.querySelector('form button')
const titleId = <HTMLInputElement>document.querySelector('.delete input[name="titleId"]')
const commentId = (<HTMLInputElement>document.querySelector('.delete input[name="commentId"]'))
  .value
const password = (<HTMLInputElement>document.querySelector('.delete input[name="password"]')).value

x.addEventListener('submit', deleteComment)

function deleteComment(e: any) {
  fetch(`/title/${titleId.value}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentId,
      password,
    }),
  }).catch(console.log)

  window.location.reload()
}
