// To-Do List Application - JavaScript Functionality

class TodoList {
  constructor() {
    this.todos = [];
    this.filteredTodos = [];
    this.currentFilter = 'all';
    this.editingId = null;
    this.init();
  }

  // Initialize the application
  init() {
    this.loadFromLocalStorage();
    this.setupEventListeners();
    this.render();
  }

  // Setup event listeners
  setupEventListeners() {
    const inputElement = document.getElementById('todoInput');
    const addButton = document.getElementById('addBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearButton = document.getElementById('clearBtn');

    if (inputElement) {
      inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.addTodo();
      });
    }

    if (addButton) {
      addButton.addEventListener('click', () => this.addTodo());
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
    });

    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearCompleted());
    }
  }

  // Add a new to-do item
  addTodo() {
    const inputElement = document.getElementById('todoInput');
    const text = inputElement?.value.trim();

    if (!text) {
      alert('Please enter a task!');
      return;
    }

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: null,
      priority: 'medium',
      category: 'general'
    };

    this.todos.push(todo);
    this.saveToLocalStorage();
    this.render();

    if (inputElement) {
      inputElement.value = '';
      inputElement.focus();
    }
  }

  // Delete a to-do item
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
    this.render();
  }

  // Toggle todo completion status
  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
      this.render();
    }
  }

  // Edit a to-do item
  editTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    const newText = prompt('Edit your task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
      todo.text = newText.trim();
      this.saveToLocalStorage();
      this.render();
    }
  }

  // Set priority for a todo
  setPriority(id, priority) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.priority = priority;
      this.saveToLocalStorage();
      this.render();
    }
  }

  // Set category for a todo
  setCategory(id, category) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.category = category;
      this.saveToLocalStorage();
      this.render();
    }
  }

  // Set due date for a todo
  setDueDate(id, dueDate) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.dueDate = dueDate;
      this.saveToLocalStorage();
      this.render();
    }
  }

  // Filter todos based on status
  setFilter(filter) {
    this.currentFilter = filter;
    this.updateFilterButtons();
    this.render();
  }

  // Update active filter button
  updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.classList.remove('active');
      if (btn.dataset.filter === this.currentFilter) {
        btn.classList.add('active');
      }
    });
  }

  // Get filtered todos
  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter((t) => !t.completed);
      case 'completed':
        return this.todos.filter((t) => t.completed);
      default:
        return this.todos;
    }
  }

  // Clear completed todos
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveToLocalStorage();
    this.render();
  }

  // Sort todos by priority
  sortByPriority() {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    this.todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    this.saveToLocalStorage();
    this.render();
  }

  // Sort todos by due date
  sortByDueDate() {
    this.todos.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    this.saveToLocalStorage();
    this.render();
  }

  // Search todos
  searchTodos(query) {
    if (!query.trim()) {
      this.render();
      return;
    }
    this.filteredTodos = this.todos.filter((todo) =>
      todo.text.toLowerCase().includes(query.toLowerCase())
    );
    this.renderSearchResults();
  }

  // Save todos to localStorage
  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Load todos from localStorage
  loadFromLocalStorage() {
    const stored = localStorage.getItem('todos');
    this.todos = stored ? JSON.parse(stored) : [];
  }

  // Render the todo list
  render() {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;

    const filtered = this.getFilteredTodos();
    const stats = this.getStats();

    if (filtered.length === 0) {
      todoList.innerHTML = `<li class="empty-state">
        <p>${this.currentFilter === 'completed' ? 'No completed tasks yet!' : this.currentFilter === 'active' ? 'No active tasks!' : 'No tasks yet! Add one to get started.'}</p>
      </li>`;
      this.updateStats(stats);
      return;
    }

    todoList.innerHTML = filtered
      .map((todo) => this.createTodoElement(todo))
      .join('');

    this.attachTodoEventListeners();
    this.updateStats(stats);
  }

  // Create HTML for a todo item
  createTodoElement(todo) {
    const priorityClass = `priority-${todo.priority}`;
    const completedClass = todo.completed ? 'completed' : '';
    const dueDateText = todo.dueDate
      ? new Date(todo.dueDate).toLocaleDateString()
      : '';

    return `
      <li class="todo-item ${completedClass} ${priorityClass}">
        <div class="todo-content">
          <input 
            type="checkbox" 
            class="todo-checkbox" 
            data-id="${todo.id}"
            ${todo.completed ? 'checked' : ''}
          >
          <span class="todo-text">${this.escapeHtml(todo.text)}</span>
        </div>
        <div class="todo-meta">
          ${todo.priority !== 'medium' ? `<span class="badge priority-badge priority-${todo.priority}">${todo.priority}</span>` : ''}
          ${todo.category !== 'general' ? `<span class="badge category-badge">${todo.category}</span>` : ''}
          ${dueDateText ? `<span class="badge due-date-badge">${dueDateText}</span>` : ''}
        </div>
        <div class="todo-actions">
          <button class="btn-small btn-edit" data-id="${todo.id}" title="Edit">✎</button>
          <button class="btn-small btn-priority" data-id="${todo.id}" title="Priority">⚡</button>
          <button class="btn-small btn-delete" data-id="${todo.id}" title="Delete">✕</button>
        </div>
      </li>
    `;
  }

  // Attach event listeners to todo items
  attachTodoEventListeners() {
    document.querySelectorAll('.todo-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        this.toggleTodo(parseInt(e.target.dataset.id));
      });
    });

    document.querySelectorAll('.btn-edit').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.editTodo(parseInt(e.target.dataset.id));
      });
    });

    document.querySelectorAll('.btn-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (confirm('Are you sure you want to delete this task?')) {
          this.deleteTodo(parseInt(e.target.dataset.id));
        }
      });
    });

    document.querySelectorAll('.btn-priority').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
          const priorities = ['low', 'medium', 'high'];
          const currentIndex = priorities.indexOf(todo.priority);
          const nextPriority = priorities[(currentIndex + 1) % priorities.length];
          this.setPriority(id, nextPriority);
        }
      });
    });
  }

  // Render search results
  renderSearchResults() {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;

    if (this.filteredTodos.length === 0) {
      todoList.innerHTML = '<li class="empty-state"><p>No matching tasks found.</p></li>';
      return;
    }

    todoList.innerHTML = this.filteredTodos
      .map((todo) => this.createTodoElement(todo))
      .join('');

    this.attachTodoEventListeners();
  }

  // Get statistics
  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;
    const active = total - completed;

    return { total, completed, active };
  }

  // Update statistics display
  updateStats(stats) {
    document.getElementById('totalTasks')?.textContent = stats.total;
    document.getElementById('completedTasks')?.textContent = stats.completed;
    document.getElementById('activeTasks')?.textContent = stats.active;
  }

  // Escape HTML special characters
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  // Export todos as JSON
  exportAsJSON() {
    const data = JSON.stringify(this.todos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todolist-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import todos from JSON
  importFromJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          this.todos = [...this.todos, ...imported];
          this.saveToLocalStorage();
          this.render();
          alert('Todos imported successfully!');
        }
      } catch (error) {
        alert('Error importing file. Please ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new TodoList();

  // Setup search functionality if search input exists
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.todoApp.searchTodos(e.target.value);
    });
  }

  // Setup export button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      window.todoApp.exportAsJSON();
    });
  }

  // Setup import functionality
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        window.todoApp.importFromJSON(e.target.files[0]);
        importFile.value = ''; // Reset input
      }
    });
  }

  // Setup sort buttons
  const sortPriorityBtn = document.getElementById('sortPriorityBtn');
  const sortDateBtn = document.getElementById('sortDateBtn');
  if (sortPriorityBtn) {
    sortPriorityBtn.addEventListener('click', () => window.todoApp.sortByPriority());
  }
  if (sortDateBtn) {
    sortDateBtn.addEventListener('click', () => window.todoApp.sortByDueDate());
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
      window.todoApp?.render();
    }
  }
});
