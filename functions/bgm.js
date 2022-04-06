const character = document.querySelector('#mario')
const bubble = document.querySelector('#bubble')
const playBtn = document.querySelector('audio')
let dist0 = 0
let dist1 = 0
let dist2 = 0
let dist3 = 0

playBtn.addEventListener('play', animate)

function animate() {
  bubble.style.opacity = 1
  setTimeout(() => (bubble.style.opacity = 0), 4000)
  setTimeout(() => move(), 4500)
  setTimeout(() => jump(), 5500)
  setTimeout(() => climbDown(), 7000)
  setTimeout(() => enterCastle(), 9500)
}

function move() {
  if (dist0 > 16) {
    return
  }
  character.style.left = 35 + dist0 / 4 + '%'
  dist0 += 0.5

  requestAnimationFrame(move)
}

function jump() {
  if (dist1 > 22) {
    return
  }
  character.style.left = 38 + dist1 + '%'
  character.style.top = 26 - dist1 / 3 + '%'
  dist1 += 0.5

  requestAnimationFrame(jump)
}

function climbDown() {
  if (dist2 > 53) {
    return
  }
  character.style.top = 18 + dist2 + '%'
  dist2 += 0.5

  requestAnimationFrame(climbDown)
}

function enterCastle() {
  if (dist3 > 32) {
    character.style.opacity = 0
    return
  }
  character.style.left = 61 + dist3 / 2 + '%'
  character.style.top = 71 + dist3 / 4 + '%'
  dist3 += 0.5

  requestAnimationFrame(enterCastle)
}
