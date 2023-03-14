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
        this.handleTodayEventListeners();
        this.handleThisWeekEventListeners();
        this.handleThisMonthEventListeners();
        this.handleCompletedEventListeners();
        this.handleInProgressEventListeners();
        this.handleOverdueEventListeners();
        this.handleTrashEventListeners();
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

    handleTodayEventListeners() {
        this.view.bindTodayEventListener(this.handleDisplayTodayPage);
    }

    handleDisplayTodayPage = () => {
        const todayProjects = this.model.filterByToday(this.model.projects);
        this._itemsOnDisplay = todayProjects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleThisWeekEventListeners() {
        this.view.bindThisWeekEventListener(this.handleDisplayThisWeekPage);
    }

    handleDisplayThisWeekPage = () => {
        const thisWeekProjects = this.model.filterByThisWeek(this.model.projects);
        this._itemsOnDisplay = thisWeekProjects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleThisMonthEventListeners() {
        this.view.bindThisMonthEventListener(this.handleDisplayThisMonthPage);
    }

    handleDisplayThisMonthPage = () => {
        const thisMonthProjects = this.model.filterByThisMonth(this.model.projects);
        this._itemsOnDisplay = thisMonthProjects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleCompletedEventListeners() {
        this.view.bindCompletedEventListener(this.handleDisplayCompletedPage);
    }

    handleDisplayCompletedPage = () => {
        const completedProjects = this.model.filterByStatus(this.model.projects, 'Completed');
        this._itemsOnDisplay = completedProjects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleInProgressEventListeners() {
        this.view.bindInProgressEventListener(this.handleDisplayInProgressPage);
    }

    handleDisplayInProgressPage = () => {
        const projectsInProgress = this.model.filterByStatus(this.model.projects, 'In Progress');
        this._itemsOnDisplay = projectsInProgress;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleOverdueEventListeners() {
        this.view.bindOverdueEventListener(this.handleDisplayOverduePage);
    }

    handleDisplayOverduePage = () => {
        const overdueProjects = this.model.filterByOverdue(this.model.projects);
        this._itemsOnDisplay = overdueProjects;
        this._isProjectsPage = true;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage);
    }

    handleTrashEventListeners() {
        this.view.bindTrashEventListener(this.handleDisplayTrashPage);
    }

    handleDisplayTrashPage = () => {
        this.view.clearHeader();
        this.view.clearContent();
        this._itemsOnDisplay = this.model.deletedItems;
        this._isProjectsPage = false;
        this.view.displayTrashPage(this.itemsOnDisplay);
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