import { isSameDay, isSameYear, format, parseISO } from 'date-fns';
import Todo from '../model/todo'

class View {
    constructor() {
        this.modalIDCounter = 1;
        this.displayProjectsHeader();
        this.bindAddTodoBtnInCreateProjectModalEventListener();
        this.bindCloseBtnEventListenersInCreateProjectModal();
        this.bindCloseBtnEventListenersInEditProjectModal();
        this.bindDeleteBtnEventListenerInEditProjectModal();
    }

    get modalIDCounter() {
        return this._modalIDCounter;
    }

    set modalIDCounter(i) {
        this._modalIDCounter = i;
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

    // Add event listeners and helpers for create project modal
    
    bindAddTodoBtnInCreateProjectModalEventListener() {
        const addTodoBtn = document.getElementById('create-proj-addTodo');
        const btnDiv = addTodoBtn.parentNode;
        const todosLabelDiv = document.getElementById('todoField');
        addTodoBtn.addEventListener('click', event => {
            if (btnDiv.previousElementSibling === todosLabelDiv) {
                this.addTodoInputFieldsToCreateProjectModal();
            } else {
                let currentNode = todosLabelDiv.nextElementSibling;
                let allTodosHaveTitles = true;
                while (currentNode !== btnDiv) {
                    if (currentNode.children[0].children[1].value.trim() === '') {
                        allTodosHaveTitles = false;
                        currentNode.children[0].children[0].children[1].children[1].textContent = ' A title is required.';
                    } else {
                        currentNode.children[0].children[0].children[1].children[1].textContent = '';
                    }
                    currentNode = currentNode.nextElementSibling;
                }

                if (allTodosHaveTitles) {
                    currentNode = todosLabelDiv.nextElementSibling;
                    while (currentNode !== btnDiv) {
                        currentNode.children[0].children[0].children[1].children[1].textContent = '';
                        currentNode = currentNode.nextElementSibling;
                    }
                    this.addTodoInputFieldsToCreateProjectModal();
                }
            }
        });
    }

    addTodoInputFieldsToCreateProjectModal() {
        const todoForm = document.createElement('div');
        todoForm.classList.add('mb-3');

        // Create the title input
        const titleDiv = this.makeTitleInput();
        todoForm.appendChild(titleDiv);

        // Create the due date input
        const dueDateDiv = this.makeDueDateInput();
        todoForm.appendChild(dueDateDiv);

        // Create the description input
        const descriptionDiv = this.makeDescriptionInput();
        todoForm.appendChild(descriptionDiv);

        // Create the notes input
        const notesDiv = this.makeNotesInput();
        todoForm.appendChild(notesDiv);

        // Create the priority selections
        const priorityDiv = this.makePrioritySelections();
        todoForm.appendChild(priorityDiv);

        // Create the status selections
        const statusDiv = this.makeStatusSelections();
        todoForm.appendChild(statusDiv);

        // Create the subtodo section
        const subTodosDiv = this.makeSubTodoLabel();
        todoForm.appendChild(subTodosDiv);
        const subTodoBtn = this.makeAddSubTodoBtn();
        todoForm.appendChild(subTodoBtn);

        // Insert remove button
        const removeBtn = this.makeRemoveBtn();
        todoForm.appendChild(removeBtn);
        const divider = this.makeModalDivider();
        todoForm.appendChild(divider);

        this.modalIDCounter++;

        // Insert the todo form into the modal
        const addTodoBtnDiv = document.getElementById('create-proj-addTodo').parentNode;
        const parent = addTodoBtnDiv.parentNode;
        parent.insertBefore(todoForm, addTodoBtnDiv);
    }

    makeTitleInput() {
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('mb-3');
        const titleLabel = document.createElement('label');
        titleLabel.classList.add('col-form-label');
        titleLabel.setAttribute('for', `title-todo${this.modalIDCounter}`);
        const labelText = document.createElement('span');
        labelText.textContent = 'Title';
        titleLabel.appendChild(labelText);
        const warningLabel = document.createElement('span');
        warningLabel.classList.add('text-danger');
        const asterisk = document.createElement('span');
        asterisk.textContent = '*';
        warningLabel.appendChild(asterisk);
        const warning = document.createElement('em');
        warningLabel.appendChild(warning);
        titleLabel.appendChild(warningLabel);
        const titleInput = document.createElement('input');
        titleInput.classList.add('form-control');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('id', `title-todo${this.modalIDCounter}`);
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleInput);
        return titleDiv;
    }

