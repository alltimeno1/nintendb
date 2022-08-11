"use strict";
const updateButton = document.querySelector('#board button');
const post = document.querySelectorAll('input');
const contents = document.querySelector('textarea');
async function updatePost() {
    const [postId, title, id, password] = [...post].map((e) => e.value);
    const [nickname, userId] = password ? [id, null] : [null, id];
    const text = contents.value;
    await fetch(`/forum/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, userId, nickname, password, text }),
    }).then((data) => {
        if (data.status === 401) {
            alert('비밀번호를 정확히 입력해주세요!');
            post[3].value = '';
            return;
        }
        window.location.href = `/forum/${post[0].value}`;
    });
}
updateButton.addEventListener('click', updatePost);
