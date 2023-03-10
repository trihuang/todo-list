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
    }

    get projects() {
        return this._projects;
    }

    set projects(proj) {
        return this._projects = proj;
    }
}

export { Model as default };