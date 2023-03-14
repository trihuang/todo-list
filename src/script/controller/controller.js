import View from '../view/view';
import Model from '../model/model';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Display the home page
        this.itemsOnDisplay = this.model.projects;
        this.isProjectsPage = true;
        this.initializeProjectsPage(this.itemsOnDisplay);
        //this.view.clearHeader();
        //this.view.displayTodosHeader(this.model.projects[3]);
        //this.view.displayItems(this.model.projects[3].todos, false);

        // Add event listeners that depend on the model
        this.handleLogoEventListener();
        this.handleSearchBarEventListeners();
    }

    get itemsOnDisplay() {
        return this._itemsOnDisplay;
    }

    get isProjectsPage() {
        return this._isProjectsPage;
    }

    set itemsOnDisplay(items) {
        this._itemsOnDisplay = items;
    }

    set isProjectsPage(bool) {
        this._isProjectsPage = bool;
    }

    initializeProjectsPage(projects) {
        this.view.displayItems(projects, this._isProjectsPage);
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