    makeDueDateInput() {
        const dueDateDiv = document.createElement('div');
        dueDateDiv.classList.add('mb-3');
        const dueDateLabel = document.createElement('label');
        dueDateLabel.classList.add('col-form-label');
        dueDateLabel.setAttribute('for', `dueDate-todo${this.modalIDCounter}`);
        dueDateLabel.textContent = 'Due Date';
        const dueDateInput = document.createElement('input');
        dueDateInput.classList.add('form-control');
        dueDateInput.setAttribute('type', 'date');
        dueDateInput.setAttribute('id', `dueDate-todo${this.modalIDCounter}`);
        dueDateDiv.appendChild(dueDateLabel);
        dueDateDiv.appendChild(dueDateInput);
        return dueDateDiv;
    }

    makeDescriptionInput() {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('mb-3');
        const descriptionLabel = document.createElement('label');
        descriptionLabel.classList.add('col-form-label');
        descriptionLabel.setAttribute('for', `description-todo${this.modalIDCounter}`);
        descriptionLabel.textContent = 'Description';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.classList.add('form-control');
        descriptionInput.setAttribute('id', `description-todo${this.modalIDCounter}`);
        descriptionDiv.appendChild(descriptionLabel);
        descriptionDiv.appendChild(descriptionInput);
        return descriptionDiv;
    }

    makeNotesInput() {
        const notesDiv = document.createElement('div');
        notesDiv.classList.add('mb-3');
        const notesLabel = document.createElement('label');
        notesLabel.classList.add('col-form-label');
        notesLabel.setAttribute('for', `notes-todo${this.modalIDCounter}`);
        notesLabel.textContent = 'Notes';
        const notesInput = document.createElement('input');
        notesInput.classList.add('form-control');
        notesInput.setAttribute('type', 'text');
        notesInput.setAttribute('id', `notes-todo${this.modalIDCounter}`);
        notesDiv.appendChild(notesLabel);
        notesDiv.appendChild(notesInput);
        return notesDiv;
    }

    makePrioritySelections() {
        const priorityDiv = document.createElement('div');
        priorityDiv.classList.add('mb-3');
        const label = document.createElement('label');
        label.classList.add('col-form-label');
        label.textContent = 'Select Priority';
        priorityDiv.appendChild(label);
        const lineBreak = document.createElement('br');
        priorityDiv.appendChild(lineBreak);

        const selectionOne = document.createElement('div');
        selectionOne.classList.add('form-check');
        selectionOne.classList.add('form-check-inline');
        const noPriorityRadioBtn = document.createElement('input');
        noPriorityRadioBtn.classList.add('form-check-input');
        noPriorityRadioBtn.setAttribute('type', 'radio');
        noPriorityRadioBtn.setAttribute('name', `priority-todo${this.modalIDCounter}`);
        noPriorityRadioBtn.setAttribute('id', `no-priority-todo${this.modalIDCounter}`);
        noPriorityRadioBtn.checked = true;
        const noPriorityLabel = document.createElement('label');
        noPriorityLabel.classList.add('form-check-label');
        noPriorityLabel.setAttribute('for', `no-priority-todo${this.modalIDCounter}`);
        const noPriorityButton = document.createElement('div');
        noPriorityButton.classList.add('status');
        noPriorityButton.classList.add('priority');
        noPriorityButton.classList.add('rounded-pill');
        noPriorityButton.classList.add('text-light');
        noPriorityButton.classList.add('text-center');
        noPriorityButton.classList.add('bg-secondary');
        noPriorityButton.textContent = 'None';
        noPriorityLabel.appendChild(noPriorityButton);
        selectionOne.appendChild(noPriorityRadioBtn);
        selectionOne.appendChild(noPriorityLabel);

        const selectionTwo = document.createElement('div');
        selectionTwo.classList.add('form-check');
        selectionTwo.classList.add('form-check-inline');
        const mdPriorityRadioBtn = document.createElement('input');
        mdPriorityRadioBtn.classList.add('form-check-input');
        mdPriorityRadioBtn.setAttribute('type', 'radio');
        mdPriorityRadioBtn.setAttribute('name', `priority-todo${this.modalIDCounter}`);
        mdPriorityRadioBtn.setAttribute('id', `medium-priority-todo${this.modalIDCounter}`);
        const mdPriorityLabel = document.createElement('label');
        mdPriorityLabel.classList.add('form-check-label');
        mdPriorityLabel.setAttribute('for', `medium-priority-todo${this.modalIDCounter}`);
        const mdPriorityButton = this.makePriorityButton('Medium');
        mdPriorityLabel.appendChild(mdPriorityButton);
        selectionTwo.appendChild(mdPriorityRadioBtn);
        selectionTwo.appendChild(mdPriorityLabel);

        const selectionThree = document.createElement('div');
        selectionThree.classList.add('form-check');
        selectionThree.classList.add('form-check-inline');
        const hiPriorityRadioBtn = document.createElement('input');
        hiPriorityRadioBtn.classList.add('form-check-input');
        hiPriorityRadioBtn.setAttribute('type', 'radio');
        hiPriorityRadioBtn.setAttribute('name', `priority-todo${this.modalIDCounter}`);
        hiPriorityRadioBtn.setAttribute('id', `hi-priority-todo${this.modalIDCounter}`);
        const hiPriorityLabel = document.createElement('label');
        hiPriorityLabel.classList.add('form-check-label');
        hiPriorityLabel.setAttribute('for', `hi-priority-todo${this.modalIDCounter}`);
        const hiPriorityButton = this.makePriorityButton('High');
        hiPriorityLabel.appendChild(hiPriorityButton);
        selectionThree.appendChild(hiPriorityRadioBtn);
        selectionThree.appendChild(hiPriorityLabel);

        priorityDiv.appendChild(selectionOne);
        priorityDiv.appendChild(selectionTwo);
        priorityDiv.appendChild(selectionThree);
        return priorityDiv;
    }

