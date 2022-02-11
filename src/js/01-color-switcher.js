function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    body: document.body,
};

let intervalId = null;

const onClickColorChange = () => {
    refs.btnStart.setAttribute('disabled', 'disabled');
    refs.btnStop.removeAttribute('disabled');

    refs.body.style.backgroundColor = getRandomHexColor();

    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

const onClickStopColorChange = () => {
    refs.btnStart.removeAttribute('disabled');
    refs.btnStop.setAttribute('disabled', 'disabled');
    clearInterval(intervalId);
};

refs.btnStart.addEventListener('click', onClickColorChange);
refs.btnStop.addEventListener('click', onClickStopColorChange);
