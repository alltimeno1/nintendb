"use strict";
const checkboxes = document.querySelector('.checkboxes');
const gameTags = document.querySelectorAll('.gamelist');
let tagList = [];
findInfo();
checkboxes.addEventListener('change', addTag);
checkboxes.addEventListener('change', checkbox);
function addTag(e) {
    const bool = tagList.includes(e.target.value);
    if (bool) {
        const idx = tagList.findIndex((x) => x === e.target.value);
        if (idx >= 0) {
            tagList.splice(idx, 1);
        }
    }
    else {
        tagList.push(e.target.value);
    }
    console.log(tagList);
}
function checkbox(e) {
    gameTags.forEach((item) => {
        if (tagList.every((tag) => item.tags.includes(tag))) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    });
}
function findInfo() {
    gameTags.forEach((item) => {
        item.name = item.querySelector('.gl-title a').text;
        item.querySelectorAll('.tag a').forEach((e) => {
            if (item.tags) {
                item.tags.push(e.text.slice(1, -1));
            }
            else {
                item.tags = [e.text.slice(1, -1)];
            }
        });
    });
}
