const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const intervalID = setInterval(changeColorBody, 1000);


btnStart.addEventListener('click', onStartChangeColor)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColorBody() {
    document.body.style.backgroundColor = getRandomHexColor();
} 

function onStartChangeColor(event) {
    event.target.btnStart.removeEventListener('click', onStartChangeColor);
    btnStart.setAttribute('disabled', '');
    btnStop.addEventListener('click', onStopChangeColor);
    setInterval(changeColorBody, 1000);
    }


function onStopChangeColor(event) {
    event.target.btnStop.removeEventListener('click', onStopChangeColor);
    btnStart.setAttribute('enabled', '');
    btnStart.addEventListener('click', onStartChangeColor);
    clearInterval(intervalID);
}
