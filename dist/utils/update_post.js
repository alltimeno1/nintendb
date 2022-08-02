"use strict";
const updateButton = document.querySelector('#board button');
const post = document.querySelectorAll('input');
const contents = document.querySelector('textarea');
updateButton.addEventListener('click', updatePost);
async function updatePost(e) {
    const id = post[0].value;
    const title = post[1].value;
    const password = post[3]?.value;
    const nickname = password ? post[2].value : null;
    const userId = password ? null : post[2].value;
    const text = contents.value;
    await fetch(`/forum/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, userId, nickname, password, text }),
    })
        .then((data) => {
        if (data.status === 401) {
            alert('비밀번호를 정확히 입력해주세요!');
            window.location.href = `/forum/${id}/edit`;
            return;
        }
        window.location.href = `/forum/${post[0].value}`;
    })
        .catch(console.log);
}
