"use strict";
const character = document.querySelector('#mario');
const bubble = document.querySelector('#bubble');
const firework = document.querySelector('#firework');
const playBtn = document.querySelector('audio');
playBtn?.addEventListener('play', animate);
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
}
class MarioAnimation {
    constructor(goal, x, runSpeed, y, jumpSpeed, opacity = 1) {
        this.step = 0;
        this.goal = goal;
        this.opacity = opacity;
        this.x = x;
        this.runSpeed = runSpeed;
        this.y = y;
        this.jumpSpeed = jumpSpeed;
    }
    async movement(time) {
        if (!this.step) {
            await sleep(time);
        }
        else if (this.step > this.goal) {
            character.style.opacity = this.opacity;
            return;
        }
        if (this.x) {
            character.style.left = this.x + this.step / this.runSpeed + '%';
        }
        if (this.y) {
            character.style.top = this.y - this.step / this.jumpSpeed + '%';
        }
        this.step += 0.5;
        requestAnimationFrame(() => this.movement());
    }
}
const run = new MarioAnimation(16, 35, 4, 0, 0);
const jump = new MarioAnimation(22, 38, 1, 26, 3);
const climbDown = new MarioAnimation(53, 0, 0, 18, -1);
const enterCastle = new MarioAnimation(32, 61, 2, 71, -4, 0);
async function animate() {
    bubble.style.opacity = 1;
    await sleep(4000);
    bubble.style.opacity = 0;
    await run.movement(500);
    await jump.movement(1000);
    await climbDown.movement(1500);
    await enterCastle.movement(2500);
    firework.style.opacity = 1;
}
