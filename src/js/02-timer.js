import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = String(Math.floor(ms / day)).padStart(2, 0);
    // Remaining hours
    const hours = String(Math.floor((ms % day) / hour)).padStart(2, 0);
    // Remaining minutes
    const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, 0);
    // Remaining seconds
    const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, 0);

    return { days, hours, minutes, seconds };
}

const btnStart = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
btnStart.disabled = true;

let userDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];
        const currentDate = new Date();
        if (userDate <= currentDate) {
            btnStart.disabled = true;
            alert('Please choose a date in the future');
        } else {
            btnStart.disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);

const onClickStartBtn = () => {
    btnStart.disabled = true;

    setInterval(() => {
        render();
    }, 1000);
};

const render = () => {
    const currentDate = new Date();
    const diff = userDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(diff);
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
};

btnStart.addEventListener('click', onClickStartBtn);
