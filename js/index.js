document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".add-todo input");
  const addButton = document.querySelector(".add-todo button");
  const todoListContainer = document.querySelector(".todo-list");
  const completedList = document.querySelector(".completed-list");

  let todos = JSON.parse(localStorage.getItem("todoList")) || [];

  // Event listeners
  addButton.addEventListener("click", addTodo);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
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

    updateCompletedCount();
  }

  function updateCompletedCount() {
    const checkedTodoLength = todos.filter(todoItem => todoItem.completed).length;
    completedTodoList(checkedTodoLength);
  }

  function completedTodoList(checkedTodoLength) {
    completedList.innerHTML = "";
    const listItem = document.createElement("div");
    listItem.className = "completed-items";
    listItem.textContent = `Completed ${checkedTodoLength}`;
    listItem.style.padding = "10px";
    completedList.appendChild(listItem);
  }

  function createTodoElements(todo, index) {
    const listItem = document.createElement("div");
    listItem.className = "todo-item";

    const checkBox = createCheckBox(todo, index);
    const spanText = createEditableText(todo, index);
    const deleteBtn = createDeleteButton(index);

    listItem.appendChild(checkBox);
    listItem.appendChild(spanText);
    listItem.appendChild(deleteBtn);

    return listItem;
  }

  function createCheckBox(todo, index) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.style.cursor = "pointer";
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", () => {
      todos[index].completed = checkBox.checked;
      saveTodos();
      updateCompletedCount();
    });
    return checkBox;
  }

  function createEditableText(todo, index) {
    const spanText = document.createElement("span");
    spanText.textContent = todo.text;
    spanText.setAttribute("contenteditable", true);
    spanText.className = "todo-text";
    spanText.addEventListener("blur", () => {
      todos[index].text = spanText.textContent.trim();
      saveTodos();
    });
    return spanText;
  }

  function createDeleteButton(index) {
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
      saveTodos();
      updateCompletedCount();
    });
    return deleteBtn;
  }

  function addTodo() {
    const todoText = input.value.trim();
    if (todoText !== "") {
      const newTodo = { text: todoText, completed: false };
      todos.push(newTodo);
      renderTodos();
      saveTodos();
      input.value = "";
    }
  }

  renderTodos();
});
