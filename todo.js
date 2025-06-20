const todoList = document.querySelector("#todo-list");
const todoForm = document.querySelector("#todo-form");

// local storage send and receive data
const getData = () => JSON.parse(localStorage.getItem("todos"));
const setDate = (todos) => localStorage.setItem("todos", JSON.stringify(todos));

let todos = getData() || [];

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.querySelector("#todo");
    if (task && task.value.trim() !== "") {
        const newTodo = {
            id: Date.now(),
            task: task.value.trim(),
            completed: false
        };
        todos.push(newTodo);
        setDate(todos);
        renderTodos(todos);
    }
});
function renderTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach((t) => render(t));
}
function render(todo) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "d-flex align-items-center justify-content-between mb-2";

    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", `task-${todo.id}`);
    checkBox.className = "me-2";

    const task = document.createElement("label");
    task.setAttribute("for", `task-${todo.id}`);
    task.innerText = todo.task;

    leftDiv.append(checkBox, task);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    taskDiv.append(leftDiv, deleteBtn);
    todoList.appendChild(taskDiv);
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    setDate(todos);
    renderTodos(todos);
}
renderTodos(todos);
