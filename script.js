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

let timePassedInSec = 5;
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
  changeContext('descanso-corto');
  shortBtn.classList.add("active");
});

focusBtn.addEventListener('click', () => {
  changeContext('enfoque');
  focusBtn.classList.add("active");
});

longBtn.addEventListener('click', () => {
  changeContext('descanso-largo');
  longBtn.classList.add("active");
});

function changeContext(context){

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
    restart();
    alert('Tiempo terminado');
    return
  }
  timePassedInSec -= 1;
  console.log("temporizador: " + timePassedInSec);
}

startBtn.addEventListener('click', startPause);

function startPause(){
  if(idInterval){
    restart();
    return
  }
  idInterval = setInterval(countdown, 1000)
}

function restart(){
  clearInterval(idInterval);
  idInterval = null;
}
