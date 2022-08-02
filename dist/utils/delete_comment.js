"use strict";
const deleteButtons = document.querySelectorAll('.delete button');
const titleId = document.querySelector('input[name="titleId"]').value;
deleteButtons.forEach((button) => button.addEventListener('click', deleteComment));
async function deleteComment(e) {
    const element = e.target.parentElement;
    await fetch(`/title/${encodeURI(titleId)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentId: element.querySelector('input[name="commentId"]').value,
            password: element.querySelector('input[name="password"]')?.value,
        }),
    }).catch(console.log);
    window.location.reload();
}
