"use strict";
const todoElement = document.querySelector("#todo");
const submitButton = document.querySelector("#add-todo");
const todosDisplayElement = document.querySelector("#todos");

const getTodosFromLocalStorage = function () {
  let todos = [];
  const todosString = localStorage.getItem("todo");
  if (todosString) {
    // console.log(todosString);
    todos = JSON.parse(todosString);
  }
  return todos;
};

const addTodo = function () {
  const todoValue = todoElement.value;
  if (!todoValue.trim()) return;
  todoElement.value = "";
  const todos = getTodosFromLocalStorage();
  todos.push(todoValue);
  localStorage.setItem("todo", JSON.stringify(todos));
  showTodos();
};

const removeTodos = function (todo) {
  let todos = getTodosFromLocalStorage();
  const filteredTodos = todos.filter((item) => item !== todo);
  localStorage.setItem("todo", JSON.stringify(filteredTodos));
  showTodos();
};

const showTodos = function () {
  const todos = getTodosFromLocalStorage();
  // console.log(todos);

  todosDisplayElement.innerHTML = "";
  if (todos.length) {
    todos.forEach((todo) => {
      const divEle = document.createElement("div");
      divEle.classList.add("div-li");

      const todoContentEle = document.createElement("p");
      todoContentEle.textContent = todo;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");

      // const editButton = document.createElement("button");
      // editButton.textContent = "Edit";
      // editButton.classList.add("edit-button");

      deleteButton.addEventListener("click", (event) => {
        const toBeDeletedTodo = deleteButton.previousSibling.textContent;
        removeTodos(toBeDeletedTodo);
      });

      divEle.append(todoContentEle, deleteButton);
      todosDisplayElement.append(divEle);
    });
  }
};

showTodos();

submitButton.addEventListener("click", function () {
  addTodo();
});
