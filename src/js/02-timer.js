import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Code for CSS

const timeInput = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const value = document.querySelectorAll('.value');
const label = document.querySelectorAll('.label');
const startBtn = document.querySelector('button[data-start]');

timeInput.style.fontSize = '20px';
timeInput.style.fontWeight = 'bold';
timeInput.style.marginLeft = '10px';

timer.style.display = 'flex';

for (let i = 0; i < field.length; i++) {
  field[i].style.display = 'flex';
  field[i].style.flexDirection = 'column';
  field[i].style.alignItems = 'center';
  field[i].style.margin = '20px 10px';
}

for (let i = 0; i < value.length; i++) {
  value[i].style.fontSize = '36px';
}

for (let i = 0; i < label.length; i++) {
  label[i].style.fontWeight = 'bold';
  label[i].style.textTransform = 'uppercase';
}

startBtn.style.fontSize = '20px';

// Code for timer

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(timeInput, options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(timeInput.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      let timeLeft = convertMs(countdown);
      days.textContent = addLeadingZero(timeLeft.days);
      hours.textContent = addLeadingZero(timeLeft.hours);
      minutes.textContent = addLeadingZero(timeLeft.minutes);
      seconds.textContent = addLeadingZero(timeLeft.seconds);
    } else {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(timer);
    }
  }, 1000);
});
