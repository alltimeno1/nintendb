"use strict";
const bestItems = document.querySelectorAll('#best .item');
const newItems = document.querySelectorAll('#new .item');
const saleItems = document.querySelectorAll('#sale .item');
const top10 = document.querySelectorAll('.top10 .keyword');
function fadeInItems(selector, time) {
    for (let i = 0; i < selector.length; i += 1) {
        setTimeout(() => selector[i]?.classList.add('fadeIn'), time * i);
    }
}
fadeInItems(bestItems, 300);
fadeInItems(newItems, 300);
fadeInItems(saleItems, 300);
fadeInItems(top10, 150);
