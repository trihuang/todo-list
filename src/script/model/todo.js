import { format } from 'date-fns';
import Project from './project';
//format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS")

class Todo extends Project {
    constructor(title, description, dueDate, priority, status, notes, todos, projectParentID, todoParentID) {
        super(title, description, dueDate, priority, status, notes, todos);
        this.id = crypto.randomUUID();
        this.dateAdded = new Date();
        this.projectParent = projectParentID;
        this.todoParent = todoParentID;
    }

    get dateAdded() {
        return this._dateAdded;
    }

    get projectParent() {
        return this._projectParent;
    }

    get todoParent() {
        return this._todoParent;
    }

    set todos(newTodos) {
        if (newTodos === undefined) {
            this._todos = newTodos;
        } else {
            for (let i = 0; i < newTodos.length; i++) {
                newTodos[i].todoParent = this._id;
            }
            this._todos = newTodos;
        }
    }

    set dateAdded(date) {
        this._dateAdded = date;
    }

    set projectParent(projectID) {
        this._projectParent = projectID;
    }

    set todoParent(todoID) {
        this._todoParent = todoID;
    }

    addTodo(todo) {
        let todoList;
        if (this._todos === undefined) {
            todoList = [];
            todoList.push(todo);
            this._todos = todoList;
        } else {
            todo.todoParent = this._id;
            this._todos.push(todo);
        }
    }
}

export { Todo as default }