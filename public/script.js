const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

let tasks = [
  { id: 1, text: "Finish the programming exercise", completed: false },
  { id: 2, text: "Read the course material", completed: true }
];

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
    completeButton.addEventListener("click", () => toggleTask(task.id));

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

function addTask(text) {
  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((item) => item.id !== id);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();
