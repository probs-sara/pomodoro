const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.button-start');
const session = document.querySelector('.minutes');
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const incompleteCounter = document.getElementById("incomplete-counter");
let myInterval;
let state = true;

const startTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);
    if(state) {
        state = false;
        let totalSeconds = sessionAmount * 60;
        startBtn.textContent="pause";
        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');
            totalSeconds--;
            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;
            if(secondsLeft < 10){
                secondDiv.textContent = '0' + secondsLeft;
                document.title=minutesLeft+":0"+secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
                document.title=minutesLeft+":"+secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;
            if(minutesLeft === 0 && secondsLeft === 0){
                bells.play();
                clearInterval(myInterval);
                state=true;
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else if(startBtn.textContent==="pause"){
        clearInterval(myInterval);
        startBtn.textContent="resume";
        state=true;
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
    <span class="delete-btn"> delete </span>
    <span class="edit-btn"> edit </span>
    `;
    listContainer.appendChild(li);
    inputBox.value="";
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });
    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent);
        if(update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            updateCounters();
        }
    });
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCounters();
    });
    updateCounters();
}

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const incompleteTasks = document.querySelectorAll("li:not(.completed)").length;
    completedCounter.textContent = completedTasks;
    incompleteCounter.textContent = incompleteTasks;
}

inputBox.addEventListener("keyup", function (event) {
    if(event.key==="Enter") {
        addTask();
    }
});

startBtn.addEventListener('click', startTimer);
updateCounters();