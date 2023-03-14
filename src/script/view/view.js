import { isSameDay, isSameYear, format } from 'date-fns';

class View {
    constructor() {
        this.displayProjectsHeader();
    }

    // Add event listeners and bind handlers in the navbar

    bindLogoEventListener(handler) {
        const logo = document.querySelector('.navbar-brand');
        logo.addEventListener('click', handler);
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

    // Add event listeners and bind handlers in the sidebar

    bindHomeEventListener(handler) {
        const homeIcon = document.querySelector('.sidebar > ul > li > i');
        const homeLabel = document.querySelector('.sidebar > ul > li > span');
        homeIcon.addEventListener('click', handler);
        homeLabel.addEventListener('click', handler);
    }

    bindImportantEventListener(handler) {
        const importantIcon = document.querySelector('.sidebar > ul:nth-of-type(2) > li > i');
        const importantLabel = document.querySelector('.sidebar > ul:nth-of-type(2) > li > span');
        importantIcon.addEventListener('click', handler);
        importantLabel.addEventListener('click', handler);
    }

    bindTodayEventListener(handler) {
        const todayIcon = document.querySelector('.sidebar > ul:nth-of-type(3) > li > i');
        const todayLabel = document.querySelector('.sidebar > ul:nth-of-type(3) > li > span');
        todayIcon.addEventListener('click', handler);
        todayLabel.addEventListener('click', handler);
    }

    bindThisWeekEventListener(handler) {
        const weekIcon = document.querySelector('.sidebar > ul:nth-of-type(4) > li > i');
        const weekLabel = document.querySelector('.sidebar > ul:nth-of-type(4) > li > span');
        weekIcon.addEventListener('click', handler);
        weekLabel.addEventListener('click', handler);
    }

    bindThisMonthEventListener(handler) {
        const monthIcon = document.querySelector('.sidebar > ul:nth-of-type(5) > li > i');
        const monthLabel = document.querySelector('.sidebar > ul:nth-of-type(5) > li > span');
        monthIcon.addEventListener('click', handler);
        monthLabel.addEventListener('click', handler);
    }

    bindCompletedEventListener(handler) {
        const completedIcon = document.querySelector('.sidebar > ul:nth-of-type(6) > li > i');
        const completedLabel = document.querySelector('.sidebar > ul:nth-of-type(6) > li > span');
        completedIcon.addEventListener('click', handler);
        completedLabel.addEventListener('click', handler);
    }

    bindInProgressEventListener(handler) {
        const inProgressIcon = document.querySelector('.sidebar > ul:nth-of-type(7) > li > i');
        const inProgressLabel = document.querySelector('.sidebar > ul:nth-of-type(7) > li > span');
        inProgressIcon.addEventListener('click', handler);
        inProgressLabel.addEventListener('click', handler);
    }

    bindOverdueEventListener(handler) {
        const overdueIcon = document.querySelector('.sidebar > ul:nth-of-type(8) > li > i');
        const overdueLabel = document.querySelector('.sidebar > ul:nth-of-type(8) > li > span');
        overdueIcon.addEventListener('click', handler);
        overdueLabel.addEventListener('click', handler);
    }

    bindTrashEventListener(handler) {
        const trashIcon = document.querySelector('.sidebar > ul:nth-of-type(9) > li > i');
        const trashLabel = document.querySelector('.sidebar > ul:nth-of-type(9) > li > span');
        trashIcon.addEventListener('click', handler);
        trashLabel.addEventListener('click', handler);
    }

    // Add event listeners and bind handlers for filter and sort


    bindFilterByTodayEventListener(handler) {
        const filterByToday = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:first-of-type');
        filterByToday.addEventListener('click', handler);
    }

    bindFilterByThisWeekEventListener(handler) {
        const filterByThisWeek = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(2)');
        filterByThisWeek.addEventListener('click', handler);
    }

    bindFilterByThisMonthEventListener(handler) {
        const filterByThisMonth = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(3)');
        filterByThisMonth.addEventListener('click', handler);
    }

    bindFilterByOverdueEventListener(handler) {
        const overdue = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(4)');
        overdue.addEventListener('click', handler);
    }

    bindFilterByPriorityEventListeners(handler) {
        const highPriority = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(5)');
        const mediumPriority = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(6)');
        const noPriority = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(7)');

        highPriority.addEventListener('click', event => {
            handler('High');
        });
        mediumPriority.addEventListener('click', event => {
            handler('Medium')
        });
        noPriority.addEventListener('click', event => {
            handler('None')
        });
    }

    bindFilterByStatusEventListeners(handler) {
        const completed = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(8)');
        const inProgress = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(9)');
        const notYetStarted = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(10)');

        completed.addEventListener('click', event => {
            handler('Completed');
        });
        inProgress.addEventListener('click', event => {
            handler('In Progress');
        });
        notYetStarted.addEventListener('click', event => {
            handler('None');
        });
    }

    // Add event listeners and bind handlers in the projects and todos

    bindProjectLinkEventListener(handler) {
        document.querySelector('body').addEventListener('click', event => {
            if (event.target.classList.contains('bi-arrow-right-circle')) {
                const projectID = event.target.getAttribute('data-id');
                handler(projectID);
            }
        });
    }

    // TODO: CHANGE
    bindEditIconEventListener(handler) {
        document.querySelector('body').addEventListener('click', event => {
            if (event.target.classList.contains('bi-pencil-square')) {
                //const projectID = event.target.getAttribute('data-id');
                //handler(projectID);
            }
        });
    }

    // TODO: CHANGE
    bindRecycleIconEventListener(handler) {
        document.querySelector('body').addEventListener('click', event => {
            if (event.target.classList.contains('bi-recycle')) {
                //const projectID = event.target.getAttribute('data-id');
                //handler(projectID);
            }
        });
    }

    bindCheckCircleEventListeners() {
        // TODO
    }

    toggleCheckCircle() {
        // TODO
        // When checked, also update status to complete; when unchecked, remove complete status
    }

    // Display the pages and their elements

    displayProjectsHeader() {
        const header = document.querySelector('.navbar > h2');
        header.textContent = 'Projects';
    }

    displayItems(items, isProjectsPage, isTrashPage) {
        const content = document.getElementById('content');

        if (items === undefined) return;
        if (items.length === 0) {
            const nothing = this.makeNothing();
            content.appendChild(nothing);
            return;
        }

        const accordion = document.createElement('div');
        accordion.classList.add('accordion');
        accordion.classList.add('accordion-flush');
        accordion.setAttribute('id', 'itemAccordion');

        for (let i = 0; i < items.length; i++) {
            let accordionItem = this.displayItem(items[i], isProjectsPage, isTrashPage);
            accordion.appendChild(accordionItem);
        }
        content.appendChild(accordion);
    }

    displayItem(item, isProjectsPage, isTrashPage) {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        // Accordion header
        const accordionHeader = document.createElement('h2');
        accordionHeader.classList.add('accordion-header');
        accordionHeader.setAttribute('id', `header${item.id}`);

        const accordionButton = document.createElement('button');
        accordionButton.classList.add('accordion-button');
        accordionButton.classList.add('collapsed');
        accordionButton.setAttribute('type', 'button');
        accordionButton.setAttribute('data-bs-toggle', 'collapse');
        accordionButton.setAttribute('data-bs-target', `#item${item.id}`);
        accordionButton.setAttribute('aria-controls', `item${item.id}`);
        accordionButton.setAttribute('aria-expanded', 'false');

        const title = document.createElement('div');
        title.classList.add('d-flex');
        const checkCircle = document.createElement('i');
        checkCircle.classList.add('bi');
        checkCircle.classList.add('bi-circle');
        checkCircle.classList.add('small');
        title.appendChild(checkCircle);

        const name = document.createElement('span');
        name.classList.add('big');
        name.textContent = item.title;
        title.appendChild(name);
        accordionButton.appendChild(title);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');
        infoContainer.classList.add('d-flex');
        infoContainer.classList.add('justify-content-between');

        const date = this.makeDate(item.dueDate);
        infoContainer.appendChild(date);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.classList.add('d-flex');

        const priorityButton = this.makePriorityButton(item.priority);
        buttonsContainer.appendChild(priorityButton);

        const statusButton = this.makeStatusButton(item.status);
        buttonsContainer.appendChild(statusButton);

        infoContainer.appendChild(buttonsContainer);
        accordionButton.appendChild(infoContainer);
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);

        // Accordion body
        const accordionContent = document.createElement('div');
        accordionContent.setAttribute('id', `item${item.id}`);
        accordionContent.classList.add('accordion-collapse');
        accordionContent.classList.add('collapse');
        accordionContent.setAttribute('data-bs-parent', '#itemAccordion');
        accordionContent.setAttribute('aria-labelledby', `header${item.id}`);

        const accordionBody = document.createElement('div');
        accordionBody.classList.add('accordion-body');

        if (item.description !== '' || item.description !== undefined) {
            const description = document.createElement('div');
            description.textContent = item.description;
            accordionBody.appendChild(description);
        }

        if (item.notes !== '' || item.notes !== undefined) {
            const notes = document.createElement('div');
            notes.classList.add('text-muted');
            notes.classList.add('notes');
            notes.textContent = item.notes;
            accordionBody.appendChild(notes);
        }

        if (item.todos !== undefined) {
            let task;
            for (let i = 0; i < item.todos.length; i++) {
                task = this.displayTodo(item.todos[i], isProjectsPage);
                accordionBody.appendChild(task);

                if (item.todos[i].todos !== undefined) {
                    for (let j = 0; j < item.todos[i].todos.length; j++) {
                        task = this.displayTodo(item.todos[i].todos[j], isProjectsPage);
                        accordionBody.appendChild(task);
                    }
                }
            }
        }

        const link = document.createElement('div');
            link.classList.add('text-muted');
            link.classList.add('text-end');

        if (isTrashPage) {
            const recycle = document.createElement('i');
            recycle.classList.add('bi');
            recycle.classList.add('bi-recycle');
            recycle.classList.add('todo-icon');
            //recycle.setAttribute('data-id', `${item.id}`);
            link.appendChild(recycle);
        } else if (item.isProject) {
            const arrow = document.createElement('i');
            arrow.classList.add('bi');
            arrow.classList.add('bi-arrow-right-circle');
            arrow.classList.add('todo-icon');
            arrow.setAttribute('data-id', `${item.id}`);
            link.appendChild(arrow);
        } else {
            const editIcon = document.createElement('i');
            editIcon.classList.add('bi');
            editIcon.classList.add('bi-pencil-square');
            editIcon.classList.add('todo-icon');
            //editIcon.setAttribute('data-id', `${item.id}`);
            link.appendChild(editIcon);
        }
        accordionBody.appendChild(link);

        accordionContent.appendChild(accordionBody);
        accordionItem.appendChild(accordionContent);
        return accordionItem;
    }

