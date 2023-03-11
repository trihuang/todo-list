import View from '../view/view';
import Model from '../model/model';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Display the home page
        this.initializeProjectsPage(this.model.projects);

        // Add event listeners that depend on the model
        this.handleLogoEventListener();
        this.handleSearchBarEventListeners();
        console.log(this.model.projects);
    }

    initializeProjectsPage(projects) {
        this.view.displayProjects(projects);
    }

    handleLogoEventListener() {
        this.view.bindLogoEventListener(this.model.projects);
    }

    handleSearchBarEventListeners() {
        this.view.bindSearchBarEventListeners(this.handleSearch);
    }

    handleSearch = (input) => {
        this.model.search(input);
        // TODO
        // update view
    }

    handleCreateProjectBtn() {
        this.view.bindCreateProjectBtnEventListener(this.handleCreateProject);
    }

    handleCreateProject = () => {
        this.model.createProject();
        // TODO
        // update view if necessary
    }
}

export { Controller as default };