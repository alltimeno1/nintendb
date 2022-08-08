"use strict";
const deleteButtons = document.querySelectorAll('.delete button');
const inputs = document.querySelectorAll('.delete input[name="password"]');
const titleId = document.querySelector('input[name="titleId"]').value;
async function deleteComment(e) {
    const element = e.target.parentElement;
    await fetch(`/title/${encodeURI(titleId)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            commentId: element.querySelector('input[name="commentId"]').value,
            password: element.querySelector('input[name="password"]')?.value,
        }),
    })
        .then((data) => {
        if (data.status === 401) {
            e.target.value = '';
            alert('비밀번호를 정확히 입력해주세요!');
            return;
        }
        element.parentElement.remove();
    })
        .catch(console.log);
}
deleteButtons.forEach((button) => button.addEventListener('click', deleteComment));
inputs.forEach((input) => input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        deleteComment(e);
    }
}));
