import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const btnStartRef = document.querySelector('[data-start]');
const datePickerRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnStartRef.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currDate = new Date();
    if (currDate > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    Notiflix.Notify.success('Your date is correct');

    btnStartRef.disabled = false;

    btnStartRef.addEventListener('click', () => {
      btnStartRef.disabled = true;
      timerId = setInterval(() => {
        const currDate = new Date();
        const userTime = new Date(selectedDates[0]);
        const delta = userTime - currDate;

        const { days, hours, minutes, seconds } = convertMs(delta);

        daysRef.textContent = days;
        hoursRef.textContent = hours;
        minutesRef.textContent = minutes;
        secondsRef.textContent = seconds;

        if (secondsRef.textContent <= 0) {
          clearInterval(timerId);
        }
      }, 1000);
    });
  },
};

flatpickr(datePickerRef, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(3, 0);
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, 0);
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    0
  );
  // Remaining seconds
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, 0);

  return { days, hours, minutes, seconds };
}
