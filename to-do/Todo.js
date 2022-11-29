import {renderList} from './index.js';

export default class Todo {
  nextId = 0;

  constructor() {
    this.todos = [];
  }

  addTodo(title) {
    const todo = { id: this.nextId++, title, completed: false };
    this.todos.push(todo);
    renderList();
  }

  updateTodo(id, title, completed) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title, completed };
      }
    })
    renderList();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  isEmpty() {
    return this.todos.length === 0;
  }

  getTodos() {
    return this.todos;
  }

  getHtmlElement(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const input = document.createElement('input');
    const checkBox = document.createElement('input');
    

    input.type = 'text';
    checkBox.type = 'checkbox';
    checkBox.checked = todo.completed;
    input.value = todo.title;
    input.readOnly = true;
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    deleteBtn.textContent = 'Delete';
    content.classList.add('content')

    content.appendChild(checkBox);
    content.appendChild(input);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    content.appendChild(actions);
    li.appendChild(content);
    
    // event listeners
    deleteBtn.addEventListener('click', (e) => {
      this.todos = this.todos.filter(item => todo.id !== item.id);
      renderList();
    });

    editBtn.addEventListener('click', () => {
      const editClass = editBtn.className;
      if (editClass === 'edit') {
        input.readOnly = false;
        input.focus();
        editBtn.textContent = 'Save';
        editBtn.classList.replace('edit', 'save');
      } else {
        input.readOnly = true;
        editBtn.textContent = 'Edit';
        editBtn.classList.replace('save', 'edit')
        this.updateTodo(todo.id, input.value, todo.completed);
      }
    })

    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        this.updateTodo(todo.id, todo.title, true);
      }
    })

    return li;
  }
}