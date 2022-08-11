"use strict";
const reset = document.querySelector('.reset');
const items = document.querySelector('.forum tbody');
async function deleteBucket() {
    await fetch('/private', {
        method: 'DELETE',
    });
    items?.remove();
}
reset.addEventListener('click', deleteBucket);
