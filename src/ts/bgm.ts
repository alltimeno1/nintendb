const character = <HTMLElement>document.querySelector('#mario')
const bubble = <HTMLElement>document.querySelector('#bubble')
const firework = <HTMLElement>document.querySelector('#firework')
const playBtn = <HTMLElement>document.querySelector('audio')

playBtn.addEventListener('play', animate)

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time)
  })
}

class MarioAnimation {
  constructor(
    private goal: number,
    private x: number,
    private runSpeed: number,
    private y: number,
    private jumpSpeed: number,
    private opacity: number = 1,
    private step: number = 0
  ) {}

  async movement(time: number): Promise<void> {
    if (!this.step) {
      await sleep(time)
    } else if (this.step > this.goal) {
      character.setAttribute('style', `opacity: ${this.opacity};`)
      return
    }

    if (this.x) {
      character.style.left = this.x + this.step / this.runSpeed + '%'
    }

    if (this.y) {
      character.style.top = this.y - this.step / this.jumpSpeed + '%'
    }

    this.step += 0.5

    requestAnimationFrame(() => this.movement(0))
  }
}

const run: MarioAnimation = new MarioAnimation(16, 35, 4, 0, 0)
const jump: MarioAnimation = new MarioAnimation(22, 38, 1, 26, 3)
const climbDown: MarioAnimation = new MarioAnimation(53, 0, 0, 18, -1)
const enterCastle: MarioAnimation = new MarioAnimation(32, 61, 2, 71, -4, 0)

async function animate(): Promise<void> {
  bubble.setAttribute('style', 'opacity: 1;')
  await sleep(4000)
  bubble.setAttribute('style', 'opacity: 0;')
  await run.movement(500)
  await jump.movement(1000)
  await climbDown.movement(1500)
  await enterCastle.movement(2500)
  firework.setAttribute('style', 'opacity: 1;')
}
