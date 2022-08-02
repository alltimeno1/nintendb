"use strict";
const reset = document.querySelector('.reset');
reset.addEventListener('click', deleteBucket);
async function deleteBucket(e) {
    await fetch('/private', {
        method: 'DELETE',
    }).catch(console.log);
    window.location.reload();
}
