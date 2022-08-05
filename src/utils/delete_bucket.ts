const reset = <HTMLButtonElement>document.querySelector('.reset')

reset.addEventListener('click', deleteBucket)

async function deleteBucket() {
  await fetch('/private', {
    method: 'DELETE',
  }).catch(console.log)

  window.location.reload()
}
