import View from '../view/view';
import Model from '../model/model';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Display the home page
        this.defaultSortOrder = 'dueDateAsc';
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

        this.handleFilterByTodayEventListener();
        this.handleFilterByThisWeekEventListener();
        this.handleFilterByThisMonthEventListener();
        this.handleFilterByOverdueEventListener();
        this.handleFilterByPriorityEventListeners();
        this.handleFilterByStatusEventListeners();

        this.handleSortByTitleAscEventListener();
        this.handleSortByTitleDescEventListener();
        this.handleSortByPriorityAscEventListener();
        this.handleSortByPriorityDescEventListener();
        this.handleSortByStatusAscEventListener();
        this.handleSortByStatusDescEventListener();
        this.handleSortByDueDateAscEventListener();
        this.handleSortByDueDateDescEventListener();
        this.handleSortByDateAddedAscEventListener();
        this.handleSortByDateAddedDescEventListener();

        this.handleProjectLinkEventListener();

        // TODO:
        // Update notifications for items due today and items that are overdue
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
        const sortedProjects = this.sortInDefaultOrder(projects, this.defaultSortOrder);
        this.view.displayItems(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleLogoEventListener() {
        this.view.bindLogoEventListener(this.handleDisplayHomePage);
    }

    handleHomeEventListener() {
        this.view.bindHomeEventListener(this.handleDisplayHomePage);
    }

    handleDisplayHomePage = () => {
        this._itemsOnDisplay = this.model.projects;
        const sortedProjects = this.sortInDefaultOrder(this.model.projects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    // Nav bar handlers

    handleSearchBarEventListeners() {
        this.view.bindSearchBarEventListeners(this.handleSearch);
    }

    handleSearch = (input) => {
        const searchResults = this.model.search(this.model.projects, input);
        this._itemsOnDisplay = searchResults;
        const sortedProjects = this.sortInDefaultOrder(searchResults, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
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
        const sortedProjects = this.sortInDefaultOrder(importantProjects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleTodayEventListeners() {
        this.view.bindTodayEventListener(this.handleDisplayTodayPage);
    }

    handleDisplayTodayPage = () => {
        const todayProjects = this.model.filterByToday(this.model.projects);
        this._itemsOnDisplay = todayProjects;
        const sortedProjects = this.sortInDefaultOrder(todayProjects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleThisWeekEventListeners() {
        this.view.bindThisWeekEventListener(this.handleDisplayThisWeekPage);
    }

    handleDisplayThisWeekPage = () => {
        const thisWeekProjects = this.model.filterByThisWeek(this.model.projects);
        this._itemsOnDisplay = thisWeekProjects;
        const sortedProjects = this.sortInDefaultOrder(thisWeekProjects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleThisMonthEventListeners() {
        this.view.bindThisMonthEventListener(this.handleDisplayThisMonthPage);
    }

    handleDisplayThisMonthPage = () => {
        const thisMonthProjects = this.model.filterByThisMonth(this.model.projects);
        this._itemsOnDisplay = thisMonthProjects;
        const sortedProjects = this.sortInDefaultOrder(thisMonthProjects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleCompletedEventListeners() {
        this.view.bindCompletedEventListener(this.handleDisplayCompletedPage);
    }

    handleDisplayCompletedPage = () => {
        const completedProjects = this.model.filterByStatus(this.model.projects, 'Completed');
        this._itemsOnDisplay = completedProjects;
        const sortedProjects = this.sortInDefaultOrder(completedProjects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleInProgressEventListeners() {
        this.view.bindInProgressEventListener(this.handleDisplayInProgressPage);
    }

    handleDisplayInProgressPage = () => {
        const projectsInProgress = this.model.filterByStatus(this.model.projects, 'In Progress');
        this._itemsOnDisplay = projectsInProgress;
        const sortedProjects = this.sortInDefaultOrder(projectsInProgress, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleOverdueEventListeners() {
        this.view.bindOverdueEventListener(this.handleDisplayOverduePage);
    }

    handleDisplayOverduePage = () => {
        const overdueProjects = this.model.filterByOverdue(this.model.projects);
        this._itemsOnDisplay = overdueProjects;
        const sortedProjects = this.sortInDefaultOrder(overdueProjects, this.defaultSortOrder);
        this._isProjectsPage = true;
        this._isTrashPage = false;
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage);
    }

    handleTrashEventListeners() {
        this.view.bindTrashEventListener(this.handleDisplayTrashPage);
    }

    handleDisplayTrashPage = () => {
        this.view.clearHeader();
        this.view.clearContent();
        this._itemsOnDisplay = this.model.deletedItems;
        const sortedProjects = this.sortInDefaultOrder(this.model.deletedItems, this.defaultSortOrder);
        this._isProjectsPage = false;
        this._isTrashPage = true;
        this.view.displayTrashPage(sortedProjects, this.isTrashPage);
    }

    // Filter handlers

    handleFilterByTodayEventListener() {
        this.view.bindFilterByTodayEventListener(this.handleFilterByTodayDisplay);
    }

    handleFilterByTodayDisplay = () => {
        const filteredItems = this.model.filterByToday(this.itemsOnDisplay);
        const sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleFilterByThisWeekEventListener() {
        this.view.bindFilterByThisWeekEventListener(this.handleFilterByThisWeekDisplay);
    }

    handleFilterByThisWeekDisplay = () => {
        const filteredItems = this.model.filterByThisWeek(this.itemsOnDisplay);
        const sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleFilterByThisMonthEventListener() {
        this.view.bindFilterByThisMonthEventListener(this.handleFilterByThisMonthDisplay);
    }

    handleFilterByThisMonthDisplay = () => {
        const filteredItems = this.model.filterByThisMonth(this.itemsOnDisplay);
        const sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleFilterByOverdueEventListener() {
        this.view.bindFilterByOverdueEventListener(this.handleFilterByOverdueDisplay);
    }

    handleFilterByOverdueDisplay = () => {
        const filteredItems = this.model.filterByOverdue(this.itemsOnDisplay);
        const sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleFilterByPriorityEventListeners() {
        this.view.bindFilterByPriorityEventListeners(this.handleFilterByPriorityDisplay);
    }

    handleFilterByPriorityDisplay = (priority) => {
        const filteredItems = this.model.filterByPriority(this.itemsOnDisplay, priority);
        const sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleFilterByStatusEventListeners() {
        this.view.bindFilterByStatusEventListeners(this.handleFilterByStatusDisplay);
    }

    handleFilterByStatusDisplay = (status) => {
        const filteredItems = this.model.filterByStatus(this.itemsOnDisplay, status);
        const sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    // Sort handlers

    handleSortByTitleAscEventListener() {
        this.view.bindSortByTitleAscEventListener(this.handleSortByTitleAscDisplay);
    }

    handleSortByTitleAscDisplay = () => {
        const sortedItems = this.model.sortByTitleAsc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByTitleDescEventListener() {
        this.view.bindSortByTitleDescEventListener(this.handleSortByTitleDescDisplay);
    }

    handleSortByTitleDescDisplay = () => {
        const sortedItems = this.model.sortByTitleDesc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByPriorityAscEventListener() {
        this.view.bindSortByPriorityAscEventListener(this.handleSortByPriorityAscDisplay);
    }

    handleSortByPriorityAscDisplay = () => {
        const sortedItems = this.model.sortByPriorityAsc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByPriorityDescEventListener() {
        this.view.bindSortByPriorityDescEventListener(this.handleSortByPriorityDescDisplay);
    }

    handleSortByPriorityDescDisplay = () => {
        const sortedItems = this.model.sortByPriorityDesc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByStatusAscEventListener() {
        this.view.bindSortByStatusAscEventListener(this.handleSortByStatusAscDisplay);
    }

    handleSortByStatusAscDisplay = () => {
        const sortedItems = this.model.sortByStatusAsc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByStatusDescEventListener() {
        this.view.bindSortByStatusDescEventListener(this.handleSortByStatusDescDisplay);
    }

    handleSortByStatusDescDisplay = () => {
        const sortedItems = this.model.sortByStatusDesc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByDueDateAscEventListener() {
        this.view.bindSortByDueDateAscEventListener(this.handleSortByDueDateAscDisplay);
    }

    handleSortByDueDateAscDisplay = () => {
        const sortedItems = this.model.sortByDueDateAsc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByDueDateDescEventListener() {
        this.view.bindSortByDueDateDescEventListener(this.handleSortByDueDateDescDisplay);
    }

    handleSortByDueDateDescDisplay = () => {
        const sortedItems = this.model.sortByDueDateDesc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByDateAddedAscEventListener() {
        this.view.bindSortByDateAddedAscEventListener(this.handleSortByDateAddedAscDisplay);
    }

    handleSortByDateAddedAscDisplay = () => {
        const sortedItems = this.model.sortByDateAddedAsc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
        }
    }

    handleSortByDateAddedDescEventListener() {
        this.view.bindSortByDateAddedDescEventListener(this.handleSortByDateAddedDescDisplay);
    }

    handleSortByDateAddedDescDisplay = () => {
        const sortedItems = this.model.sortByDateAddedDesc(this.itemsOnDisplay);
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage);
        } else {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage);
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
        const sortedTodos = this.sortInDefaultOrder(project.todos, this.defaultSortOrder);
        this.view.displayItems(sortedTodos, isProjectsPage, isTrashPage);
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

    sortInDefaultOrder(items, sortOrder) {
        let sortedItems;
        switch(sortOrder) {
            case 'dateAddedAsc':
                sortedItems = this.model.sortByDateAddedAsc(items);
                break;
            case 'dateAddedDesc':
                sortedItems = this.model.sortByDateAddedDesc(items);
                break;
            case 'titleAsc':
                sortedItems = this.model.sortByTitleAsc(items);
                break;
            case 'titleDesc':
                sortedItems = this.model.sortByTitleDesc(items);
                break;
            case 'priorityAsc':
                sortedItems = this.model.sortByPriorityAsc(items);
                break;
            case 'priorityDesc':
                sortedItems = this.model.sortByPriorityDesc(items);
                break;
            case 'statusAsc':
                sortedItems = this.model.sortByStatusAsc(items);
                break;
            case 'statusDesc':
                sortedItems = this.model.sortByStatusDesc(items);
                break;
            case 'dueDateAsc':
                sortedItems = this.model.sortByDueDateAsc(items);
                break;
            case 'dueDateDesc':
                sortedItems = this.model.sortByDueDateDesc(items);
                break;
            default:
                sortedItems = this.model.sortByDateAddedAsc(items);
        }
        return sortedItems;
    }
}

export { Controller as default };