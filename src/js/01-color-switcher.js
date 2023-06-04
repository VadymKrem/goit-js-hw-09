const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId;


btnStart.addEventListener('click', onStartChangeColor)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColorBody() {
    document.body.style.backgroundColor = getRandomHexColor();
} 

function onStartChangeColor(event) {
    event.target.removeEventListener('click', onStartChangeColor);
    
    btnStart.setAttribute('disabled', '');
    btnStop.addEventListener('click', onStopChangeColor);
    
    changeColorBody()
    intervalId = setInterval(changeColorBody, 1000);
    }


function onStopChangeColor(event) {
    event.target.removeEventListener('click', onStopChangeColor);
    btnStart.removeAttribute('disabled', '');
    btnStart.addEventListener('click', onStartChangeColor);
    clearInterval(intervalId);
}
