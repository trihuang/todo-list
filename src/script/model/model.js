import { isSameDay, isSameWeek, isSameMonth, compareAsc } from 'date-fns';
import Project from './project';
import Todo from './todo';

class Model {
    constructor() {
        const projectOneTodoOne = new Todo('Take out the garbage', '', undefined, 'None', 'None', '', undefined);
        const projectOneTodoTwo = new Todo('Wash the dishes', '', undefined, 'None', 'None', '', undefined);
        const projectOneTodoThree = new Todo('Walk the dog', '', undefined, 'None', 'None', '', undefined);
        const projectOne = new Project('Chores', 'Things that need to be done around the house.', new Date(), 'High', 'In Progress', 'Do not leave them until tomorrow!', [projectOneTodoOne, projectOneTodoTwo, projectOneTodoThree]);

        const projectTwo = new Project('Write a Letter', 'Grandma is waiting for a reply.', new Date(2023, 2, 8), 'None', 'None', '', undefined);
        
        const projectThreeTodoOne = new Todo('Submit report', '', new Date(2023, 2, 9), 'None', 'None', '', undefined);
        const projectThreeTodoTwo = new Todo('Meeting with boss', '', new Date(2023, 2, 9), 'High', 'None', 'This is a very important meeting!', undefined);
        const projectThreeTodoThreeSubOne = new Todo('Gather data', '', new Date(2023, 2, 9), 'Medium', 'In Progress', 'Need more information.', undefined);
        const projectThreeTodoThreeSubTwo = new Todo('Create slides', '', undefined, 'None', 'None', '', undefined); 
        const projectThreeTodoThree = new Todo('Prepare presentation', '', undefined, 'None', 'In Progress', '', [projectThreeTodoThreeSubOne, projectThreeTodoThreeSubTwo]);
        const projectThreeTodoFour = new Todo('Meeting with clients', 'Product showcase.', new Date(2023, 2, 20), 'None', 'None', '', undefined);
        const projectThree = new Project('Work', 'Some things to take care of.', new Date(2023, 2, 20), 'Medium', 'None', '', [projectThreeTodoOne, projectThreeTodoTwo, projectThreeTodoThree, projectThreeTodoFour]);


        const projectFour = new Project('Photography', 'Going on a trip to the national park to take photos!', new Date(2023, 3, 15), 'None', 'None', '', undefined);

        this.projects = [projectOne, projectTwo, projectThree, projectFour];
        this.itemsOnDisplay = [];
        this.deletedItems = [];

        console.log(this.filterByStatus(this._projects, 'Overdue'));
        /*
        console.log(projectThree.id);
        console.log(projectThreeTodoThree.id);
        console.log(projectThreeTodoThreeSubOne.projectParent);
        console.log(projectThreeTodoThreeSubOne.todoParent);
        console.log(projectThreeTodoThreeSubTwo.projectParent);
        console.log(projectThreeTodoThreeSubTwo.todoParent);
        */
    }

    get projects() {
        return this._projects;
    }

    get itemsOnDisplay() {
        return this._itemsOnDisplay;
    }

    get deletedItems() {
        return this._deletedItems;
    }

    set projects(projects) {
        return this._projects = projects;
    }

    set itemsOnDisplay(items) {
        return this._itemsOnDisplay = items;
    }

    set deletedItems(items) {
        return this._deletedItems = items;
    }

    createProject(title, description, dueDate, priority, status, notes, todos) {
        const project = new Project(title, description, dueDate, priority, status, notes, todos);
        this.addProject(project);
    }

    createTodo(title, description, dueDate, priority, status, notes, todos, parent) {
        const todo = new Todo(title, description, dueDate, priority, status, notes, todos);
        parent.addTodo(todo);
    }

    addProject(project) {
        this._projects.push(project);
    }

    removeItem(item) {
        if (item.isProject) {
            this.removeProject(item);
        } else {
            this.removeTodo(item);
        }
        this._deletedItems.push(item);
    }

    removeProject(project) {
        const index = this._projects.indexOf(project);
        this._projects.splice(index, 1);
    }

    removeTodo(todo) {
        let parentProject = this._projects.filter((project) => project.id === todo.projectParent);
        parentProject = parentProject[0];
        if (todo.todoParent === undefined) {
            parentProject.removeTodo(todo);
        } else {
            let parentTodo = parentProject.todos.filter((task) => task.id === todo.todoParent);
            parentTodo = parentTodo[0];
            parentTodo.removeTodo(todo);
        }
    }

