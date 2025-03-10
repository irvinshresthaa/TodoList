document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".add-todo input");
  const addButton = document.querySelector(".add-todo button");
  const todoListContainer = document.querySelector(".todo-list");
  const completedList = document.querySelector(".completed-list");

  let todos = JSON.parse(localStorage.getItem("todoList")) || [];
  //on button click
  addButton.addEventListener("click", addTodo);

  //on "enter" key press
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  function saveTodos() {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }

  function renderTodos() {
    todoListContainer.innerHTML = "";

    todos.forEach((todo, index) => {
      const listItem = createTodoElements(todo, index);
      todoListContainer.appendChild(listItem);
    });

    const checkedTodoLength = todos.filter(
      (todoItem) => todoItem.completed
    ).length;

    checkedTodoLength > 0 && completedTodoList(checkedTodoLength);
  }

  function completedCount() {
    const checkedTodoLength = todos.filter(
      (todoItem) => todoItem.completed
    ).length;

    completedTodoList(checkedTodoLength || 0);
  }

  function createTodoElements(todo, index) {
    const listItem = document.createElement("div");
    listItem.className = "todo-item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.style.cursor = "pointer";
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", function () {
      todos[index].completed = checkBox.checked;
      saveTodos();
      completedCount();
    });

    const spanText = document.createElement("span");
    spanText.textContent = todo.text;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", function () {
      todos.splice(index, 1);
      renderTodos();
      saveTodos();
      completedCount();
    });

    listItem.appendChild(checkBox);
    listItem.appendChild(spanText);
    listItem.appendChild(deleteBtn);

    return listItem;
  }

  function completedTodoList(checkedTodoLength) {
    completedList.innerHTML = "";
    const listItem = document.createElement("div");
    listItem.className = "completed-items";
    listItem.textContent = `Completed ${checkedTodoLength}`;
    listItem.style.padding = "10px";
    completedList.appendChild(listItem);
  }

  function addTodo() {
    if (input.value.trim() !== "") {
      const newTodo = { text: input.value, completed: false };
      todos.push(newTodo);
      renderTodos();
      saveTodos();
      input.value = "";
    }
  }

  renderTodos();
});
