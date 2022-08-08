"use strict";
const buttons = document.querySelectorAll('.delete');
async function updateBucket(e) {
    await fetch('/private', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titleName: e.target.parentElement.querySelector('a').text,
        }),
    }).catch(console.log);
    window.location.reload();
}
buttons.forEach((button) => button.addEventListener('click', updateBucket));
