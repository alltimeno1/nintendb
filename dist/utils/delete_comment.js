"use strict";
const deleteButton = document.querySelector('form button');
const titleId = document.querySelector('.delete input[name="titleId"]');
const commentId = document.querySelector('.delete input[name="commentId"]')
    .value;
const password = document.querySelector('.delete input[name="password"]').value;
deleteButton.addEventListener('submit', deleteComment);
function deleteComment(e) {
    fetch(`/title/${titleId.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentId,
            password,
        }),
    }).catch(console.log);
    window.location.reload();
}
