const currency = document.querySelector('#currency') as HTMLButtonElement

function chooseCurrency() {
  fetch('/currency', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      currency: currency.value,
    }),
  }).then(() => window.location.reload())
}

currency.addEventListener('change', chooseCurrency)
