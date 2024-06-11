const html = document.querySelector('html');
const shortBtn = document.querySelector('.app__card-button--corto');
const focusBtn = document.querySelector('.app__card-button--enfoque');
const longBtn = document.querySelector('.app__card-button--largo');

shortBtn.addEventListener('click', () => {
  html.setAttribute('data-contexto', 'descanso-corto');
});

focusBtn.addEventListener('click', () => {
  html.setAttribute('data-contexto', 'enfoque');
});

longBtn.addEventListener('click', () => {
  html.setAttribute('data-contexto', 'descanso-largo');
});
