const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.button-start');
const session = document.querySelector('.minutes');
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let myInterval;
let state = true;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if(state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;

            if(secondsLeft < 10){
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if(minutesLeft === 0 && secondsLeft === 0){
                bells.play();
                clearInterval(myInterval);
            }
        }

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task!");
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `
    <label>
        <input type="checkbox">
        <span>${task}</span>
    </label>
    <span class="edit-btn"> edit </span>
    <span class="delete-btn"> delete </span>`;
    listContainer.appendChild(li);
    inputBox.value="";
}

startBtn.addEventListener('click', appTimer);