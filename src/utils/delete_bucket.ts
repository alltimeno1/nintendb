const reset = <HTMLButtonElement>document.querySelector('.reset')

reset.addEventListener('click', deleteBucket)

async function deleteBucket(e: any) {
  await fetch('/private', {
    method: 'DELETE',
  }).catch(console.log)

  window.location.reload()
}
