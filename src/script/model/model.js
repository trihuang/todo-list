import Project from './project';
import Todo from './todo';

class Model {
    constructor() {
        const projectOneTodoOne = new Todo('Take out the garbage', '', undefined, 'None', 'None', '', undefined, undefined, undefined);
        const projectOneTodoTwo = new Todo('Wash the dishes', '', undefined, 'None', 'None', '', undefined, undefined, undefined);
        const projectOneTodoThree = new Todo('Walk the dog', '', undefined, 'None', 'None', '', undefined, undefined, undefined);
        const projectOne = new Project('Chores', 'Things that need to be done around the house', new Date(), 'High', 'In Progress', 'Do not leave them until tomorrow!', [projectOneTodoOne, projectOneTodoTwo, projectOneTodoThree]);

        const projectTwo = new Project('Write a Letter', 'Grandma is waiting for a reply', new Date(2023, 2, 8), 'None', 'None', '', undefined);
        
        this.projects = [projectOne, projectTwo];
        this.projectsOnDisplay = [];
        this.todosOnDisplay = [];
        this.deletedProjects = [];
    }

    get projects() {
        return this._projects;
    }

    set projects(project) {
        return this._projects = project;
    }

    addProject(project) {
        this._projects.push(project);
    }

    removeProject(project) {
        const index = this._projects.indexOf(project);
        this._projects.splice(index, 1);
    }

    // Return an array of projects with due date today and projects with todos that have due dates today

    filterByToday() {
        // TODO
        // check for projects' due dates
        // check for theiir todos' due dates
    }

    // Return an array of projects with due dates this week and projects with todos that have due dates this week

    filterByThisWeek() {
        // TODO
    }

    // Return an array of projects with due dates this month and projects with todos that have due dates this month

    filterByThisMonth() {
        // TODO
    }

    // Return an array of projects that are overdue and projects with todos that are overdue

    filterByOverdue() {
        // TODO
    }

    filterByPriority(array, priority) {
        // TODO
        if (priority === undefined) {
            // projects or todos with both priority flags
        } else if (priority === 'Medium') {
            // projects or todos with medium priority
        } else if (priority === 'High') {
            // projects or todos with high priority
        }
        // return projects or todos
    }

    filterProjectsByPriority(projects, priority) {
        this.filterByPriority(projects, priority);
        // update projectsOnDisplay, todosOnDisplay
        // return filtered projects
    }

    filterTodosByPriority(todos, priority) {
        this.filterByPriority(todos, priority);
        // update todosOnDisplay, projectsOnDisplay
        // return filtered todos
    }

    filterByStatus(array, status) {
        // TODO
    }

    filterProjectsByStatus(projects, status) {
        this.filterByStatus(projects, status);
        // update projectsOnDisplay, todosOnDisplay
        // return filtered projects
    }

    filterTodosByStatus(todos, status) {
        this.filterByStatus(todos, status);
        // update todosOnDisplay, projectsOnDisplay
        // return filtered todos
    }

    filterByTitle(text) {
        // TODO
    }

    filterByDescription(text) {
        // TODO
    }

    filterByNotes(text) {
        // TODO
    }

    filterByDate(date) {
        // TODO
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

    sortByNameAsc() {
        // TODO
    }

    sortByNameDesc() {
        // TODO
    }

    sortByDateAddedAsc() {
        // TODO
    }

    sortByDateAddedDesc() {
        // TODO
    }
}

export { Model as default };