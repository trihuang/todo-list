import project from './project';
import Project from './project';
import Todo from './todo';

class Model {
    constructor() {
        const projectOneTodoOne = new Todo('Take out the garbage', '', undefined, 'None', 'None', '', undefined);
        const projectOneTodoTwo = new Todo('Wash the dishes', '', undefined, 'None', 'None', '', undefined);
        const projectOneTodoThree = new Todo('Walk the dog', '', undefined, 'None', 'None', '', undefined);
        const projectOne = new Project('Chores', 'Things that need to be done around the house.', new Date(), 'High', 'In Progress', 'Do not leave them until tomorrow!', [projectOneTodoOne, projectOneTodoTwo, projectOneTodoThree]);

        const projectTwo = new Project('Write a Letter', 'Grandma is waiting for a reply.', new Date(2023, 2, 8), 'None', 'None', '', undefined);
        
        const projectThreeTodoOne = new Todo('Submit report', '', new Date(2023, 2, 10), 'None', 'None', '', undefined);
        const projectThreeTodoTwo = new Todo('Meeting with boss', '', new Date(2023, 2, 15), 'High', 'None', 'This is a very important meeting!', undefined);
        const projectThreeTodoThreeSubOne = new Todo('Gather data', '', new Date(2023, 2, 13), 'Medium', 'In Progress', 'Need more information.', undefined);
        const projectThreeTodoThreeSubTwo = new Todo('Create slides', '', undefined, 'None', 'None', '', undefined); 
        const projectThreeTodoThree = new Todo('Prepare presentation', '', undefined, 'None', 'In Progress', '', [projectThreeTodoThreeSubOne, projectThreeTodoThreeSubTwo]);
        const projectThreeTodoFour = new Todo('Meeting with clients', 'Product showcase.', new Date(2023, 2, 20), 'None', 'None', '', undefined);
        const projectThree = new Project('Work', 'Some things to take care of.', new Date(2023, 2, 20), 'Medium', 'None', '', [projectThreeTodoOne, projectThreeTodoTwo, projectThreeTodoThree, projectThreeTodoFour]);


        const projectFour = new Project('Photography', 'Going on a trip to the national park to take photos!', new Date(2023, 3, 15), 'None', 'None', '', undefined);

        this.projects = [projectOne, projectTwo, projectThree, projectFour];
        this.projectsOnDisplay = [];
        this.todosOnDisplay = [];
        this.deletedProjects = [];
    }

    get projects() {
        return this._projects;
    }

    get projectsOnDisplay() {
        return this._projectsOnDisplay;
    }

    get todosOnDisplay() {
        return this._todosOnDisplay;
    }

    get deletedProjects() {
        return this._deletedProjects;
    }

    set projects(projects) {
        return this._projects = projects;
    }

    set projectsOnDisplay(projects) {
        return this._projectsOnDisplay = projects;
    }

    set todosOnDisplay(todos) {
        return this._todosOnDisplay = todos;
    }

    set deletedProjects(projects) {
        return this._deletedProjects = projects;
    }

    createProject() {
        // TODO
    }

    addProject(project) {
        this._projects.push(project);
    }

    removeProject(project) {
        const index = this._projects.indexOf(project);
        this._projects.splice(index, 1);
        // TODO move to trash
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

    recoverfromTrash() {
        // TODO
    }

    deletefromTrash() {
        // TODO
    }
}

export { Model as default };