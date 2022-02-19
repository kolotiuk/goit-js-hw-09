import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
    btnStart: document.querySelector('[data-start]'),

    inputValue: document.querySelector('#datetime-picker'),
};

let userDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];

        if (userDate < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.btnStart.disabled = true;
            return;
        }
        refs.btnStart.disabled = false;
    },
};

refs.btnStart.disabled = true;

flatpickr('#datetime-picker', options);

let intervalId = null;
let isActive = false;

const updateTime = () => {
    if (isActive) {
        return;
    }

    isActive = true;

    intervalId = setInterval(() => {
        const currTime = new Date();
        const diff = userDate - currTime;

        if (diff <= 0) {
            clearInterval(intervalId);
            return;
        }

        refs.btnStart.disabled = true;

        const { days, hours, minutes, seconds } = convertMs(diff);
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;
    }, 1000);
};

refs.btnStart.addEventListener('click', updateTime);

