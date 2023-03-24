const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

// add the todo item on pressing the `ENTER` key
item.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && item.value != "") {
    addTodo(item.value);
    item.value = "";
    saveTodo();
  }
});

// add a task in the todo item list
const addTodo = (item, isToggle = false) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    ${item} <i class="fas fa-times"></i>
    `;

  // mark the task as `DONE` by clicking the task
  listItem.addEventListener("click", (event) => {
    listItem.classList.toggle("done");
    listItem.autofocus = !listItem.autofocus;
    saveTodo();
  });

  // delete the task from the todo list
  listItem.querySelector("i").addEventListener("click", () => {
    listItem.remove();
    saveTodo();
  });

  // when the item is fetched from local storage then toggling the done task
  if (isToggle) {
    listItem.classList.toggle("done");
  }

  // add the task in the task list
  toDoBox.appendChild(listItem);
};

// to save the todo task in local storage
const saveTodo = () => {
  const tasks = document.querySelectorAll("li");
  const data = [];
  console.log(tasks);

  tasks.forEach((task) => {
    data.push({ value: task.innerText, toggle: task.autofocus });
  });

  // save the data in local storage
  localStorage.setItem("tasks", JSON.stringify(data));
};

// self calling function on every reload/rendering of the webpage
(function () {
  // get the data from local storage
  const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
  localStorageTasks.forEach((localStorageTask) => {
    addTodo(localStorageTask.value, localStorageTask.toggle);
  });
})();
