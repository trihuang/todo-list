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
        //this.view.displayTodosHeader(this.model.projects[2]);
        //this.view.displayItems(this.model.projects[2].todos, false);

        // Add event listeners
        this.handleLogoEventListener();
        this.handleHomeEventListener();
        this.handleSearchBarEventListeners();
        this.handleImportantEventListeners();
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
        this.view.bindLogoEventListener(this.handleDisplayHomePage);
    }

    handleHomeEventListener() {
        this.view.bindHomeEventListener(this.handleDisplayHomePage);
    }

    handleDisplayHomePage = () => {
        this._itemsOnDisplay = this.model.projects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleSearchBarEventListeners() {
        this.view.bindSearchBarEventListeners(this.handleSearch);
    }

    handleSearch = (input) => {
        const searchResults = this.model.search(this.model.projects, input);
        this._itemsOnDisplay = searchResults;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleImportantEventListeners() {
        this.view.bindImportantEventListener(this.handleDisplayImportantPage);
    }

    handleDisplayImportantPage = () => {
        const importantProjects = this.model.filterByPriority(this.model.projects);
        this._itemsOnDisplay = importantProjects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleCreateProjectBtn() {
        this.view.bindCreateProjectBtnEventListener(this.handleCreateProject);
    }

    handleCreateProject = () => {
        this.model.createProject();
        // TODO
        // update view if necessary
    }

    updateProjectsView(items, isProjectsPage) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayProjectsHeader();
        this.view.displayItems(items, isProjectsPage);
    }
}

export { Controller as default };