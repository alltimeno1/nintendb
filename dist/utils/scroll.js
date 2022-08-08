"use strict";
const btnTop = document.querySelector('#to-top');
function onScroll() {
    if (window.scrollY > 30) {
        btnTop.classList.add('show');
    }
    else {
        btnTop.classList.remove('show');
    }
}
function scrollTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
}
window.addEventListener('scroll', onScroll);
btnTop.addEventListener('click', scrollTop);
