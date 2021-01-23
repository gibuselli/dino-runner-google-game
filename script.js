const dino = document.querySelector(".dino");
const background = document.querySelector('.background');
const score = document.querySelector('.score');
let isJumping = false;
let position = 0;
let scoreCounter = 0;

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    if (!isJumping) {
      jump();
    }

    console.log("Pressionou Espaço");
  }
}

function jump() {
  isJumping = true;  
  
  let upInterval = setInterval(() => {
    if (position >= 200)  {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 20) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 20;
        dino.style.bottom = position + "px"; 
      }, 20);

    } else {
      position += 20;
      dino.style.bottom = position + "px";     
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTimer = Math.random() * 7000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {    
    if (cactusPosition <= 0) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      scoreCounter++;
      score.textContent = scoreCounter;
    } else if (cactusPosition > 140 && cactusPosition < 250 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo!</h1><br><h2 class="final-score">Pontuação Final: ' + scoreCounter + '</h2>';
      console.log("game over");
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTimer);
} 

createCactus();
document.addEventListener("keydown", handleKeyUp);