    makeStatusSelections() {
        const statusDiv = document.createElement('div');
        statusDiv.classList.add('mb-3');
        const label = document.createElement('label');
        label.classList.add('col-form-label');
        label.textContent = 'Select Status';
        statusDiv.appendChild(label);
        const lineBreak = document.createElement('br');
        statusDiv.appendChild(lineBreak);

        const selectionOne = document.createElement('div');
        selectionOne.classList.add('form-check');
        selectionOne.classList.add('form-check-inline');
        const noStatusRadioBtn = document.createElement('input');
        noStatusRadioBtn.classList.add('form-check-input');
        noStatusRadioBtn.setAttribute('type', 'radio');
        noStatusRadioBtn.setAttribute('name', `status-todo${this.modalIDCounter}`);
        noStatusRadioBtn.setAttribute('id', `no-status-todo${this.modalIDCounter}`);
        noStatusRadioBtn.checked = true;
        const noStatusLabel = document.createElement('label');
        noStatusLabel.classList.add('form-check-label');
        noStatusLabel.setAttribute('for', `no-status-todo${this.modalIDCounter}`);
        const noStatusButton = document.createElement('div');
        noStatusButton.classList.add('status');
        noStatusButton.classList.add('rounded-pill');
        noStatusButton.classList.add('text-light');
        noStatusButton.classList.add('text-center');
        noStatusButton.classList.add('bg-secondary');
        noStatusButton.textContent = 'None';
        noStatusLabel.appendChild(noStatusButton);
        selectionOne.appendChild(noStatusRadioBtn);
        selectionOne.appendChild(noStatusLabel);

        const selectionTwo = document.createElement('div');
        selectionTwo.classList.add('form-check');
        selectionTwo.classList.add('form-check-inline');
        const inProgressRadioBtn = document.createElement('input');
        inProgressRadioBtn.classList.add('form-check-input');
        inProgressRadioBtn.setAttribute('type', 'radio');
        inProgressRadioBtn.setAttribute('name', `status-todo${this.modalIDCounter}`);
        inProgressRadioBtn.setAttribute('id', `in-progress-todo${this.modalIDCounter}`);
        const inProgressLabel = document.createElement('label');
        inProgressLabel.classList.add('form-check-label');
        inProgressLabel.setAttribute('for', `in-progress-todo${this.modalIDCounter}`);
        const inProgressButton = this.makeStatusButton('In Progress');
        inProgressLabel.appendChild(inProgressButton);
        selectionTwo.appendChild(inProgressRadioBtn);
        selectionTwo.appendChild(inProgressLabel);

        statusDiv.appendChild(selectionOne);
        statusDiv.appendChild(selectionTwo);
        return statusDiv;
    }

