"use strict";
const more = document.querySelector('.more');
const gamelists = document.querySelector('.gamelists ul');
let count = 1;
hideItems();
more.addEventListener('click', extendHeight);
function extendHeight() {
    count += 1;
    gamelists.style['max-height'] = `${2620 * count}px`;
    hideItems();
}
function hideItems() {
    if (document.body.scrollHeight < 2620 * count + 765) {
        more.setAttribute('style', 'display:none;');
    }
}
