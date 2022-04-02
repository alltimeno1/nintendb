const character = document.querySelector('#mario');

let degree = 0; 
loop();

function loop(){
  if (degree > 26) {
    return;
  }
  character.style.left = 35 + degree + '%';
  // character.style.top = 27 + degree + '%';
  degree += 0.5;
  
  requestAnimationFrame(loop);
}