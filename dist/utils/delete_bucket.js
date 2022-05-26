"use strict";
const reset = document.querySelector('.reset');
reset.addEventListener('click', deleteBucket);
function deleteBucket(e) {
    fetch('/private', {
        method: 'DELETE',
    }).catch(console.log);
    window.location.reload();
}
