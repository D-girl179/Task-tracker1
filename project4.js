const tasks = [];
let nextId = 1;

const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");

function addTask(){
    let title = taskInput.value;
    let priority = Number(prioritySelect.value);
    if(title === ""){
        return;
    }
    const newTask = {
        id: nextId,
        title: title,
        priority: priority,
        status: "pending"
    }
    tasks.push(newTask);
    nextId = nextId + 1;
    taskInput.value = "";
}

function getPriorityLabel(priority){
    if(priority === 5){
        return "High";
    } else if(priority === 4){
        return "Medium";
    } else {
        return "Low";
    }
}

function renderTasks(taskArray){
    taskList.innerHTML = "";
    for(let i = 0; i < taskArray.length; i++){
        const task = taskArray[i];
        const label = getPriorityLabel(task.priority);
        let taskDiv = document.createElement("div");
        taskDiv.innerHTML = `<span>${task.title}</span> <span>${label}</span> <button onclick="completeTask(${task.id}); renderTasks(tasks); updatePendingCount();">Complete</button>`;
        taskList.appendChild(taskDiv);
    }
}

function updatePendingCount(){
    let pending = tasks.filter(task => task.status === "pending");
    pendingCount.textContent = `You have ${pending.length} pending tasks`;
}

function completeTask(id){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === id){
            tasks[i].status = "completed";
            break;
        }
    }
}

const filterAll = document.getElementById("filter-all");
const filterPending = document.getElementById("filter-pending");
const filterCompleted = document.getElementById("filter-completed");

addBtn.addEventListener("click", function(){
    addTask();
    renderTasks(tasks);
    updatePendingCount();
});

filterAll.addEventListener("click", function(){
    renderTasks(tasks);
});

filterPending.addEventListener("click", function(){
    renderTasks(tasks.filter(task => task.status === "pending"));
});

filterCompleted.addEventListener("click", function(){
    renderTasks(tasks.filter(task => task.status === "completed"));
});
