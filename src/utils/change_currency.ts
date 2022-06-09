const currency = <HTMLButtonElement>document.querySelector('#currency')

currency.addEventListener('change', chooseCurrency)

function chooseCurrency() {
  console.log('abc')
  fetch('/currency', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      currency: currency.value,
    }),
  })
    .then(() => window.location.reload())
    .catch(console.log)
}
