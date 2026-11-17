const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

let tasks = [];

async function loadTasks() {
  const response = await fetch("/api/tasks");
  tasks = await response.json();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    if (task.completed) {
      listItem.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-button";
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", () => {
      toggleTask(task.id, !task.completed);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    actions.append(completeButton, deleteButton);
    listItem.append(taskText, actions);
    taskList.append(listItem);
  });
}

async function addTask(text) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text })
  });
  const task = await response.json();

  tasks.push(task);
  renderTasks();
}

async function toggleTask(id, completed) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: completed })
  });
  const updatedTask = await response.json();

  tasks = tasks.map((task) => task.id === id ? updatedTask : task);
  renderTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  tasks = tasks.filter((item) => item.id !== id);
  renderTasks();
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  await addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

loadTasks();
