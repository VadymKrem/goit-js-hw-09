import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    hoursTimer: document.querySelector('span[data-hours]'),
    daysTimer: document.querySelector('span[data-days]'),
    minutesTimer: document.querySelector('span[data-minutes]'),
    secondsTimer: document.querySelector('span[data-seconds]')
}

const getDateUser = flatpickr("#datetime-picker", {
    enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      let userChoiceDate = selectedDates[0].getTime();
      let dateNow = new Date();
      if (userChoiceDate < dateNow.getTime()) {
         Notiflix.Notify.warning("Please choose a date in the future");
        refs.btnStart.disabled = true;
      } else {
        refs.btnStart.disabled = false;
      };
    console.log(selectedDates[0]);
  },
});

refs.btnStart.addEventListener('click', onBtnClick);

let timerId;

function startReverseTime() {
    const inputDate = getDateUser.selectedDates[0].getTime();
    const beginDate = new Date().getTime();
    const delta = inputDate - beginDate;
    const { days, hours, minutes, seconds } = convertMs(delta);

    refs.secondsTimer.innerText = seconds.toString().padStart(2, '0');
    refs.minutesTimer.innerText = minutes.toString().padStart(2, '0');
    refs.hoursTimer.innerText = hours.toString().padStart(2, '0');
    refs.daysTimer.innerText = days.toString().padStart(2, '0');

    if(delta <= 0) {
        clearInterval(timerId);
        refs.secondsTimer.textContent = '00';
        refs.minutesTimer.textContent = '00';
        refs.hoursTimer.textContent = '00';
        refs.daysTimer.textContent = '00';
        return;
    }
}

function onBtnClick() {
    startReverseTime();
    timerId = setInterval(() => startReverseTime(), 1000);
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

