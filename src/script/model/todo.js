import Project from './project';

class Todo extends Project {
    constructor(title, description, dueDate, priority, status, notes, todos) {
        super(title, description, dueDate, priority, status, notes, todos);
        this.projectParent = undefined;
        this.todoParent = undefined;
        this.isProject = false;
    }

    get todos() {
        return this._todos;
    }

    get dueDate() {
        return this._dueDate;
    }

    get projectParent() {
        return this._projectParent;
    }

    get todoParent() {
        return this._todoParent;
    }

    set dueDate(date) {
        this._dueDate = date;
    }

    set todos(newTodos) {
        // cannot allow a todo to have sub todos if it is already a sub todo (i.e. it has a todo parent)
        if (this._todoParent !== undefined && this._todoParent !== this._id) {
            return;
        } else {
            this.updateTodosParents(newTodos)
            this._todos = newTodos;
        }
    }

    set projectParent(projectID) {
        this._projectParent = projectID;
    }

    set todoParent(todoID) {
        this._todoParent = todoID;
    }

    addTodo(todo) {
        // cannot allow todos to be added to todos that already have a todo parent
        if (this._todoParent !== undefined) {
            return;
        } else {
            let todoList;
            if (this._todos === undefined) {
                todoList = [];
                todo.projectParent = this._projectParent;
                todo.todoParent = this._id;
                this.updateTodosParents(todo.todos);
                todoList.push(todo);
                this._todos = todoList;
            } else {
                todo.projectParent = this._projectParent;
                todo.todoParent = this._id;
                this.updateTodosParents(todo.todos);
                this._todos.push(todo);
            }
        }
    }

    updateTodosParents(todos) {
        if (todos !== undefined) {
            for (let i = 0; i < todos.length; i++) {
                todos[i].todoParent = this._id;
                todos[i].projectParent = this._projectParent;
            }
        }
    }
}

export { Todo as default }