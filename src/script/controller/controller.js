import { parseISO } from 'date-fns';

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

        // Add event listeners
        this.handleLogoEventListener();
        this.handleHomeEventListener();

        this.handleSearchBarEventListeners();
        this.handleCreateProjectBtnEventListener();

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
        this.handleFilterByWithDueDateEventListener();
        this.handleFilterByWithoutDueDateEventListener();

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
        this.handleCheckCircleEventListeners();

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
        this.view.displayItems(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
    }

    handleCreateProjectBtnEventListener() {
        this.view.bindCreateProjectBtnEventListener(this.handleCreateProject);
    }

    handleCreateProject = (title, dueDate, description, notes, priority, status, todoTitles) => {
        const date = parseISO(dueDate);
        let todos;
        let todo;
        if (todoTitles.length === 0) {
            todos = undefined;
        } else {
            todos = [];
            for (let i = 0; i < todoTitles.length; i++) {
                todo = this.model.createTodoWithOnlyTitle(todoTitles[i]);
                todos.push(todo);
            }
        }
        this.model.createProject(title, description, date, priority, status, notes, todos);
        this.handleDisplayHomePage();
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.updateProjectsView(sortedProjects, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
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
        this.view.displayTrashPage(sortedProjects, this.isTrashPage, this.defaultSortOrder);
    }

    // Filter handlers

    handleFilterByTodayEventListener() {
        this.view.bindFilterByTodayEventListener(this.handleFilterByTodayDisplay);
    }

    handleFilterByTodayDisplay = () => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByToday(this.itemsOnDisplay);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByThisWeekEventListener() {
        this.view.bindFilterByThisWeekEventListener(this.handleFilterByThisWeekDisplay);
    }

    handleFilterByThisWeekDisplay = () => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByThisWeek(this.itemsOnDisplay);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByThisMonthEventListener() {
        this.view.bindFilterByThisMonthEventListener(this.handleFilterByThisMonthDisplay);
    }

    handleFilterByThisMonthDisplay = () => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByThisMonth(this.itemsOnDisplay);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByOverdueEventListener() {
        this.view.bindFilterByOverdueEventListener(this.handleFilterByOverdueDisplay);
    }

    handleFilterByOverdueDisplay = () => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByOverdue(this.itemsOnDisplay);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByPriorityEventListeners() {
        this.view.bindFilterByPriorityEventListeners(this.handleFilterByPriorityDisplay);
    }

    handleFilterByPriorityDisplay = (priority) => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByPriority(this.itemsOnDisplay, priority);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByStatusEventListeners() {
        this.view.bindFilterByStatusEventListeners(this.handleFilterByStatusDisplay);
    }

    handleFilterByStatusDisplay = (status) => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByStatus(this.itemsOnDisplay, status);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByWithDueDateEventListener() {
        this.view.bindFilterByWithDueDateEventListener(this.handleFilterByWithDueDateDisplay);
    }

    handleFilterByWithDueDateDisplay = () => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByWithDueDate(this.itemsOnDisplay);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    handleFilterByWithoutDueDateEventListener() {
        this.view.bindFilterByWithoutDueDateEventListener(this.handleFilterByWithoutDueDateDisplay);
    }

    handleFilterByWithoutDueDateDisplay = () => {
        let filteredItems = this.itemsOnDisplay;
        let sortedFilteredItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            filteredItems = this.model.filterByWithoutDueDate(this.itemsOnDisplay);
            sortedFilteredItems = this.sortInDefaultOrder(filteredItems, this.defaultSortOrder);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedFilteredItems, this.isTrashPage, this.defaultSortOrder);
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        } else {
            this.updateTodosContentView(sortedFilteredItems, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
        }
    }

    // Sort handlers

    handleSortByTitleAscEventListener() {
        this.view.bindSortByTitleAscEventListener(this.handleSortByTitleAscDisplay);
    }

    handleSortByTitleAscDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByTitleAsc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'titleAsc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'titleAsc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'titleAsc');
        }
    }

    handleSortByTitleDescEventListener() {
        this.view.bindSortByTitleDescEventListener(this.handleSortByTitleDescDisplay);
    }

    handleSortByTitleDescDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByTitleDesc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'titleDesc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'titleDesc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'titleDesc');
        }
    }

    handleSortByPriorityAscEventListener() {
        this.view.bindSortByPriorityAscEventListener(this.handleSortByPriorityAscDisplay);
    }

    handleSortByPriorityAscDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByPriorityAsc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'priorityAsc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'priorityAsc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'priorityAsc');
        }
    }

    handleSortByPriorityDescEventListener() {
        this.view.bindSortByPriorityDescEventListener(this.handleSortByPriorityDescDisplay);
    }

    handleSortByPriorityDescDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByPriorityDesc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'priorityDesc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'priorityDesc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'priorityDesc');
        }
    }

    handleSortByStatusAscEventListener() {
        this.view.bindSortByStatusAscEventListener(this.handleSortByStatusAscDisplay);
    }

    handleSortByStatusAscDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByStatusAsc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'statusAsc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'statusAsc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'statusAsc');
        }
    }

    handleSortByStatusDescEventListener() {
        this.view.bindSortByStatusDescEventListener(this.handleSortByStatusDescDisplay);
    }

    handleSortByStatusDescDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByStatusDesc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'statusDesc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'statusDesc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'statusDesc');
        }
    }

    handleSortByDueDateAscEventListener() {
        this.view.bindSortByDueDateAscEventListener(this.handleSortByDueDateAscDisplay);
    }

    handleSortByDueDateAscDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByDueDateAsc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'dueDateAsc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dueDateAsc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dueDateAsc');
        }
    }

    handleSortByDueDateDescEventListener() {
        this.view.bindSortByDueDateDescEventListener(this.handleSortByDueDateDescDisplay);
    }

    handleSortByDueDateDescDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByDueDateDesc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'dueDateDesc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dueDateDesc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dueDateDesc');
        }
    }

    handleSortByDateAddedAscEventListener() {
        this.view.bindSortByDateAddedAscEventListener(this.handleSortByDateAddedAscDisplay);
    }

    handleSortByDateAddedAscDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByDateAddedAsc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'dateAddedAsc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dateAddedAsc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dateAddedAsc');
        }
    }

    handleSortByDateAddedDescEventListener() {
        this.view.bindSortByDateAddedDescEventListener(this.handleSortByDateAddedDescDisplay);
    }

    handleSortByDateAddedDescDisplay = () => {
        let sortedItems = this.itemsOnDisplay;
        if (this.itemsOnDisplay !== undefined) {
            sortedItems = this.model.sortByDateAddedDesc(this.itemsOnDisplay);
        }
        if (this.isTrashPage) {
            this.updateTrashView(sortedItems, this.isTrashPage, 'dateAddedDesc');
        } else if (this.isProjectsPage) {
            this.updateContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dateAddedDesc');
        } else {
            this.updateTodosContentView(sortedItems, this.isProjectsPage, this.isTrashPage, 'dateAddedDesc');
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
        this.updateTodosView(project, this.isProjectsPage, this.isTrashPage, this.defaultSortOrder);
    }

    handleCheckCircleEventListeners() {
        this.view.bindCheckCircleEventListeners(this.handleToggleCheckCircle);
    }

    handleToggleCheckCircle = (id, event) => {
        // Find the project or todo by id
        let target = this.model.findById(this.model.projects, id);
        if (target.length === 0) {
            target = this.model.findById(this.model.deletedItems, id);
        }
        target = target[0];
        const statusBtn = event.target.parentNode.nextSibling.children[1].children[1];
        
        // The circle can only be checked if all todos and subtodos are checked and completed
        // When checked, also update status to complete; when unchecked, remove complete status
        if (target.status !== 'Completed') {
            const hasAllSubTasksCompleted = this.model.allTodosAndSubTodosAreCompleted(target)
            if (hasAllSubTasksCompleted) {
                this.view.toggleCheckCircle(event);
                if (target.status === 'None') {
                    statusBtn.classList.remove('bg-transparent');
                } else if (target.status === 'Overdue') {
                    statusBtn.classList.remove('bg-danger');
                } else if (target.status === 'In Progress') {
                    statusBtn.classList.remove('bg-info');
                }

                statusBtn.classList.add('bg-success');
                statusBtn.textContent = 'Completed';
                target.status = 'Completed';
            } else {
                const alert = document.getElementById('markCompleteAlertModal');
                const modalBody = document.querySelector('#markCompleteAlertModal .modal-body');
                if (target.isProject) {
                    modalBody.textContent = 'All todos and sub todos must be completed to mark a project as complete.';
                    const modal = new bootstrap.Modal(alert);
                    modal.show();
                } else {
                    modalBody.textContent = 'All sub todos must be completed to mark a todo as complete.';
                    const modal = new bootstrap.Modal(alert);
                    modal.show();
                }
            }
        } else {
            this.view.toggleCheckCircle(event);
            statusBtn.classList.remove('bg-success');
            statusBtn.textContent = '';
            target.status = 'None';
        }
    }

    // Helpers

    updateProjectsView(items, isProjectsPage, isTrashPage, sortOrder) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayProjectsHeader();
        this.view.displayItems(items, isProjectsPage, isTrashPage, sortOrder);
    }

    updateTodosView(project, isProjectsPage, isTrashPage, sortOrder) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayTodosHeader(project);
        let sortedTodos = project.todos;
        if (project.todos !== undefined) {
            sortedTodos = this.sortInDefaultOrder(project.todos, sortOrder);
        }
        this.view.displayItems(sortedTodos, isProjectsPage, isTrashPage, sortOrder);
    }

    updateTrashView(items, isTrashPage, sortOrder) {
        this.view.clearHeader();
        this.view.clearContent();
        this.view.displayTrashPage(items, isTrashPage, sortOrder);
    }

    updateContentView(items, isProjectsPage, isTrashPage, sortOrder) {
        this.view.clearContent();
        this.view.displayItems(items, isProjectsPage, isTrashPage, sortOrder);
    }

    updateTodosContentView(todos, isProjectsPage, isTrashPage, sortOrder) {
        this.view.clearTodosPageContent();
        this.view.displayItems(todos, isProjectsPage, isTrashPage, sortOrder);
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