const addTask = document.getElementById('new-task-submit');
const form = document.getElementById('new-task-form');
const input = document.getElementById('new-task-input');
const list = document.getElementById('todo-list');
const addCoins = document.getElementById('add-coins');
const coinsCount = document.getElementById('coins-number');
const food1 = document.getElementById('food-1');
const food2 = document.getElementById('food-2');
const inputLimit = document.getElementById('limit');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let toDoItemElems = [];

let coins;
!localStorage.coins ? coins = 0 : coins = localStorage.getItem('coins', coins);
coinsCount.innerHTML = `Coins: ${coins}`;

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemple = (task, index) => {
    return `
    <li class="task ${task.completed ? 'checked' : ''}">
    <div class="item">
        <div class="checkbox-circle">
          <input type="checkbox" onclick ="completeTask(${index})" id="checkbox-circle${index}" name="check" ${task.completed ? 'checked' : ''}>
          <label for="checkbox-circle${index}">${task.description}</label>
        </div>
    </div>
    <div class="actions">
        <button class="edit" onclick ="editTask(${index})">Edit</button>
        <button class="delete" onclick ="deleteTask(${index})">Delete</button>
    </div>
    </li>
    `;
}

const fillHtmlList = () => {
    list.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            list.innerHTML += createTemple(item, index);
        });
        toDoItemElems = document.querySelectorAll('.task');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('coins', coins);
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        toDoItemElems[index].classList.add('checked');
    } else {
        toDoItemElems[index].classList.remove('checked');
    }
    updateLocal();
}

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

const editTask = index => {
    let changedTask = prompt("Please enter your task");
    if (changedTask === null) {
        tasks[index].description = tasks[index].description;
    }else{
        tasks[index].description = changedTask;
        updateLocal();
        fillHtmlList();
    } 
}

addTask.addEventListener('click', () => {
    if (input.value == '') {
        alert("Write a task");
    } else {
        tasks.push(new Task(input.value));
        updateLocal();
        fillHtmlList();
        input.value = '';
    } 
    inputLimit.innerHTML = 25;
})

addCoins.addEventListener('click', () => {
    for (let i = 0; i<tasks.length; i++) {
        if (tasks[i].completed) {
             coins++;
             console.log(i);
             deleteTask(i);
             i--;
            }
        coinsCount.innerHTML = `Coins: ${coins}`;
    }
    updateLocal();
    fillHtmlList();
})  

input.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        addTask.click();    
    }
})

food1.addEventListener('click', () => {
    if (coins >= 2) {
        coins = coins - 2;
        updateLocal();
        coinsCount.innerHTML = `Coins: ${coins}`;
        document.getElementById('happyCat').classList.remove("nonShow");
        document.getElementById('normalCat').classList.add("nonShow");
        const showNormalCat = () => {
            document.getElementById('happyCat').classList.add("nonShow");
            document.getElementById('normalCat').classList.remove("nonShow");
        }
        setTimeout(showNormalCat, 5000);
    } else (alert("Not enough coins"));
} )

food2.addEventListener('click', () => {
    if (coins >= 4) {
        coins = coins - 4;
        updateLocal();
        coinsCount.innerHTML = `Coins: ${coins}`;
        document.getElementById('happyCat').classList.remove("nonShow");
        document.getElementById('normalCat').classList.add("nonShow");
        const showNormalCat = () => {
            document.getElementById('happyCat').classList.add("nonShow");
            document.getElementById('normalCat').classList.remove("nonShow");
        }
        setTimeout(showNormalCat, 10000);
    } else (alert("Not enough coins"));
} )

const countInput = (obj) => {
    inputLimit.innerHTML = 25 - obj.value.length;
}
