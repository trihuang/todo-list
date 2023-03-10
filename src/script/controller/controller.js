import View from '../view/view';
import Model from '../model/model';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initializeProjectsPage(this.model.projects);
    }

    initializeProjectsPage(projects) {
        this.view.displayProjects(projects);
    }
}

export { Controller as default };