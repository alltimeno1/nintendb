const updateButton = document.querySelector('#board button') as Element
const post = document.querySelectorAll('input')
const contents = document.querySelector('textarea') as HTMLTextAreaElement

updateButton.addEventListener('click', updatePost)

async function updatePost(e: any) {
  const title = post[1].value
  const password = post[3]?.value
  const nickname = password ? post[2].value : null
  const userId = password ? null : post[2].value
  const text = contents.value

  await fetch(`/forum/${post[0].value}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, userId, nickname, password, text }),
  }).catch(console.log)

  window.location.href = `/forum/${post[0].value}`
}
