import Todo from './Todo.js';

const todo = new Todo();
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const list = document.getElementById('list');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  let task = taskInput.value;
  if (task === '') {
    alert('Enter valid task');
    return;
  }
  task = todo.addTodo(task);
  taskInput.value = '';
}

export function renderList() {
 const todoList = todo.getTodos().map(item => todo.getHtmlElement(item));
 list.replaceChildren(...todoList);
}
