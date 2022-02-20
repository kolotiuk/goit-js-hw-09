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
    onBtnDisabled(true, false);

    refs.body.style.backgroundColor = getRandomHexColor();

    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

const onClickStopColorChange = () => {
    onBtnDisabled(false, true);
    clearInterval(intervalId);
};

function onBtnDisabled(btnTrue, btnFalse) {
    refs.btnStart.disabled = btnTrue;
    refs.btnStop.disabled = btnFalse;
}

refs.btnStart.addEventListener('click', onClickColorChange);
refs.btnStop.addEventListener('click', onClickStopColorChange);