    // Return an array of projects with due date today and projects with todos and sub todos that have due dates today
    filterByToday(array) {
        const dueToday = array.filter((item) => isSameDay(item.dueDate, new Date()));
        const remainingArray = array.filter((item) => !isSameDay(item.dueDate, new Date())).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todosDueToday = remainingArray[i].todos.filter((todo) => isSameDay(todo.dueDate, new Date()));
            if (todosDueToday.length > 0) {
                dueToday.push(remainingArray[i]);
            } else {
                const remainingTodosArray = remainingArray[i].todos.filter((todo) => !isSameDay(todo.dueDate, new Date())).filter((todo) => todo.todos !== undefined);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const subTodosDueToday = remainingTodosArray[j].todos.filter((todo) => isSameDay(todo.dueDate, new Date()));
                    if (subTodosDueToday.length > 0) {
                        dueToday.push(remainingArray[i]);
                    }
                }
            }
        }
        return dueToday;
    }

    // Return an array of projects with due dates this week and projects with todos and sub todos that have due dates this week
    filterByThisWeek(array) {
        const dueThisWeek = array.filter((item) => isSameWeek(item.dueDate, new Date()));
        const remainingArray = array.filter((item) => !isSameWeek(item.dueDate, new Date())).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todosDueThisWeek = remainingArray[i].todos.filter((todo) => isSameWeek(todo.dueDate, new Date()));
            if (todosDueThisWeek.length > 0) {
                dueThisWeek.push(remainingArray[i]);
            } else {
                const remainingTodosArray = remainingArray[i].todos.filter((todo) => !isSameWeek(todo.dueDate, new Date())).filter((todo) => todo.todos !== undefined);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const subTodosDueThisWeek = remainingTodosArray[j].todos.filter((todo) => isSameWeek(todo.dueDate, new Date()));
                    if (subTodosDueThisWeek.length > 0) {
                        dueThisWeek.push(remainingArray[i]);
                    }
                }
            }
        }
        return dueThisWeek;
    }

    // Return an array of projects with due dates this month and projects with todos and sub todos that have due dates this month
    filterByThisMonth(array) {
        const dueThisMonth = array.filter((item) => isSameMonth(item.dueDate, new Date()));
        const remainingArray = array.filter((item) => !isSameMonth(item.dueDate, new Date())).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todosDueThisMonth = remainingArray[i].todos.filter((todo) => isSameMonth(todo.dueDate, new Date()));
            if (todosDueThisMonth.length > 0) {
                dueThisMonth.push(remainingArray[i]);
            } else {
                const remainingTodosArray = remainingArray[i].todos.filter((todo) => !isSameMonth(todo.dueDate, new Date())).filter((todo) => todo.todos !== undefined);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const subTodosDueThisMonth = remainingTodosArray[j].todos.filter((todo) => isSameMonth(todo.dueDate, new Date()));
                    if (subTodosDueThisMonth.length > 0) {
                        dueThisMonth.push(remainingArray[i]);
                    }
                }
            }
        }
        return dueThisMonth;
    }

    // Return an array of projects that are overdue and projects with todos and sub todos that are overdue
    filterByOverdue(array) {
        // TODO
        const overdue = array.filter((item) => (compareAsc(item.dueDate, new Date()) === -1) && !isSameDay(item.dueDate, new Date()));
        const remainingArray = array.filter((item) => !((compareAsc(item.dueDate, new Date()) === -1) && !isSameDay(item.dueDate, new Date()))).filter((item) => item.todos !== undefined);
        
        for (let i = 0; i < remainingArray.length; i++) {
            const overdueTodos = remainingArray[i].todos.filter((todo) => (compareAsc(todo.dueDate, new Date()) === -1) && !isSameDay(todo.dueDate, new Date()));
            if (overdueTodos.length > 0) {
                overdue.push(remainingArray[i]);
            } else {
                const remainingTodosArray = remainingArray[i].todos.filter((todo) => !((compareAsc(todo.dueDate, new Date()) === -1) && !isSameDay(todo.dueDate, new Date()))).filter((item) => item.todos !== undefined);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const overdueSubTodos = remainingTodosArray[j].todos.filter((todo) => (compareAsc(todo.dueDate, new Date()) === -1) && !isSameDay(todo.dueDate, new Date()));
                    if (overdueSubTodos.length > 0) {
                        overdue.push(remainingArray[i]);
                    }
                }
            }
        }
        return overdue;
        // TODO: update status if necessary?
    }

    filterByPriority(array, priority) {
        if (priority === undefined) {
            // projects or todos with both priority flags
            return array.filter((item) => item.priority !== 'None');
        } else if (priority === 'Medium') {
            return array.filter((item) => item.priority === 'Medium');
        } else if (priority === 'High') {
            return array.filter((item) => item.priority === 'High');
        } else if (priority === 'None') {
            return array.filter((item) => item.priority === 'None');
        }
    }

    filterByStatus(array, status) {
        return array.filter((item) => item.status === `${status}`);
    }

    filterByTitle(text) {
        // TODO
        console.log(`filter titles with ${text}`);
    }

    filterByDescription(text) {
        // TODO
        console.log(`filter description with ${text}`);
    }

    filterByNotes(text) {
        // TODO
        console.log(`filter notes with ${text}`);
    }

    filterByDate(date) {
        // TODO
        console.log(`filter dates with ${date}`);
    }

    search(text) {
        // TODO
        if (text === undefined) return;
        console.log(text);
        this.filterByTitle(text);
        this.filterByDescription(text);
        this.filterByNotes(text);
        this.filterByDate(text);
        // update projects / todos on display and return the filtered array
    }

    sortByPriorityAsc() {
        // TODO
    }

    sortByPriorityDesc() {
        // TODO
    }

    sortByDueDateAsc() {
        // TODO
    }

    sortByDueDateDesc() {
        // TODO
    }

    sortByTitleAsc() {
        // TODO
    }

    sortByTitleDesc() {
        // TODO
    }

    sortByDateAddedAsc() {
        // TODO
    }

    sortByDateAddedDesc() {
        // TODO
    }

    recoverfromTrash(item) {
        // TODO
    }

    deletefromTrash(item) {
        const index = this._deletedItems.indexOf(item);
        this._deletedItems.splice(index, 1);
    }
}

export { Model as default };