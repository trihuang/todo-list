class View {
    constructor() {
        this.addSideBarEventListeners();

        this.displayProjectsHeader();
    }

    // Add event listeners and bind handlers

    bindLogoEventListener(projects) {
        const logo = document.querySelector('.navbar-brand');
        logo.addEventListener('click', event => {
            this.displayProjectsHeader();
            this.displayProjects(projects);
        });
    }

    bindSearchBarEventListeners(handler) {
        const searchBtn = document.querySelector('.form-inline .btn');
        const searchBar = document.querySelector('.form-inline .form-control');
        searchBtn.addEventListener('click', event => {
            let input = searchBar.value.trim();
            if (input === '' || input === null) return;
            else handler(input);
        });
        searchBar.addEventListener('search', event => {
            let input = searchBar.value.trim();
            if (input === '' || input === null) return;
            else handler(input);
        });
    }

    bindCreateProjectBtnEventListener(handler) {
        // TODO
        // DOM for all input values
        // check that title and due date are valid
        // attach event listener and pass to handler to create project in model
    }

    toggleNotificationBadge() {
        // TODO
    }

    bindNotificationsEventListeners(handler) {
        // TODO
    }

    addSideBarEventListeners() {
        // TODO
    }

    addSortCriteriaEventListeners() {
        // TODO
    }

    addFilterCriteriaEventListeners() {
        // TODO
    }

    addProjectEventListener() {
        // TODO
    }

    addChecklistEventListeners() {
        // TODO
    }

    toggleCheckCircle() {
        // TODO
    }

    // Display the pages and their elements

    displayProjectsHeader() {
        const header = document.querySelector('.navbar > h2');
        header.textContent = 'Projects';
    }

    displayProjects(projects) {
        // TODO
        console.log('display projects');
    }

    displayProject(project) {
        // TODO: make accordion
    }

    displayTodosHeader() {
        // TODO
    }

    displayTodos(todos) {
        // TODO
    }

    displayTodo(todo) {
        // TODO
    }

    displayTrashPage() {
        // TODO
    }

    clearContent() {
        // TODO
    }
}

export { View as default };