import { isSameDay, isSameYear, format } from 'date-fns';

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
            this.displayItems(projects);
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
        // When checked, also update status to complete; when unchecked, remove complete status
    }

    // Display the pages and their elements

    displayProjectsHeader() {
        const header = document.querySelector('.navbar > h2');
        header.textContent = 'Projects';
    }

    displayItems(items) {
        const content = document.getElementById('content');
        const accordion = document.createElement('div');
        accordion.classList.add('accordion');
        accordion.classList.add('accordion-flush');
        accordion.setAttribute('id', 'itemAccordion');

        for (let i = 0; i < items.length; i++) {
            let accordionItem = this.displayItem(items[i]);
            accordion.appendChild(accordionItem);
        }
        content.appendChild(accordion);
    }

    displayItem(item) {
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

        const date = document.createElement('div');
        date.classList.add('text-muted');
        date.classList.add('due-date');

        if (item.dueDate !== undefined) {
            if (isSameDay(item.dueDate, new Date())) {
                date.textContent = 'Today';
            } else if (!isSameYear(item.dueDate, new Date())) {
                date.textContent = format(item.dueDate, 'MMM d yyyy');
            } else {
                date.textContent = format(item.dueDate, 'MMM d');
            }
        }
        infoContainer.appendChild(date);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.classList.add('d-flex');

        const priorityButton = document.createElement('div');
        priorityButton.classList.add('status');
        priorityButton.classList.add('priority');
        priorityButton.classList.add('rounded-pill');
        priorityButton.classList.add('text-light');
        priorityButton.classList.add('text-center');

        if (item.priority === 'None') {
            priorityButton.classList.add('bg-transparent');
        } else if (item.priority === 'Medium') {
            priorityButton.classList.add('md-priority');
            priorityButton.textContent = 'Medium';
        } else if (item.priority === 'High') {
            priorityButton.classList.add('high-priority');
            priorityButton.textContent = 'High';
        }
        buttonsContainer.appendChild(priorityButton);

        const statusButton = document.createElement('div');
        statusButton.classList.add('status');
        statusButton.classList.add('rounded-pill');
        statusButton.classList.add('text-light');
        statusButton.classList.add('text-center');

        if (item.status === 'None') {
            statusButton.classList.add('bg-transparent');
        } else if (item.status === 'Overdue') {
            statusButton.classList.add('bg-danger');
            statusButton.textContent = 'Overdue';
        } else if (item.status === 'In Progress') {
            statusButton.classList.add('bg-info');
            statusButton.textContent = 'In Progress';
        } else if (item.status === 'Completed') {
            statusButton.classList.add('bg-success');
            statusButton.textContent = 'Completed';
        }
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
                task = this.displayTodo(item.todos[i]);
                accordionBody.appendChild(task);

                if (item.todos[i].todos !== undefined) {
                    for (let j = 0; j < item.todos[i].todos.length; j++) {
                        task = this.displayTodo(item.todos[i].todos[j]);
                        accordionBody.appendChild(task);
                    }
                }
            }
        }

        if (item.isProject) {
            const link = document.createElement('div');
            link.classList.add('text-muted');
            link.classList.add('text-end');
            link.classList.add('project-link');
            link.textContent = 'Go to project page';
            accordionBody.appendChild(link);
        } else {
            const link = document.createElement('div');
            link.classList.add('text-muted');
            link.classList.add('text-end');
            link.classList.add('project-link');
            const editIcon = document.createElement('i');
            editIcon.classList.add('bi');
            editIcon.classList.add('bi-pencil-square');
            editIcon.classList.add('text-muted');
            editIcon.classList.add('todo-icon');
            link.appendChild(editIcon);
            accordionBody.appendChild(link);
        }

        accordionContent.appendChild(accordionBody);
        accordionItem.appendChild(accordionContent);
        return accordionItem;
    }

    displayTodo(todo) {
        const projectTodo = document.createElement('div');
        projectTodo.classList.add('project-todo');

        const title = document.createElement('span');
        title.classList.add('width');
        title.classList.add('d-inline-block');

        if (todo.todoParent !== undefined) {
            title.classList.add('sub-todo');
        }

        const icon = document.createElement('i');
        icon.classList.add('bi');
        icon.classList.add('bi-circle');
        icon.classList.add('todo-circle');
        title.appendChild(icon);
        const name = document.createElement('span');
        name.textContent = todo.title;
        title.appendChild(name);
        projectTodo.appendChild(title);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('d-inline-flex');
        infoContainer.classList.add('remaining-width');
        infoContainer.classList.add('justify-content-between');

        const date = document.createElement('span');
        date.classList.add('text-muted');
        date.classList.add('due-date');

        if (todo.dueDate !== undefined) {
            if (isSameDay(todo.dueDate, new Date())) {
                date.textContent = 'Today';
            } else if (!isSameYear(todo.dueDate, new Date())) {
                date.textContent = format(todo.dueDate, 'MMM d yyyy');
            } else {
                date.textContent = format(todo.dueDate, 'MMM d');
            }
        }
        infoContainer.appendChild(date);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.classList.add('d-flex');
        buttonsContainer.classList.add('justify-content-end');

        const priorityButton = document.createElement('div');
        priorityButton.classList.add('status');
        priorityButton.classList.add('priority');
        priorityButton.classList.add('rounded-pill');
        priorityButton.classList.add('text-light');
        priorityButton.classList.add('text-center');

        if (todo.priority === 'None') {
            priorityButton.classList.add('bg-transparent');
        } else if (todo.priority === 'Medium') {
            priorityButton.classList.add('md-priority');
            priorityButton.textContent = 'Medium';
        } else if (todo.priority === 'High') {
            priorityButton.classList.add('high-priority');
            priorityButton.textContent = 'High';
        }
        buttonsContainer.appendChild(priorityButton);

        const statusButton = document.createElement('div');
        statusButton.classList.add('status');
        statusButton.classList.add('rounded-pill');
        statusButton.classList.add('text-light');
        statusButton.classList.add('text-center');
        statusButton.classList.add('d-inline-block');
        statusButton.classList.add('ml-auto');

        if (todo.status === 'None') {
            statusButton.classList.add('bg-transparent');
        } else if (todo.status === 'Overdue') {
            statusButton.classList.add('bg-danger');
            statusButton.textContent = 'Overdue';
        } else if (todo.status === 'In Progress') {
            statusButton.classList.add('bg-info');
            statusButton.textContent = 'In Progress';
        } else if (todo.status === 'Completed') {
            statusButton.classList.add('bg-success');
            statusButton.textContent = 'Completed';
        }
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

        const date = document.createElement('span');
        date.classList.add('text-muted');
        date.classList.add('due-date');
        date.classList.add('big');
        
        if (isSameDay(project.dueDate, new Date())) {
            date.textContent = 'Today';
        } else if (!isSameYear(project.dueDate, new Date())) {
            date.textContent = format(project.dueDate, 'MMMM d, yyyy');
        } else {
            date.textContent = format(project.dueDate, 'MMMM d');
        }
        header.appendChild(date);

        const buttonsContainer = document.createElement('span');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.classList.add('d-inline-flex');
        buttonsContainer.classList.add('todos-page');

        const priorityButton = document.createElement('div');
        priorityButton.classList.add('status');
        priorityButton.classList.add('priority');
        priorityButton.classList.add('rounded-pill');
        priorityButton.classList.add('text-light');
        priorityButton.classList.add('text-center');

        if (project.priority === 'None') {
            priorityButton.classList.add('bg-transparent');
        } else if (project.priority === 'Medium') {
            priorityButton.classList.add('md-priority');
            priorityButton.textContent = 'Medium';
        } else if (project.priority === 'High') {
            priorityButton.classList.add('high-priority');
            priorityButton.textContent = 'High';
        }
        buttonsContainer.appendChild(priorityButton);

        const statusButton = document.createElement('div');
        statusButton.classList.add('status');
        statusButton.classList.add('rounded-pill');
        statusButton.classList.add('text-light');
        statusButton.classList.add('text-center');

        if (project.status === 'None') {
            statusButton.classList.add('bg-transparent');
        } else if (project.status === 'Overdue') {
            statusButton.classList.add('bg-danger');
            statusButton.textContent = 'Overdue';
        } else if (project.status === 'In Progress') {
            statusButton.classList.add('bg-info');
            statusButton.textContent = 'In Progress';
        } else if (project.status === 'Completed') {
            statusButton.classList.add('bg-success');
            statusButton.textContent = 'Completed';
        }
        buttonsContainer.appendChild(statusButton);
        header.appendChild(buttonsContainer);

        const content = document.getElementById('content');
        const divider1 = document.createElement('div');
        divider1.classList.add('w-100');
        divider1.classList.add('border');
        content.appendChild(divider1);

        const flexContainer = document.createElement('div');
        flexContainer.classList.add('d-flex');
        flexContainer.classList.add('justify-content-between');
        const subheading = document.createElement('div');
        subheading.classList.add('subheading');

        const description = document.createElement('h4');
        if (project.description !== undefined) {
            description.textContent = project.description;
        }

        const notes = document.createElement('h6');
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

        const divider2 = document.createElement('div');
        divider2.classList.add('w-100');
        divider2.classList.add('border');
        content.appendChild(divider2);
    }

    displayTrashPage(removedItems) {
        const header = document.querySelector('.navbar > h2');
        header.textContent = 'Trash';

        const content = document.getElementById('content');
        const divider1 = document.createElement('div');
        divider1.classList.add('w-100');
        divider1.classList.add('border');
        content.appendChild(divider1);

        if (removedItems.length === 0) {
            const nothing = document.createElement('div');
            nothing.classList.add('nothing');
            nothing.classList.add('d-flex');
            nothing.classList.add('justify-content-center');
            nothing.classList.add('align-items-center');
            const text = document.createElement('span');
            text.textContent = 'There is nothing here';
            nothing.appendChild(text);
            content.appendChild(nothing);
        } else {
            const removedProjects = removedItems.filter((item) => item.isProject);
            if (removedProjects.length > 0) {
                const projectsHeading = document.createElement('h4');
                projectsHeading.classList.add('subheading');
                projectsHeading.textContent = 'Projects';
                content.appendChild(projectsHeading);
                const divider2 = document.createElement('div');
                divider2.classList.add('w-100');
                divider2.classList.add('border');
                content.appendChild(divider2);
                this.displayItems(removedProjects);
                }
            const removedTodos = removedItems.filter((item) => !item.isProject);
            if (removedTodos.length > 0) {
                const todosHeading = document.createElement('h4');
                todosHeading.classList.add('subheading');
                todosHeading.textContent = 'Todos';
                const divider3 = document.createElement('div');
                divider3.classList.add('w-100');
                divider3.classList.add('border');
                content.appendChild(divider3);
                content.appendChild(todosHeading);
                const divider4 = document.createElement('div');
                divider4.classList.add('w-100');
                divider4.classList.add('border');
                content.appendChild(divider4);

                this.displayItems(removedTodos);
            }
        }
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