    displayTodo(todo, isProjectsPage) {
        const projectTodo = document.createElement('div');
        projectTodo.classList.add('project-todo');

        const title = document.createElement('span');
        title.classList.add('width');
        title.classList.add('d-inline-block');

        if (todo.todoParent !== undefined && isProjectsPage) {
            title.classList.add('sub-todo');
        }

        const icon = document.createElement('i');
        icon.classList.add('bi');
        icon.classList.add('bi-circle');
        icon.classList.add('todo-circle');
        title.appendChild(icon);
        const name = document.createElement('span');
        name.classList.add('name');
        name.textContent = todo.title;
        title.appendChild(name);
        projectTodo.appendChild(title);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('d-inline-flex');
        infoContainer.classList.add('remaining-width');
        infoContainer.classList.add('justify-content-between');

        const date = this.makeDate(todo.dueDate);
        infoContainer.appendChild(date);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.classList.add('d-flex');
        buttonsContainer.classList.add('justify-content-end');

        const priorityButton = this.makePriorityButton(todo.priority);
        buttonsContainer.appendChild(priorityButton);

        const statusButton = this.makeStatusButton(todo.status);
        buttonsContainer.appendChild(statusButton);
        infoContainer.appendChild(buttonsContainer);
        projectTodo.appendChild(infoContainer);
        return projectTodo;
    }

