"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function scrapDesc($) {
    let desc = '';
    for (let i = 1; i < 5; i++) {
        const text = $(`.product.attribute.description p:nth-child(${i})`).text();
        if (desc.length >= 110) {
            break;
        }
        else if (desc.length + text.length > 110) {
            const slicedText = text.slice(0, 110 - desc.length);
            const commaIdx = slicedText.lastIndexOf('.');
            const screamIdx = slicedText.lastIndexOf('!');
            const questionIdx = slicedText.lastIndexOf('?');
            desc += text.slice(0, Math.max(commaIdx, screamIdx, questionIdx) + 1) + ' ';
            break;
        }
        else if (!text.includes('예약')) {
            desc += text + ' ';
        }
    }
    return desc.trim();
}
exports.default = scrapDesc;
