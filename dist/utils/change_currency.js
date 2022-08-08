"use strict";
const currency = document.querySelector('#currency');
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
    })
        .then(() => window.location.reload())
        .catch(console.log);
}
currency.addEventListener('change', chooseCurrency);
