const buttons = document.querySelectorAll('.delete')

buttons.forEach((button) => button.addEventListener('click', deleteBucket))

function deleteBucket(e) {
  fetch('/private/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titleName: e.target.parentElement.querySelector('a').text,
    }),
  }).catch(console.log)

  window.location.reload()
}
