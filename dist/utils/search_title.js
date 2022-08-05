"use strict";
const checkboxes = document.querySelector('.checkboxes');
const tagList = [];
checkboxes.addEventListener('change', addTag);
function addTag(e) {
    const { value } = e.target;
    const bool = tagList.includes(value);
    if (bool) {
        const idx = tagList.findIndex((x) => x === value);
        if (idx >= 0) {
            tagList.splice(idx, 1);
        }
    }
    else {
        tagList.push(value);
    }
    checkboxes.submit();
}
