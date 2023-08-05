function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.start.addEventListener('click', onClickChangeColor);
refs.stop.addEventListener('click', offClickChangeColor);

function onClickChangeColor() {
  console.log('Change documents color');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function offClickChangeColor() {
  clearInterval(timerId);
  refs.stop.disabled = true;
  refs.start.disabled = false;
}