    displayTodosHeader(project) {
        const header = document.querySelector('.navbar > h2');
        const title = document.createElement('span');
        title.textContent = project.title;
        header.appendChild(title);

        const date = this.makeDate(project.dueDate);
        date.classList.add('big');
        header.appendChild(date);

        const buttonsContainer = document.createElement('span');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.classList.add('d-inline-flex');
        buttonsContainer.classList.add('todos-page');

        const priorityButton = this.makePriorityButton(project.priority);
        buttonsContainer.appendChild(priorityButton);

        const statusButton = this.makeStatusButton(project.status);
        buttonsContainer.appendChild(statusButton);
        header.appendChild(buttonsContainer);

        const content = document.getElementById('content');

        const flexContainer = document.createElement('div');
        flexContainer.classList.add('d-flex');
        flexContainer.classList.add('justify-content-between');
        const subheading = document.createElement('div');
        subheading.classList.add('subheading');

        const description = document.createElement('h5');
        if (project.description !== undefined) {
            description.textContent = project.description;
        }

        const notes = document.createElement('h6');
        notes.classList.add('text-muted');
        if (project.notes !== undefined) {
            notes.textContent = project.notes;
        }
        subheading.appendChild(description);
        subheading.appendChild(notes);
        flexContainer.appendChild(subheading);

        const editIcon = document.createElement('i');
        editIcon.classList.add('bi');
        editIcon.classList.add('bi-pencil-square');
        editIcon.classList.add('text-muted');
        editIcon.classList.add('icon-size');
        flexContainer.appendChild(editIcon);
        content.appendChild(flexContainer);

        let divider = this.makeDivider();
        content.appendChild(divider);
    }