    makeSubTodoLabel() {
        const div = document.createElement('div');
        div.classList.add('mb-3');
        div.setAttribute('id', `subtodoField${this.modalIDCounter}`);
        const label = document.createElement('label');
        label.classList.add('col-form-label');
        const labelText = document.createElement('span');
        labelText.textContent = 'Subtodos';
        label.appendChild(labelText);
        const warning = document.createElement('em');
        warning.classList.add('text-danger');
        label.appendChild(warning);
        div.appendChild(label);
        return div;
    }

    makeAddSubTodoBtn() {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('mb-3');
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-outline-secondary');
        btn.setAttribute('type', 'button');
        btn.setAttribute('data-id', this.modalIDCounter);
        btn.textContent = 'Add Subtodo';
        btn.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            const subtodoLabel = document.getElementById(`subtodoField${id}`);
            if (subtodoLabel.nextElementSibling === event.target.parentNode) {
                const input = this.makeSubTodoInputField();
                event.target.parentNode.parentNode.insertBefore(input, event.target.parentNode);
            } else {
                let currentNode = subtodoLabel.nextElementSibling;
                let allHaveTitle = true;
                while (currentNode !== event.target.parentNode) {
                    if (currentNode.children[0].value.trim() === '') {
                        allHaveTitle = false;
                        subtodoLabel.children[0].children[1].textContent = '* A subtodo must have a title.';
                    }
                    currentNode = currentNode.nextElementSibling;
                }

                if (allHaveTitle) {
                    subtodoLabel.children[0].children[1].textContent = '';
                    const newInput = this.makeSubTodoInputField();
                    event.target.parentNode.parentNode.insertBefore(newInput, event.target.parentNode);
                }
            }
        });
        buttonDiv.appendChild(btn);
        return buttonDiv;
    }

    makeSubTodoInputField() {
        const div = document.createElement('div');
        div.classList.add('mb-3');
        div.classList.add('input-group');
        const input = document.createElement('input');
        input.classList.add('form-control');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Subtodo title');
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('input-group-append');
        const xBtn = document.createElement('button');
        xBtn.classList.add('btn');
        xBtn.classList.add('btn-outline-secondary');
        xBtn.setAttribute('type', 'button');
        const icon = document.createElement('i');
        icon.classList.add('bi');
        icon.classList.add('bi-x-lg');
        xBtn.appendChild(icon);
        xBtn.addEventListener('click', this.removeSubTodoInputField);
        buttonDiv.appendChild(xBtn);
        div.appendChild(input);
        div.appendChild(buttonDiv);
        return div;
    }

    removeSubTodoInputField = (e) => {
        if (e.target.classList.contains('btn-outline-secondary')) {
            this.removeTodoInputField(e);
        } else if (e.target.classList.contains('bi-x-lg')) {
            e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
        }
    }

    makeRemoveBtn() {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('mb-3');
        buttonDiv.classList.add('d-flex');
        buttonDiv.classList.add('justify-content-end');
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('type', 'button');
        removeBtn.classList.add('btn');
        removeBtn.classList.add('btn-danger');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', this.removeTodoInputField);
        buttonDiv.appendChild(removeBtn);
        return buttonDiv;
    }

    removeTodoInputField(e) {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    }

    makeModalDivider() {
        const dividerDiv = document.createElement('div');
        dividerDiv.classList.add('mb-3');
        const div = document.createElement('div');
        div.classList.add('divider');
        div.classList.add('w-100');
        dividerDiv.appendChild(div);
        return dividerDiv;
    }

    bindCreateProjectBtnEventListener(handler) {
        const createBtn = document.getElementById('createBtn');
        createBtn.addEventListener('click', event => {
            const titleInput = document.getElementById('title');
            const dueDateInput = document.getElementById('dueDate');
            const title = titleInput.value.trim();
            const dueDate = dueDateInput.value;
            const titleLabel = document.getElementById('requireTitle');
            const dueDateLabel = document.getElementById('requireDueDate');
            const todosLabel = document.getElementById('todoField');
            const addTodoBtn = document.getElementById('create-proj-addTodo');

            if (title === '' && dueDate === '') {
                titleLabel.textContent = ' A title is required.'
                dueDateLabel.textContent = ' A due date is required.'
            } else if (title === '') {
                this.clearWarningsInCreateProjectModal();
                titleLabel.textContent = ' A title is required.'
            } else if (dueDate === '') {
                this.clearWarningsInCreateProjectModal();
                dueDateLabel.textContent = ' A due date is required.'
            } else {
                // If there are todos, check that all todos have a title
                // and check that all subtodos have a title
                let allTodosHaveTitles = true;
                let allSubTodosHaveTitles = true;
                if (todosLabel.nextElementSibling !== addTodoBtn.parentNode) {
                    let currentNode = todosLabel.nextElementSibling;
                    let subTodoLabel;
                    let addSubTodoBtn;
                    let currentSubTodo;
                    while (currentNode !== addTodoBtn.parentNode) {
                        if (currentNode.children[0].children[1].value.trim() === '') {
                            allTodosHaveTitles = false;
                            currentNode.children[0].children[0].children[1].children[1].textContent = ' A title is required.';
                        } else {
                            currentNode.children[0].children[0].children[1].children[1].textContent = '';
                        }
                        
                        subTodoLabel = currentNode.children[6];
                        addSubTodoBtn = currentNode.lastChild.previousElementSibling.previousElementSibling;
                        currentSubTodo = subTodoLabel.nextElementSibling;
                        while (currentSubTodo !== addSubTodoBtn) {
                            if (currentSubTodo.children[0].value.trim() === '') {
                                allSubTodosHaveTitles = false;
                                subTodoLabel.children[0].children[1].textContent = '* A subtodo must have a title.';
                            } 
                            currentSubTodo = currentSubTodo.nextElementSibling;
                        }

                        if (allSubTodosHaveTitles) {
                            subTodoLabel.children[0].children[1].textContent = '';
                        }
                        currentNode = currentNode.nextElementSibling;
                    }
                }

                if (allTodosHaveTitles && allSubTodosHaveTitles) {
                    const description = document.getElementById('description').value.trim();
                    const notes = document.getElementById('nts').value.trim();

                    let priority;
                    const mdPriorityRadioBtn = document.getElementById('medium-priority');
                    const hiPriorityRadioBtn = document.getElementById('hi-priority');

                    if (hiPriorityRadioBtn.checked) {
                        priority = 'High';
                    } else if (mdPriorityRadioBtn.checked) {
                        priority = 'Medium';
                    } else {
                        priority = 'None';
                    }

                    let status;
                    const inProgressRadioBtn = document.getElementById('in-progress');

                    if (inProgressRadioBtn.checked) {
                        status = 'In Progress';
                    } else {
                        status = 'None';
                    }

                    let todos;
                    if (todosLabel.nextElementSibling !== addTodoBtn.parentNode) {
                        todos = [];
                        let currentNode = todosLabel.nextElementSibling;
                        let todoTitle;
                        let todoDueDate;
                        let todoDescription;
                        let todoNotes;
                        let todoPriority;
                        let todoStatus;
                        let todoSubtodos;
                        let noPriorityBtn;
                        let mdPriorityBtn;
                        //let hiPriorityBtn;
                        let noStatusBtn;
                        //let inProgressBtn;
                        let subTodoLabel;
                        let addSubTodoBtn;
                        let currentSubTodo;
                        let subTodoTitle;
                        let subTodo;
                        let todo;
                        while (currentNode !== addTodoBtn.parentNode) {
                            todoTitle = currentNode.children[0].children[1].value.trim();
                            todoDueDate = currentNode.children[1].children[1].value;
                            if (todoDueDate !== '') {
                                todoDueDate = parseISO(todoDueDate);
                            }
                            todoDescription = currentNode.children[2].children[1].value.trim();
                            todoNotes = currentNode.children[3].children[1].value.trim();

                            noPriorityBtn = currentNode.children[4].children[2].children[0];
                            mdPriorityBtn = currentNode.children[4].children[3].children[0];
                            //hiPriorityBtn = currentNode.children[4].children[4].children[0];

                            if (noPriorityBtn.checked) {
                                todoPriority = 'None';
                            } else if (mdPriorityBtn.checked) {
                                todoPriority = 'Medium';
                            } else {
                                todoPriority = 'High';
                            }

                            noStatusBtn = currentNode.children[5].children[2].children[0];
                            if (noStatusBtn.checked) {
                                todoStatus = 'None';
                            } else {
                                todoStatus = 'In Progress';
                            }

                            subTodoLabel = currentNode.children[6];
                            addSubTodoBtn = currentNode.lastChild.previousElementSibling.previousElementSibling;
                            if (subTodoLabel.nextElementSibling !== addSubTodoBtn) {
                                todoSubtodos = [];
                                currentSubTodo = subTodoLabel.nextElementSibling;
                                while (currentSubTodo !== addSubTodoBtn) {
                                    subTodoTitle = currentSubTodo.children[0].value.trim();
                                    subTodo = new Todo(subTodoTitle, '', '', 'None', 'None', '', undefined);
                                    todoSubtodos.push(subTodo);
                                    currentSubTodo = currentSubTodo.nextElementSibling;
                                }
                            }
                            todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoStatus, todoNotes, todoSubtodos);
                            todos.push(todo);
                            currentNode = currentNode.nextElementSibling;
                        }
                    }
                    handler(title, dueDate, description, notes, priority, status, todos);
                    const projectForm = document.getElementById('createProjectForm');
                    projectForm.reset();
                    this.clearTodoInputFieldsInCreateProjectModal();
                    this.clearWarningsInCreateProjectModal();
                    this.modalIDCounter = 1;
                    const form = document.getElementById('create-project-modal');
                    const modal = bootstrap.Modal.getInstance(form);
                    modal.hide();
                }
            }
        });
    }

    clearWarningsInCreateProjectModal() {
        const titleLabel = document.getElementById('requireTitle');
        const dueDateLabel = document.getElementById('requireDueDate');
        titleLabel.textContent = '';
        dueDateLabel.textContent = '';
    }

    clearTodoInputFieldsInCreateProjectModal() {
        const createBtnContainer = document.getElementById('create-proj-addTodo').parentNode;
        const parent = createBtnContainer.parentNode;
        const todosLabelDiv = document.getElementById('todoField');
        while (todosLabelDiv.nextElementSibling !== createBtnContainer) {
            parent.removeChild(todosLabelDiv.nextElementSibling);
        }
    }

    bindCloseBtnEventListenersInCreateProjectModal() {
        const xBtn = document.getElementById('projXBtn');
        const closeBtn = document.getElementById('projCloseBtn');
        const projectForm = document.getElementById('createProjectForm');
        xBtn.addEventListener('click', event => {
            projectForm.reset();
            this.modalIDCounter = 1;
            this.clearTodoInputFieldsInCreateProjectModal();
            this.clearWarningsInCreateProjectModal();
        });
        closeBtn.addEventListener('click', event => {
            projectForm.reset();
            this.modalIDCounter = 1;
            this.clearTodoInputFieldsInCreateProjectModal();
            this.clearWarningsInCreateProjectModal();
        });
    }
 
    // Notification

    toggleNotificationBadge() {
        // TODO
    }

    bindNotificationsEventListeners(handler) {
        // TODO
    }

    // Settings

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

    bindFilterByWithDueDateEventListener(handler) {
        const withDueDate = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(11)');
        withDueDate.addEventListener('click', handler);
    }

    bindFilterByWithoutDueDateEventListener(handler) {
        const withoutDueDate = document.querySelector('#filterDropdown + .dropdown-menu > .dropdown-item:nth-of-type(12)');
        withoutDueDate.addEventListener('click', handler);
    }

    bindSortByTitleAscEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:first-of-type');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByTitleDescEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(2)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByPriorityAscEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(3)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByPriorityDescEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(4)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByStatusAscEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(5)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByStatusDescEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(6)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByDueDateAscEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(7)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByDueDateDescEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(8)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByDateAddedAscEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(9)');
        sortCriteria.addEventListener('click', handler);
    }

    bindSortByDateAddedDescEventListener(handler) {
        const sortCriteria = document.querySelector('#sortDropdown + .dropdown-menu > .dropdown-item:nth-of-type(10)');
        sortCriteria.addEventListener('click', handler);
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

    bindEditProjectBtnEventListener(handler) {
        document.querySelector('body').addEventListener('click', event => {
            if (event.target.id === 'edit-project-btn') {
                const projectID = event.target.getAttribute('data-id');
                handler(projectID);
            }
        });
    }

    showEditProjectModal(project) {
        // Fill in the fields
        const title = document.getElementById('edit-proj-title');
        title.value = project.title;

        const dueDate = document.getElementById('edit-proj-dueDate');
        dueDate.value = format(project.dueDate, 'yyyy-MM-dd');

        const description = document.getElementById('edit-proj-description');
        description.value = project.description;

        const notes = document.getElementById('edit-proj-nts');
        notes.value = project.notes;

        const noPriorityRadioBtn = document.getElementById('edit-proj-no-priority');
        const mdPriorityRadioBtn = document.getElementById('edit-proj-medium-priority');
        const hiPriorityRadioBtn = document.getElementById('edit-proj-hi-priority');

        if (project.priority === 'Medium') {
            mdPriorityRadioBtn.checked = true;
        } else if (project.priority === 'High') {
            hiPriorityRadioBtn.checked = true;
        } else {
            noPriorityRadioBtn.checked = true;
        }

        const notYetStarted = document.getElementById('edit-proj-not-yet-started');
        const inProgress = document.getElementById('edit-proj-in-progress');
        const completed = document.getElementById('edit-proj-completed');

        if (project.status === 'In Progress') {
            inProgress.checked = true;
        } else if (project.status === 'Completed') {
            completed.checked = true;
        } else if (project.status === 'None') {
            notYetStarted.checked = true;
        }

        const addTodoBtnDiv = document.getElementById('edit-proj-addTodo').parentNode;
        let todo;

        if (project.todos !== undefined) {
            for (let i = 0; i < project.todos.length; i++) {
                todo = this.makeEditProjTodoInputField(project.todos[i]);
                addTodoBtnDiv.parentNode.insertBefore(todo, addTodoBtnDiv);
            }
        }

        const delBtn = document.getElementById('alert-del-btn');
        const saveBtn = document.getElementById('edit-proj-save-btn');
        delBtn.setAttribute('data-id', project.id);
        saveBtn.setAttribute('data-id', project.id);

        // Show the modal
        const editForm = document.getElementById('edit-project-modal');
        const modal = new bootstrap.Modal(editForm);
        modal.show();
    }

    makeEditProjTodoInputField(todo) {
        const todoInputContainer = document.createElement('div');
        todoInputContainer.classList.add('input-group');
        todoInputContainer.classList.add('mb-3');

        const todoInputField = document.createElement('input');
        todoInputField.setAttribute('type', 'text');
        todoInputField.classList.add('form-control');
        todoInputField.value = todo.title;
        todoInputContainer.appendChild(todoInputField);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('input-group-append');
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('type', 'button');
        removeBtn.setAttribute('data-id', todo.id);
        removeBtn.classList.add('btn');
        removeBtn.classList.add('btn-danger');
        removeBtn.textContent = 'Remove';
        //removeBtn.addEventListener('click', this.removeTodoInputField);
        buttonDiv.appendChild(removeBtn);
        todoInputContainer.appendChild(buttonDiv);

        return todoInputContainer;
    }

    bindCloseBtnEventListenersInEditProjectModal() {
        const xBtn = document.getElementById('edit-x-btn');
        const closeBtn = document.getElementById('edit-proj-close-btn');
        const editProjectForm = document.getElementById('editProjectForm');
        xBtn.addEventListener('click', event => {
            editProjectForm.reset();
            this.clearTodoInputFieldsInEditProjectModal()
            this.clearWarningsInEditProjectModal();
        });
        closeBtn.addEventListener('click', event => {
            editProjectForm.reset();
            this.clearTodoInputFieldsInEditProjectModal()
            this.clearWarningsInEditProjectModal();
        });
    }

    clearTodoInputFieldsInEditProjectModal() {
        const addTodoBtnDiv = document.getElementById('edit-proj-addTodo').parentNode;
        const parent = addTodoBtnDiv.parentNode;
        const todosLabelDiv = document.getElementById('edit-proj-todo-field');
        while (todosLabelDiv.nextElementSibling !== addTodoBtnDiv) {
            parent.removeChild(todosLabelDiv.nextElementSibling);
        }
    }

    clearWarningsInEditProjectModal() {
        const titleLabel = document.getElementById('editProjRequireTitle');
        const dueDateLabel = document.getElementById('editProjRequireDueDate');
        const todosLabel = document.getElementById('edit-proj-todos-label');
        titleLabel.textContent = '';
        dueDateLabel.textContent = '';
        todosLabel.textContent = '';
    }

    bindDeleteBtnEventListenerInEditProjectModal() {
        const delBtn = document.getElementById('edit-proj-del-btn');
        delBtn.addEventListener('click', event => {
            //const id = event.target.getAttribute('data-id');
            //handler(id);
            const alert = document.querySelector('#DeleteAlertModal .modal-body');
            alert.textContent = 'Are you sure you want to delete this project?'
            const editProjectForm = document.getElementById('editProjectForm');
            editProjectForm.reset();
            this.clearTodoInputFieldsInEditProjectModal()
            this.clearWarningsInEditProjectModal();
            //const form = document.getElementById('edit-project-modal');
            //const modal = bootstrap.Modal.getInstance(form);
            //modal.hide();
        });
    }

    bindFinalDeleteBtnEventListener(handler) {
        const delBtn = document.getElementById('alert-del-btn');
        delBtn.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            handler(id);
        });
    }

    bindEditTodoBtnEventListener(handler) {
        document.querySelector('body').addEventListener('click', event => {
            if (event.target.classList.contains('bi-pencil-square')) {
                if (event.target.id !== 'edit-project-btn') {
                    const todoID = event.target.getAttribute('data-id');
                    handler(todoID);
                }
            }
        });
    }

    showEditTodoModal(todo) {
        // Show the modal
        const editForm = document.getElementById('edit-todo-modal');
        const modal = new bootstrap.Modal(editForm);
        modal.show();
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

    bindCheckCircleEventListeners(handler) {
        document.querySelector('body').addEventListener('click', event => {
            if (event.target.classList.contains('bi-circle') || event.target.classList.contains('bi-check-circle-fill')) {
                const id = event.target.getAttribute('data-id');
                handler(id, event);
            }
        });
    }

    toggleCheckCircle(e) {
        e.target.classList.toggle('bi-circle');
        e.target.classList.toggle('bi-check-circle-fill');
        e.target.classList.toggle('text-success');
    }

    // Display the pages and their elements

    displayProjectsHeader() {
        const header = document.querySelector('.navbar > h2');
        header.textContent = 'Projects';
    }

    displayItems(items, isProjectsPage, isTrashPage, sortOrder) {
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
            let accordionItem = this.displayItem(items[i], isProjectsPage, isTrashPage, sortOrder);
            accordion.appendChild(accordionItem);
        }
        content.appendChild(accordion);
    }

    displayItem(item, isProjectsPage, isTrashPage, sortOrder) {
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

        if (item.status === 'Completed') {
            checkCircle.classList.add('bi-check-circle-fill');
            checkCircle.classList.add('text-success');
        } else {
            checkCircle.classList.add('bi-circle');
        }

        checkCircle.classList.add('small');
        checkCircle.setAttribute('data-id', item.id);
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
            const sortedTodos = item.sortInDefaultOrder(item.todos, sortOrder);
            let task;
            for (let i = 0; i < sortedTodos.length; i++) {
                task = this.displayTodo(sortedTodos[i], isProjectsPage);
                accordionBody.appendChild(task);

                if (sortedTodos[i].todos !== undefined) {
                    const sortedSubTodos = sortedTodos[i].sortInDefaultOrder(sortedTodos[i].todos, sortOrder);
                    for (let j = 0; j < sortedSubTodos.length; j++) {
                        task = this.displayTodo(sortedSubTodos[j], isProjectsPage);
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
            arrow.setAttribute('data-id', item.id);
            link.appendChild(arrow);
        } else {
            const editIcon = document.createElement('i');
            editIcon.classList.add('bi');
            editIcon.classList.add('bi-pencil-square');
            editIcon.classList.add('todo-icon');
            editIcon.setAttribute('data-id', item.id);
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

        if (todo.status === 'Completed') {
            icon.classList.add('bi-check-circle-fill');
            icon.classList.add('text-success');
        } else {
            icon.classList.add('bi-circle');
        }

        icon.classList.add('todo-circle');
        icon.setAttribute('data-id', todo.id);
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
        editIcon.setAttribute('id', 'edit-project-btn');
        editIcon.setAttribute('data-id', project.id);
        //editIcon.setAttribute('data-bs-toggle', 'modal');
        //editIcon.setAttribute('data-bs-target', '#edit-project-modal');
        flexContainer.appendChild(editIcon);
        content.appendChild(flexContainer);

        let divider = this.makeDivider();
        content.appendChild(divider);
    }

    displayTrashPage(removedItems, isTrashPage, sortOrder) {
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
                this.displayItems(removedProjects, true, isTrashPage, sortOrder);
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

                this.displayItems(removedTodos, false, isTrashPage, sortOrder);
            }
        }
    }

    makeDate(dueDate) {
        const date = document.createElement('span');
        date.classList.add('text-muted');
        date.classList.add('due-date');

        if (dueDate !== '') {
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

    clearTodosPageContent() {
        const content = document.getElementById('content');
        while (content.childNodes[2]) {
            content.removeChild(content.childNodes[2]);
       }
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}

export { View as default };