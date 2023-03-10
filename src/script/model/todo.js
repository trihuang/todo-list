import { format } from 'date-fns';
import Project from './project';

class Todo extends Project {
    constructor(title, description, dueDate, priority, status, notes, todos, projectParentID, todoParentID) {
        super(title, description, dueDate, priority, status, notes, todos);
        this.id = crypto.randomUUID();
        this.dateAdded = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
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

    set dateAdded(date) {
        this._dateAdded = date;
    }

    set projectParent(projectID) {
        this._projectParent = projectID;
    }

    set todoParent(todoID) {
        this._todoParent = todoID;
    }
}

export { Todo as default }