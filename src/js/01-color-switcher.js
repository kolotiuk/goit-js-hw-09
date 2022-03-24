function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

const onBtnStart = () => {
    body.style.backgroundColor = getRandomHexColor();
    onBtnChecked(true, false);

    if (intervalId) {
        onBtnStop();
        return;
    }

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

const onBtnStop = () => {
    clearInterval(intervalId);
    intervalId = null;
    onBtnChecked(false, true);
};

const onBtnChecked = (btnTrue, btnFalse) => {
    btnStart.disabled = btnTrue;
    btnStop.disabled = btnFalse;
};

onBtnChecked(false, true);

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);
