class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  render() {
    const li = document.createElement('li');
    li.textContent = this.description;
    li.className = this.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.completed;
    checkbox.addEventListener('change', () => {
      this.toggleCompleted();
      renderTasks();
    });
    li.appendChild(checkbox);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((task) => task !== this);
      renderTasks();
    });
    li.appendChild(deleteButton);

    return li;
  }
}

let tasks = [];

const taskList = document.getElementById('task-list');
const taskDesc = document.getElementById('task-desc');
const addTask = document.getElementById('add-task');
const clearTasks = document.getElementById('clear-tasks');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    taskList.appendChild(task.render());
  });
}

addTask.addEventListener('click', () => {
  if (taskDesc.value.trim()) {
    tasks.push(new Task(taskDesc.value));
    taskDesc.value = '';
    renderTasks();
  }
});

clearTasks.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});
