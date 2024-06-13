const html = document.querySelector('html');
const shortBtn = document.querySelector('.app__card-button--corto');
const focusBtn = document.querySelector('.app__card-button--enfoque');
const longBtn = document.querySelector('.app__card-button--largo');
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const btns = document.querySelectorAll(".app__card-button");
const inputFocusMusic = document.querySelector("#alternar-musica");
const music = new Audio('./sonidos/luna-rise-part-one.mp3');
const startBtn = document.querySelector('#start-pause');
const startSound = new Audio('/sonidos/play.wav');
const pauseSound = new Audio('/sonidos/pause.mp3');
const endSound = new Audio('/sonidos/beep.mp3');
const startPauseText = document.querySelector('#start-pause span');
const startPauseImg = document.querySelector('#start-pause img');
const timeScreen = document.querySelector('#timer')

startSound.volume = 0.2;
pauseSound.volume = 0.2;
endSound.volume = 0.1;

let timePassedInSec = 1500;
let idInterval = null;


music.loop = true;

inputFocusMusic.addEventListener('change', () => {
  if(music.paused){
    music.play();
  }else{
    music.pause();
  }
});

shortBtn.addEventListener('click', () => {
  timePassedInSec = 300;
  changeContext('descanso-corto');
  shortBtn.classList.add("active");
});

focusBtn.addEventListener('click', () => {
  timePassedInSec = 1500;
  changeContext('enfoque');
  focusBtn.classList.add("active");
});

longBtn.addEventListener('click', () => {
  timePassedInSec = 900;
  changeContext('descanso-largo');
  longBtn.classList.add("active");
});

function changeContext(context){

  displayTime();
  btns.forEach(function(context){
    context.classList.remove("active");
  });
  html.setAttribute('data-contexto', context);
  banner.setAttribute('src', `./imagenes/${context}.png`);

  switch(context){
    case 'enfoque':
      title.innerHTML = `
      Optimiza tu productividad,<br>
          <strong class="app__title-strong">sumérgete en lo que importa.</strong>
          `;
          break;
    case 'descanso-corto':
      title.innerHTML = `
      ¿Qué tal tomar un respiro?<br>
          <strong class="app__title-strong">¡Haz una pausa corta!</strong>
          `;
          break;
    case 'descanso-largo':
      title.innerHTML = `
        Hora de volver a la superficie<br>
          <strong class="app__title-strong">Haz una pausa larga.</strong>
          `;
          break;
  }
}

const countdown = () => {
  if(timePassedInSec <= 0){
    endSound.play();
    restart();
    return
  }
  startPauseText.textContent = "Pausar"
  startPauseImg.setAttribute('src', './imagenes/pause.png');
  timePassedInSec -= 1;
  displayTime();
}

startBtn.addEventListener('click', startPause);


function startPause(){
  if(idInterval){
    pauseSound.play();
    restart();
    return
  }
  startSound.play();
  idInterval = setInterval(countdown, 1000)
}

function restart(){
  startPauseText.textContent = "Comenzar"
  startPauseImg.setAttribute('src', './imagenes/play_arrow.png');
  clearInterval(idInterval);
  idInterval = null;
}

function displayTime(){
  const time =  new Date(timePassedInSec * 1000); 
  const timeFormat = time.toLocaleTimeString('es-ES', {minute: '2-digit', second: '2-digit'});
  timeScreen.innerHTML =`${timeFormat}`;
}

displayTime();