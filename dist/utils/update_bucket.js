"use strict";
const buttons = document.querySelectorAll('.delete');
buttons.forEach((button) => button.addEventListener('click', updateBucket));
function updateBucket(e) {
    fetch('/private', {
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
