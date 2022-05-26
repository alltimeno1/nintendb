const reset = <HTMLButtonElement>document.querySelector('.reset')

reset.addEventListener('click', deleteBucket)

function deleteBucket(e: any) {
  fetch('/private', {
    method: 'DELETE',
  }).catch(console.log)

  window.location.reload()
}
