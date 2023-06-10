const todoElement = document.querySelector("#todo");
const submitButton = document.querySelector("#add-todo");
const todosDisplayElement = document.querySelector("#todos");

const getTodosFromLocalStorage = function () {
  let todos = [];
  const todosString = localStorage.getItem("todo");

  if (todosString) {
    todos = JSON.parse(todosString);
  }
  return todos;
};

const addTodo = function () {
  const todoValue = todoElement.value;
  todoElement.value = "";
  const todos = getTodosFromLocalStorage();
  todos.push(todoValue);
  localStorage.setItem("todo", JSON.stringify(todos));
  showTodos();
};

// const removeTodos = function(){
//   const todos = getTodosFromLocalStorage();
// }

const showTodos = function () {
  const todos = getTodosFromLocalStorage();
  todosDisplayElement.innerHTML = "";
  if (todos.length) {
    todos.forEach((todo) => {
      const element = document.createElement("h1");
      element.textContent = todo;
      todosDisplayElement.appendChild(element);
    });
  }
};
showTodos();

submitButton.addEventListener("click", function () {
  addTodo();
});
