import { compareAsc, format } from 'date-fns';

class Project {
    constructor(title, description, dueDate, priority, status, notes, todos) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.notes = notes;
        this.todos = todos;
        this.dateAdded = new Date();
    }

    get title() {
        return this._title;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get status() {
        return this._status;
    }

    get notes() {
        return this._notes;
    }

    get todos() {
        return this._todos;
    }

    get dateAdded() {
        return this._dateAdded;
    }

    set title(newTitle) {
        newTitle = newTitle.trim();
        if (newTitle === '') {
            alert('Please enter a title.');
        }
        this._title = newTitle;
    }

    set id(newID) {
        this._id = newID;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
    }

    set priority(newPriority) {
        this._priority = newPriority;
    }

    set status(newStatus) {
        if (this._status !== 'Completed' || newStatus !== 'Completed') {
            if (compareAsc(this._dueDate, new Date()) === -1) {
                this._status = 'Overdue';
            }
        } else {
            this._status = newStatus;
        }
    }

    set notes(newNotes) {
        this._notes = newNotes;
    }

    set todos(newTodos) {
        if (newTodos === undefined) {
            this._todos = newTodos;
        } else {
            for (let i = 0; i < newTodos.length; i++) {
                newTodos[i].projectParent = this._id;
            }
            this._todos = newTodos;
        }
    }

    set dateAdded(date) {
        this._dateAdded = date;
    }

    addTodo(todo) {
        let todoList;
        if (this._todos === undefined) {
            todoList = [];
            todoList.push(todo);
            this._todos = todoList;
        } else {
            todo.projectParent = this._id;
            this._todos.push(todo);
        }
    }

    removeTodo(todo) {
        const index = this._todos.indexOf(todo);
        this._todos.splice(index, 1);
    }
}

export { Project as default }