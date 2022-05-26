"use strict";
const more = document.querySelector('.more');
const gamelists = document.querySelectorAll('.gamelists > ul > li');
let count = 0;
window.addEventListener('load', showItems);
more.addEventListener('click', showItems);
function showItems() {
    for (let i = count; i < count + 10; i++) {
        gamelists[i]?.classList.remove('hide');
    }
    count += 10;
    if (count >= gamelists.length) {
        more.classList.add('hide');
    }
}
