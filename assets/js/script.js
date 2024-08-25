let tasks = [
  { id: 16, description: "Hacer mercado", completed: false },
  { id: 60, description: "Estudiar para la prueba", completed: false },
  { id: 24, description: "Sacar a pasear a Tobby", completed: false },
];

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  for (const task of tasks) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
          <td>${task.id}</td>
          <td>${task.description}</td>
          <td>
              <input type="checkbox" ${
                task.completed ? "checked" : ""
              } data-id="${task.id}">
              <button class="delete-btn" data-id="${task.id}">✖</button>
          </td>
      `;
    taskList.appendChild(newRow);
  }

  updateTaskCounts();
}

function updateTaskCounts() {
  const totalTasks = tasks.length;
  let completedTasks = 0;

  for (const task of tasks) {
    if (task.completed) {
      completedTasks++;
    }
  }

  document.getElementById("total-tasks").textContent = totalTasks;
  document.getElementById("completed-tasks").textContent = completedTasks;
}

document.getElementById("add-task").addEventListener("click", function () {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const newTask = {
      id: Math.floor(Math.random() * 90) + 10,
      description: taskText,
      completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
  }
});

document
  .getElementById("task-list")
  .addEventListener("click", function (event) {
    if (event.target.type === "checkbox") {
      const taskId = parseInt(event.target.getAttribute("data-id"));

      for (const task of tasks) {
        if (task.id === taskId) {
          task.completed = event.target.checked;
          break;
        }
      }

      updateTaskCounts();
    }

    if (event.target.classList.contains("delete-btn")) {
      const taskId = parseInt(event.target.getAttribute("data-id"));

      tasks = tasks.filter((task) => task.id !== taskId);

      renderTasks();
    }
  });

document.addEventListener("DOMContentLoaded", renderTasks);
