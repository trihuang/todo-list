import View from '../view/view';
import Model from '../model/model';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Display the home page
        this.itemsOnDisplay = this.model.projects;
        this.isProjectsPage = true;
        this.isTrashPage = false;
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

        this.handleFilterByPriorityEventListeners();
        this.handleFilterByStatusEventListeners();

        this.handleProjectLinkEventListener();
    }

    get itemsOnDisplay() {
        return this._itemsOnDisplay;
    }

    get isProjectsPage() {
        return this._isProjectsPage;
    }

    get isTrashPage() {
        return this._isTrashPage;
    }

    set itemsOnDisplay(items) {
        this._itemsOnDisplay = items;
    }

    set isProjectsPage(bool) {
        this._isProjectsPage = bool;
    }

    set isTrashPage(bool) {
        this._isTrashPage = bool;
    }

    initializeProjectsPage(projects) {
        this.view.displayItems(projects, this.isProjectsPage, this.isTrashPage);
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
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    // Nav bar handlers

    handleSearchBarEventListeners() {
        this.view.bindSearchBarEventListeners(this.handleSearch);
    }

    handleSearch = (input) => {
        const searchResults = this.model.search(this.model.projects, input);
        this._itemsOnDisplay = searchResults;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleCreateProjectBtn() {
        this.view.bindCreateProjectBtnEventListener(this.handleCreateProject);
    }

    handleCreateProject = () => {
        this.model.createProject();
        // TODO
        // update view if necessary
    }

    // Sidebar handlers

    handleImportantEventListeners() {
        this.view.bindImportantEventListener(this.handleDisplayImportantPage);
    }

    handleDisplayImportantPage = () => {
        const importantProjects = this.model.filterByPriority(this.model.projects);
        this._itemsOnDisplay = importantProjects;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleTodayEventListeners() {
        this.view.bindTodayEventListener(this.handleDisplayTodayPage);
    }

    handleDisplayTodayPage = () => {
        const todayProjects = this.model.filterByToday(this.model.projects);
        this._itemsOnDisplay = todayProjects;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleThisWeekEventListeners() {
        this.view.bindThisWeekEventListener(this.handleDisplayThisWeekPage);
    }

    handleDisplayThisWeekPage = () => {
        const thisWeekProjects = this.model.filterByThisWeek(this.model.projects);
        this._itemsOnDisplay = thisWeekProjects;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleThisMonthEventListeners() {
        this.view.bindThisMonthEventListener(this.handleDisplayThisMonthPage);
    }

    handleDisplayThisMonthPage = () => {
        const thisMonthProjects = this.model.filterByThisMonth(this.model.projects);
        this._itemsOnDisplay = thisMonthProjects;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleCompletedEventListeners() {
        this.view.bindCompletedEventListener(this.handleDisplayCompletedPage);
    }

    handleDisplayCompletedPage = () => {
        const completedProjects = this.model.filterByStatus(this.model.projects, 'Completed');
        this._itemsOnDisplay = completedProjects;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleInProgressEventListeners() {
        this.view.bindInProgressEventListener(this.handleDisplayInProgressPage);
    }

    handleDisplayInProgressPage = () => {
        const projectsInProgress = this.model.filterByStatus(this.model.projects, 'In Progress');
        this._itemsOnDisplay = projectsInProgress;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleOverdueEventListeners() {
        this.view.bindOverdueEventListener(this.handleDisplayOverduePage);
    }

    handleDisplayOverduePage = () => {
        const overdueProjects = this.model.filterByOverdue(this.model.projects);
        this._itemsOnDisplay = overdueProjects;
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(this.itemsOnDisplay, this.isProjectsPage, this.isTrashPage);
    }

    handleTrashEventListeners() {
        this.view.bindTrashEventListener(this.handleDisplayTrashPage);
    }

    handleDisplayTrashPage = () => {
        this.view.clearHeader();
        this.view.clearContent();
        this._itemsOnDisplay = this.model.deletedItems;
        this._isProjectsPage = false;
        this._isTrashPage = true;
        this.view.displayTrashPage(this.itemsOnDisplay, this.isTrashPage);
    }

    // Filter handlers

    handleFilterByPriorityEventListeners() {
        this.view.bindFilterByPriorityEventListeners(this.handleFilterByPriorityDisplay);
    }

    handleFilterByPriorityDisplay = (priority) => {
        const filteredItems = this.model.filterByPriority(this.itemsOnDisplay, priority);
        if (this.isTrashPage) {
            this.updateTrashView(filteredItems, this.isTrashPage);
        } else {
            this.updateContentView(filteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleFilterByStatusEventListeners() {
        this.view.bindFilterByStatusEventListeners(this.handleFilterByStatusDisplay);
    }

    handleFilterByStatusDisplay = (status) => {
        const filteredItems = this.model.filterByStatus(this.itemsOnDisplay, status);
        if (this.isTrashPage) {
            this.updateTrashView(filteredItems, this.isTrashPage);
        } else {
            this.updateContentView(filteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    // Project and todo handlers

    handleProjectLinkEventListener() {
        this.view.bindProjectLinkEventListener(this.handleProjectPageDisplay);
    }

    handleProjectPageDisplay = (projectID) => {
        let project = this.model.projects.filter((project) => project.id === projectID);
        project = project[0];
        this._itemsOnDisplay = project.todos;
        this._isProjectsPage = false;
        this._isTrashPage = false;
        this.updateTodosView(project, this.isProjectsPage, this.isTrashPage);
    }

    // Helpers

    updateProjectsView(items, isProjectsPage, isTrashPage) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayProjectsHeader();
        this.view.displayItems(items, isProjectsPage, isTrashPage);
    }

    updateTodosView(project, isProjectsPage, isTrashPage) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayTodosHeader(project);
        this.view.displayItems(project.todos, isProjectsPage, isTrashPage);
    }

    updateTrashView(items, isTrashPage) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayTrashPage(items, isTrashPage);
    }

    updateContentView(items, isProjectsPage, isTrashPage) {
        this.view.clearContent();
        this.view.displayItems(items, isProjectsPage, isTrashPage);
    }
}

export { Controller as default };