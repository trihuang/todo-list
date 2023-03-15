import { compareAsc, compareDesc } from 'date-fns';

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
        this.isProject = true;
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

    get isProject() {
        return this._isProject;
    }

    set title(title) {
        title = title.trim();
        if (title === '') {
            alert('Please enter a title.');
        }
        this._title = title;
    }

    set id(id) {
        this._id = id;
    }

    set description(description) {
        this._description = description;
    }

    set dueDate(date) {
        if (date === undefined) {
            alert('Please enter a due date.');
        }
        this._dueDate = date;
    }

    set priority(priority) {
        this._priority = priority;
    }

    set status(newStatus) {
        this._status = newStatus;
        if (this._status !== 'Completed' || newStatus !== 'Completed') {
            if (compareAsc(this._dueDate, new Date()) === -1) {
                this._status = 'Overdue';
            }
        } 
    }

    set notes(notes) {
        this._notes = notes;
    }

    set todos(newTodos) {
        if (newTodos === undefined) {
            this._todos = newTodos;
        } else {
            for (let i = 0; i < newTodos.length; i++) {
                newTodos[i].projectParent = this._id;
                if (newTodos[i].todos !== undefined) {
                    for (let j = 0; j < newTodos[i].todos.length; j++) {
                        newTodos[i].todos[j].projectParent = this._id;
                    }
                }
            }
            this._todos = newTodos;
        }
    }

    set dateAdded(date) {
        this._dateAdded = date;
    }

    set isProject(bool) {
        this._isProject = bool;
    }

    addTodo(todo) {
        let todoList;
        if (this._todos === undefined) {
            todoList = [];
            todo.projectParent = this._id;
            todo.updateTodosParents(todo.todos);
            todoList.push(todo);
            this._todos = todoList;
        } else {
            todo.projectParent = this._id;
            todo.updateTodosParents(todo.todos);
            this._todos.push(todo);
        }
    }

    removeTodo(todo) {
        const index = this._todos.indexOf(todo);
        this._todos.splice(index, 1);
    }

    convertPriority() {
        const priority = this._priority;
        if (priority === 'High') {
            return 2;
        } else if (priority === 'Medium') {
            return 1;
        } else return 0;
    }

    convertStatus() {
        const status = this._status;
        if (status === 'Completed') {
            return 3;
        } else if (status === 'In Progress') {
            return 2;
        } else if (status === 'Overdue') {
            return 1;
        } else return 0;
    }

    sortByTitleAsc(array) {
        return array.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return titleA.localeCompare(titleB);
        });
    }

    sortByTitleDesc(array) {
        return array.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return titleB.localeCompare(titleA);
        });
    }

    sortByDueDateAsc(array) {
        return array.sort((a, b) => {
            if (a.dueDate === undefined && b.dueDate === undefined) {
                return 0;
            } else if (a.dueDate === undefined) {
                return -1;
            } else if (b.dueDate === undefined) {
                return 1;
            } else {
                return compareAsc(a.dueDate, b.dueDate);
            }
        });
    }

    sortByDueDateDesc(array) {
        return array.sort((a, b) => {
            if (a.dueDate === undefined && b.dueDate === undefined) {
                return 0;
            } else if (b.dueDate === undefined) {
                return -1;
            } else if (a.dueDate === undefined) {
                return 1;
            } else {
                return compareDesc(a.dueDate, b.dueDate);
            }
        });
    }

    sortByPriorityAsc(array) {
        return array.sort((a, b) => a.convertPriority() > b.convertPriority() ? 1 : 
                                    a.convertPriority() < b.convertPriority() ? -1 : 0);
    }

    sortByPriorityDesc(array) {
        return array.sort((a, b) => a.convertPriority() > b.convertPriority() ? -1 : 
                                    a.convertPriority() < b.convertPriority() ? 1 : 0);
    }

    sortByStatusAsc(array) {
        return array.sort((a, b) => a.convertStatus() > b.convertStatus() ? 1 :
                                    a.convertStatus() < b.convertStatus() ? -1 : 0);
    }

    sortByStatusDesc(array) {
        return array.sort((a, b) => a.convertStatus() > b.convertStatus() ? -1 :
                                    a.convertStatus() < b.convertStatus() ? 1 : 0);
    }

    sortByDateAddedAsc(array) {
        return array.sort((a, b) => compareAsc(a.dateAdded, b.dateAdded));
    }

    sortByDateAddedDesc(array) {
        return array.sort((a, b) => compareDesc(a.dateAdded, b.dateAdded));
    }

    sortInDefaultOrder(items, sortOrder) {
        let sortedItems;
        switch(sortOrder) {
            case 'dateAddedAsc':
                sortedItems = this.sortByDateAddedAsc(items);
                break;
            case 'dateAddedDesc':
                sortedItems = this.sortByDateAddedDesc(items);
                break;
            case 'titleAsc':
                sortedItems = this.sortByTitleAsc(items);
                break;
            case 'titleDesc':
                sortedItems = this.sortByTitleDesc(items);
                break;
            case 'priorityAsc':
                sortedItems = this.sortByPriorityAsc(items);
                break;
            case 'priorityDesc':
                sortedItems = this.sortByPriorityDesc(items);
                break;
            case 'statusAsc':
                sortedItems = this.sortByStatusAsc(items);
                break;
            case 'statusDesc':
                sortedItems = this.sortByStatusDesc(items);
                break;
            case 'dueDateAsc':
                sortedItems = this.sortByDueDateAsc(items);
                break;
            case 'dueDateDesc':
                sortedItems = this.sortByDueDateDesc(items);
                break;
            default:
                sortedItems = this.sortByDateAddedAsc(items);
        }
        return sortedItems;
    }
}

export { Project as default }