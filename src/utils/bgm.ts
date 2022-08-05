const character = document.querySelector('#mario') as HTMLElement
const bubble = document.querySelector('#bubble') as HTMLElement
const firework = document.querySelector('#firework') as HTMLElement
const playBtn = document.querySelector('audio') as HTMLAudioElement

playBtn.addEventListener('play', animate)
playBtn.volume = 0.1

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time)
  })
}

class MarioAnimation {
  private step = 0

  constructor(
    private goal: number,
    private x: number,
    private runSpeed: number,
    private y: number,
    private jumpSpeed: number,
    private opacity = 1
  ) {}

  async movement(time: number) {
    if (!this.step) {
      await sleep(time)
    } else if (this.step > this.goal) {
      character.style.opacity = this.opacity.toString()
      return
    }

    if (this.x) {
      character.style.left = `${this.x + this.step / this.runSpeed}%`
    }

    if (this.y) {
      character.style.top = `${this.y - this.step / this.jumpSpeed}%`
    }

    this.step += 0.5

    requestAnimationFrame(() => this.movement(0))
  }
}

const run = new MarioAnimation(16, 35, 4, 0, 0)
const jump = new MarioAnimation(22, 38, 1, 26, 3)
const climbDown = new MarioAnimation(53, 0, 0, 18, -1)
const enterCastle = new MarioAnimation(32, 61, 2, 71, -4, 0)

async function animate() {
  bubble.style.opacity = '1'
  await sleep(4000)
  bubble.style.opacity = '0'
  await run.movement(500)
  await jump.movement(1000)
  await climbDown.movement(1500)
  await enterCastle.movement(2500)
  firework.style.opacity = '1'
}
