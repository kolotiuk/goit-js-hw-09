const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

let timerId = null;

btnStartRef.addEventListener('click', () => {
  document.body.style.backgroundColor = getRandomHexColor();

  btnStartRef.disabled = true;
  btnStopRef.disabled = false;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStopRef.addEventListener('click', () => {
  clearInterval(timerId);
  btnStopRef.disabled = true;
  btnStartRef.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
