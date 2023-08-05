import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.getElementById('datetime-picker'),
  start: document.querySelector('[data-start]'),
  timeoutSec: 0,
  dayField: document.querySelector('[data-days]'),
  hourField: document.querySelector('[data-hours]'),
  minuteField: document.querySelector('[data-minutes]'),
  secondField: document.querySelector('[data-seconds]'),
};

refs.start.addEventListener('click', clickCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDateObj = new Date(selectedDates[0]);
    refs.timeoutSec = selectedDateObj - new Date();
    console.log(`Start from: ${refs.timeoutSec}`);
    if (refs.timeoutSec < 0) {
      Notify.warning('Please choose a date in the future');
      refs.start.disabled = true;
    } else {
      refs.start.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function clickCountdown() {
  const timeID = setInterval(() => {
    const dates = convertMs(refs.timeoutSec);
    console.log(dates);
    refs.timeoutSec -= 1000;
    console.log(refs.timeoutSec);
    showTime(dates);
    if (refs.timeoutSec < 0) {
      clearInterval(timeID);
      console.log('babah');
    }
  }, 1000);
}

function showTime(converted) {
  refs.dayField.innerHTML = addLeadingZero(converted.days);
  refs.hourField.innerHTML = addLeadingZero(converted.hours);
  refs.minuteField.innerHTML = addLeadingZero(converted.minutes);
  refs.secondField.innerHTML = addLeadingZero(converted.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