    displayTrashPage(removedItems, isTrashPage) {
        const header = document.querySelector('.navbar > h2');
        header.textContent = 'Trash';

        const content = document.getElementById('content');
        let divider = this.makeDivider();
        content.appendChild(divider);

        if (removedItems.length === 0) {
            const nothing = this.makeNothing();
            content.appendChild(nothing);
        } else {
            const removedProjects = removedItems.filter((item) => item.isProject);
            if (removedProjects.length > 0) {
                const projectsHeading = document.createElement('h4');
                projectsHeading.classList.add('subheading');
                projectsHeading.textContent = 'Projects';
                content.appendChild(projectsHeading);
                divider = this.makeDivider();
                content.appendChild(divider);
                this.displayItems(removedProjects, true, isTrashPage);
                }
            const removedTodos = removedItems.filter((item) => !item.isProject);
            if (removedTodos.length > 0) {
                const todosHeading = document.createElement('h4');
                todosHeading.classList.add('subheading');
                todosHeading.textContent = 'Todos';
                divider = this.makeDivider();
                content.appendChild(divider);
                content.appendChild(todosHeading);
                divider = this.makeDivider();
                content.appendChild(divider);

                this.displayItems(removedTodos, false, isTrashPage);
            }
        }
    }

    makeDate(dueDate) {
        const date = document.createElement('span');
        date.classList.add('text-muted');
        date.classList.add('due-date');

        if (dueDate !== undefined) {
            if (isSameDay(dueDate, new Date())) {
                date.textContent = 'Today';
            } else if (!isSameYear(dueDate, new Date())) {
                date.textContent = format(dueDate, 'MMM d yyyy');
            } else {
                date.textContent = format(dueDate, 'MMM d');
            }
        }
        return date;
    }

    makePriorityButton(priority) {
        const priorityButton = document.createElement('div');
        priorityButton.classList.add('status');
        priorityButton.classList.add('priority');
        priorityButton.classList.add('rounded-pill');
        priorityButton.classList.add('text-light');
        priorityButton.classList.add('text-center');

        if (priority === 'None') {
            priorityButton.classList.add('bg-transparent');
        } else if (priority === 'Medium') {
            priorityButton.classList.add('md-priority');
            priorityButton.textContent = 'Medium';
        } else if (priority === 'High') {
            priorityButton.classList.add('high-priority');
            priorityButton.textContent = 'High';
        }
        return priorityButton;
    }

    makeStatusButton(status) {
        const statusButton = document.createElement('div');
        statusButton.classList.add('status');
        statusButton.classList.add('rounded-pill');
        statusButton.classList.add('text-light');
        statusButton.classList.add('text-center');

        if (status === 'None') {
            statusButton.classList.add('bg-transparent');
        } else if (status === 'Overdue') {
            statusButton.classList.add('bg-danger');
            statusButton.textContent = 'Overdue';
        } else if (status === 'In Progress') {
            statusButton.classList.add('bg-info');
            statusButton.textContent = 'In Progress';
        } else if (status === 'Completed') {
            statusButton.classList.add('bg-success');
            statusButton.textContent = 'Completed';
        }
        return statusButton;
    }

    makeDivider() {
        const divider = document.createElement('div');
        divider.classList.add('w-100');
        divider.classList.add('border');
        return divider;
    }

    makeNothing() {
        const nothing = document.createElement('div');
        nothing.classList.add('nothing');
        nothing.classList.add('d-flex');
        nothing.classList.add('justify-content-center');
        nothing.classList.add('align-items-center');
        const text = document.createElement('span');
        text.textContent = 'There is nothing here';
        nothing.appendChild(text);
        return nothing;
    }

    clearContent() {
       const content = document.getElementById('content');
       while (content.firstChild) {
        content.removeChild(content.firstChild);
       }
    }

    clearHeader() {
        const header = document.querySelector('.navbar > h2');
        header.textContent = '';
        while (header.firstChild) {
          header.removeChild(header.firstChild);
        }
    }
}

export { View as default };