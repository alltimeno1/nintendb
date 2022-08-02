const buttons = document.querySelectorAll('.delete')

buttons.forEach((button) => button.addEventListener('click', updateBucket))

async function updateBucket(e: any) {
  await fetch('/private', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titleName: e.target.parentElement.querySelector('a').text,
    }),
  }).catch(console.log)

  window.location.reload()
}
