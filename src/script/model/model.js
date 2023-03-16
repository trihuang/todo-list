import { isSameDay, isSameWeek, isSameMonth, compareAsc, compareDesc, format } from 'date-fns';
import Project from './project';
import Todo from './todo';

class Model {
    constructor() {
        // Initialize some projects
        const projectOneTodoOne = new Todo('Take out the garbage', '', '', 'None', 'None', '', undefined);
        const projectOneTodoTwo = new Todo('Wash the dishes', '', '', 'None', 'None', '', undefined);
        const projectOneTodoThree = new Todo('Walk the dog', '', '', 'None', 'None', '', undefined);
        const projectOneTodoFour = new Todo('Sweep the floor', '', '', 'None', 'None', '', undefined);
        const projectOneTodoFive = new Todo('Laundry', '', '', 'None', 'None', '', undefined);
        const projectOneTodoSix = new Todo('Water the plants', '', '', 'None', 'None', '', undefined);
        const projectOneTodoSeven = new Todo('Tidy up the study', '', '', 'None', 'None', '', undefined);
        const projectOne = new Project('Chores', 'Things that need to be done around the house.', new Date(), 'High', 'In Progress', 'Do not leave them until tomorrow!', [projectOneTodoOne, projectOneTodoTwo, projectOneTodoThree, projectOneTodoFour, projectOneTodoFive, projectOneTodoSix, projectOneTodoSeven]);

        const projectTwo = new Project('Write a Letter', 'Grandma is waiting for a reply.', new Date(2023, 2, 9), 'None', 'None', '', undefined);
        
        const projectThreeTodoOne = new Todo('Submit report', '', '', 'None', 'None', '', undefined);
        const projectThreeTodoTwo = new Todo('Meeting with boss', '', new Date(2023, 2, 20), 'None', 'None', 'This is a very important meeting!', undefined);
        const projectThreeTodoThreeSubOne = new Todo('Gather data', '', new Date(2023, 2, 9), 'High', 'In Progress', 'Need more information.', undefined);
        const projectThreeTodoThreeSubTwo = new Todo('Create slides', '', new Date(), 'None', 'None', '', undefined); 
        const projectThreeTodoThree = new Todo('Prepare presentation', '', '', 'None', 'In Progress', '', [projectThreeTodoThreeSubOne, projectThreeTodoThreeSubTwo]);
        const projectThreeTodoFour = new Todo('Meeting with clients', 'Product showcase.', new Date(2023, 2, 25), 'None', 'None', '', undefined);
        const projectThree = new Project('Work', 'Some things to take care of.', new Date(2023, 2, 25), 'Medium', 'None', '', [projectThreeTodoOne, projectThreeTodoTwo, projectThreeTodoThree, projectThreeTodoFour]);

        const projectFourTodoOne = new Todo('Choose camera to bring', '', new Date(2023, 2, 10), 'None', 'None', '', undefined);
        const projectFourTodoTwo = new Todo('Buy a suitcase', '', new Date(), 'High', 'None', '', undefined);
        const projectFour = new Project('Photography', 'Going on a trip to the national park to take photos!', new Date(2023, 3, 15), 'None', 'None', '', [projectFourTodoOne, projectFourTodoTwo]);

        const trashProjectTodoOne = new Todo('Buy seeds', '', '', 'None', 'None', '', undefined);
        const trashProjectOne = new Project('Gardening', 'blah blah', new Date(2023, 2, 8), 'Medium', 'Completed', '', [trashProjectTodoOne]);

        const trashProjectTwoTodoSubOne = new Todo('Take notes', '', '', 'Medium', 'None', '', undefined)
        const trashProjectTwoTodoOne = new Todo('Research topics', '', '', 'None', 'None', '', [trashProjectTwoTodoSubOne]);
        const trashProjectTwo = new Project('Write a Book', '', new Date(), 'None', 'In Progress', '', [trashProjectTwoTodoOne]);

        const trashTodoSubOne = new Todo('Time myself', '', '', 'None', 'Completed', '', undefined);
        const trashTodoOne = new Todo('Go for a run', 'Get fit.', new Date(2023, 2, 5), 'None', 'None', '', [trashTodoSubOne]);
        const trashTodoTwo = new Todo('Foster a cat', '', new Date(2023, 2, 5), 'None', 'Completed', '', undefined);

        this.projects = [projectOne, projectTwo, projectThree, projectFour];
        this.deletedItems = [trashTodoOne, trashProjectOne, trashProjectTwo, trashTodoTwo];

        this.updateOverdueStatus(this.projects);
        this.updateOverdueStatus(this.deletedItems)
    }

    get projects() {
        return this._projects;
    }

    get deletedItems() {
        return this._deletedItems;
    }

    set projects(projects) {
        this._projects = projects;
    }

    set deletedItems(items) {
        this._deletedItems = items;
    }

    createProject(title, description, dueDate, priority, status, notes, todos) {
        const project = new Project(title, description, dueDate, priority, status, notes, todos);
        this.addProject(project);
    }

    createTodo(title, description, dueDate, priority, status, notes, todos, parent) {
        const todo = new Todo(title, description, dueDate, priority, status, notes, todos);
        parent.addTodo(todo);
    }

    createTodoWithOnlyTitle(title) {
        const todo = new Todo(title, '', '', 'None', 'None', '', undefined);
        return todo;
    }

    addProject(project) {
        this._projects.push(project);
    }

    removeItem(item) {
        if (item.isProject) {
            this.removeProject(item);
        } else {
            this.removeTodo(item);
        }
        this._deletedItems.push(item);
    }

    removeProject(project) {
        const index = this._projects.indexOf(project);
        this._projects.splice(index, 1);
    }

    removeTodo(todo) {
        let parentProject = this._projects.filter((project) => project.id === todo.projectParent);
        parentProject = parentProject[0];
        const projectIndex = this._projects.indexOf(parentProject);
        if (todo.todoParent === undefined) {
            this._projects[projectIndex].removeTodo(todo);
        } else {
            let parentTodo = parentProject.todos.filter((task) => task.id === todo.todoParent);
            parentTodo = parentTodo[0];
            const todoIndex = this._projects[projectIndex].todos.indexOf(parentTodo);
            this._projects[projectIndex].todos[todoIndex].removeTodo(todo);
        }
    }

    allTodosAndSubTodosAreCompleted(project) {
        if (project.todos !== undefined) {
            for (let i = 0; i < project.todos.length; i++) {
                if (!project.todos[i].allTodosAreCompleted()) {
                    return false;
                }
            }
            return project.allTodosAreCompleted();
        }
        return true;
    }

    // Update the status to 'overdue' if the due date is past
    updateOverdueStatus(array) {
        const itemsWithDueDates = array.filter((item) => item.dueDate !== '');
        const overdue = itemsWithDueDates.filter((item) => (compareAsc(item.dueDate, new Date()) === -1) && !isSameDay(item.dueDate, new Date()));
        for (let i = 0; i < overdue.length; i++) {
            if (overdue[i].status !== 'Completed') {
                overdue[i].status = 'Overdue';
            }
        }

        const itemsWithTodos = array.filter((item) => item.todos !== undefined);
        for (let j = 0; j < itemsWithTodos.length; j++) {
            this.updateOverdueStatus(itemsWithTodos[j].todos);
        }
    }

    // Return an array of projects with due date today and projects with todos and sub todos that have due dates today
    filterByToday(array) {
        const dueToday = this.filterByTodayHelper(array);
        const remainingArray = this.filterByNotTodayWithTodosHelper(array);

        for (let i = 0; i < remainingArray.length; i++) {
            const todosDueToday = this.filterByTodayHelper(remainingArray[i].todos);
            if (todosDueToday.length > 0) {
                dueToday.push(remainingArray[i]);
            } else {
                const remainingTodosArray = this.filterByNotTodayWithTodosHelper(remainingArray[i].todos);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const subTodosDueToday = this.filterByTodayHelper(remainingTodosArray[j].todos);
                    if (subTodosDueToday.length > 0) {
                        dueToday.push(remainingArray[i]);
                    }
                }
            }
        }
        return dueToday;
    }

    filterByTodayHelper(array) {
        const dueToday = array.filter((item) => {
            if (item.dueDate === '') {
                return false;
            } else {
                return isSameDay(item.dueDate, new Date());
            }
        });
        return dueToday;
    }

    filterByNotTodayWithTodosHelper(array) {
        const remainingArray = array.filter((item) => {
            if (item.dueDate === '') {
                return true;
            } else {
                return !isSameDay(item.dueDate, new Date());
            }
        }).filter((item) => item.todos !== undefined);
        return remainingArray;
    }

    // Return an array of projects with due dates this week and projects with todos and sub todos that have due dates this week
    filterByThisWeek(array) {
        const dueThisWeek = this.filterByThisWeekHelper(array);
        const remainingArray = this.filterByNotThisWeekWithTodosHelper(array);

        for (let i = 0; i < remainingArray.length; i++) {
            const todosDueThisWeek = this.filterByThisWeekHelper(remainingArray[i].todos);
            if (todosDueThisWeek.length > 0) {
                dueThisWeek.push(remainingArray[i]);
            } else {
                const remainingTodosArray = this.filterByNotThisWeekWithTodosHelper(remainingArray[i].todos);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const subTodosDueThisWeek = this.filterByThisWeekHelper(remainingTodosArray[j].todos);
                    if (subTodosDueThisWeek.length > 0) {
                        dueThisWeek.push(remainingArray[i]);
                    }
                }
            }
        }
        return dueThisWeek;
    }

    filterByThisWeekHelper(array) {
        const dueThisWeek = array.filter((item) => {
            if (item.dueDate === '') {
                return false;
            } else {
                return isSameWeek(item.dueDate, new Date());
            }
        });
        return dueThisWeek;
    }

    filterByNotThisWeekWithTodosHelper(array) {
        const remainingArray = array.filter((item) => {
            if (item.dueDate === '') {
                return true;
            } else {
                return !isSameWeek(item.dueDate, new Date());
            }
        }).filter((item) => item.todos !== undefined);
        return remainingArray;
    }

    // Return an array of projects with due dates this month and projects with todos and sub todos that have due dates this month
    filterByThisMonth(array) {
        const dueThisMonth = this.filterByThisMonthHelper(array);
        const remainingArray = this.filterByNotThisMonthWithTodosHelper(array);

        for (let i = 0; i < remainingArray.length; i++) {
            const todosDueThisMonth = this.filterByThisMonthHelper(remainingArray[i].todos);
            if (todosDueThisMonth.length > 0) {
                dueThisMonth.push(remainingArray[i]);
            } else {
                const remainingTodosArray = this.filterByNotThisMonthWithTodosHelper(remainingArray[i].todos);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const subTodosDueThisMonth = this.filterByThisMonthHelper(remainingTodosArray[j].todos);
                    if (subTodosDueThisMonth.length > 0) {
                        dueThisMonth.push(remainingArray[i]);
                    }
                }
            }
        }
        return dueThisMonth;
    }

    filterByThisMonthHelper(array) {
        const dueThisMonth = array.filter((item) => {
            if (item.dueDate === '') {
                return false;
            } else {
                return isSameMonth(item.dueDate, new Date());
            }
        });
        return dueThisMonth;
    }

    filterByNotThisMonthWithTodosHelper(array) {
        const remainingArray = array.filter((item) => {
            if (item.dueDate === '') {
                return true;
            } else {
                return !isSameMonth(item.dueDate, new Date());
            }
        }).filter((item) => item.todos !== undefined);
        return remainingArray;
    }

    // Return an array of projects that are overdue and projects with todos and sub todos that are overdue
    filterByOverdue(array) {
        const overdue = this.filterByOverdueHelper(array);
        const remainingArray = this.filterByNotOverdueWithTodosHelper(array);

        for (let i = 0; i < remainingArray.length; i++) {
            const overdueTodos = this.filterByOverdueHelper(remainingArray[i].todos);
            if (overdueTodos.length > 0) {
                overdue.push(remainingArray[i]);
            } else {
                const remainingTodosArray = this.filterByNotOverdueWithTodosHelper(remainingArray[i].todos);
                for (let j = 0; j < remainingTodosArray.length; j++) {
                    const overdueSubTodos = this.filterByOverdueHelper(remainingTodosArray[j].todos);
                    if (overdueSubTodos.length > 0) {
                        overdue.push(remainingArray[i]);
                    }
                }
            }
        }
        return overdue;
    }

    filterByOverdueHelper(array) {
        return array.filter((item) => item.status === 'Overdue');
    }

    filterByNotOverdueWithTodosHelper(array) {
        return array.filter((item) => item.status !== 'Overdue').filter((item) => item.todos !== undefined);;
    }

    filterByPriority(array, priority) {
        if (priority === undefined) {
            // projects or todos with both priority flags
            return array.filter((item) => item.priority !== 'None');
        } else if (priority === 'Medium') {
            return array.filter((item) => item.priority === 'Medium');
        } else if (priority === 'High') {
            return array.filter((item) => item.priority === 'High');
        } else if (priority === 'None') {
            return array.filter((item) => item.priority === 'None');
        }
    }

    filterByStatus(array, status) {
        return array.filter((item) => item.status === status);
    }

    // Search for projects and todos with the search term in their titles and their sub todos' titles
    filterByTitle(array, text) {
        const searchTerm = text.toLowerCase();
        const parentArray = array.filter((item) => {
            let title = item.title;
            title = title.toLowerCase();
            return title.includes(searchTerm);
        });
        const remainingArray = array.filter((item) => {
            let title = item.title;
            title = title.toLowerCase();
            return !title.includes(searchTerm);
        }).filter((item) => item.todos !== undefined);
        
        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                let title = todo.title;
                title = title.toLowerCase();
                return title.includes(searchTerm);
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    let title = todo.title;
                    title = title.toLowerCase();
                    return !title.includes(searchTerm);
                }).filter((item) => item.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        let title = todo.title;
                        title = title.toLowerCase();
                        return title.includes(searchTerm);
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    // Search for projects and todos with the search term in their descriptions and their sub todos' descriptions
    filterByDescription(array, text) {
        const searchTerm = text.toLowerCase();
        const parentArray = array.filter((item) => {
            let description = item.description;
            description = description.toLowerCase();
            return description.includes(searchTerm);
        });
        const remainingArray = array.filter((item) => {
            let description = item.description;
            description = description.toLowerCase();
            return !description.includes(searchTerm);
        }).filter((item) => item.todos !== undefined);
        
        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                let description = todo.description;
                description = description.toLowerCase();
                return description.includes(searchTerm);
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    let description = todo.description;
                    description = description.toLowerCase();
                    return !description.includes(searchTerm);
                }).filter((item) => item.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        let description = todo.description;
                        description = description.toLowerCase();
                        return description.includes(searchTerm);
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    // Search for projects and todos with the search term in their notes and their sub todos' notes
    filterByNotes(array, text) {
        const searchTerm = text.toLowerCase();
        const parentArray = array.filter((item) => {
            let notes = item.notes;
            notes = notes.toLowerCase();
            return notes.includes(searchTerm);
        });
        const remainingArray = array.filter((item) => {
            let notes = item.notes;
            notes = notes.toLowerCase();
            return !notes.includes(searchTerm);
        }).filter((item) => item.todos !== undefined);
        
        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                let notes = todo.notes;
                notes = notes.toLowerCase();
                return notes.includes(searchTerm);
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    let notes = todo.notes;
                    notes = notes.toLowerCase();
                    return !notes.includes(searchTerm);
                }).filter((item) => item.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        let notes = todo.notes;
                        notes = notes.toLowerCase();
                        return notes.includes(searchTerm);
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    // Search for projects and todos with the specified date in their due date and their sub todos' due date
    filterByDate(array, date) {
        const searchDate = date.toLowerCase();
        const parentArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return format(item.dueDate, 'MMM d').toLowerCase() === searchDate || format(item.dueDate, 'MMMM d').toLowerCase() === searchDate;
            }
        });
        const remainingArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return !(format(item.dueDate, 'MMM d').toLowerCase() === searchDate || format(item.dueDate, 'MMMM d').toLowerCase() === searchDate);
            } else {
                return true;
            }
        }).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                if (todo.dueDate !== '') {
                    return format(todo.dueDate, 'MMM d').toLowerCase() === searchDate || format(todo.dueDate, 'MMMM d').toLowerCase() === searchDate;
                }
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    if (todo.dueDate !== '') {
                        return !(format(todo.dueDate, 'MMM d').toLowerCase() === searchDate || format(todo.dueDate, 'MMMM d').toLowerCase() === searchDate);
                    } else {
                        return true;
                    }
                }).filter((todo) => todo.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        if (todo.dueDate !== '') {
                            return format(todo.dueDate, 'MMM d').toLowerCase() === searchDate || format(todo.dueDate, 'MMMM d').toLowerCase() === searchDate;
                        }
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    filterByYear(array, year) {
        const parentArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return format(item.dueDate, 'yyyy').includes(year);
            }
        });
        const remainingArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return !(format(item.dueDate, 'yyyy').includes(year));
            } else {
                return true;
            }
        }).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                if (todo.dueDate !== '') {
                    return format(todo.dueDate, 'yyyy').includes(year);
                }
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    if (todo.dueDate !== '') {
                        return !(format(todo.dueDate, 'yyyy').includes(year));
                    } else {
                        return true;
                    }
                }).filter((todo) => todo.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        if (todo.dueDate !== '') {
                            return format(todo.dueDate, 'yyyy').includes(year);
                        }
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    filterByMonth(array, month) {
        const searchMonth = month.toLowerCase();
        const parentArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return format(item.dueDate, 'MMMM').toLowerCase().includes(searchMonth);
            }
        });
        const remainingArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return !(format(item.dueDate, 'MMMM').toLowerCase().includes(searchMonth));
            } else {
                return true;
            }
        }).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                if (todo.dueDate !== '') {
                    return format(todo.dueDate, 'MMMM').toLowerCase().includes(searchMonth);
                }
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    if (todo.dueDate !== '') {
                        return !(format(todo.dueDate, 'MMMM').toLowerCase().includes(searchMonth));
                    } else {
                        return true;
                    }
                }).filter((todo) => todo.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        if (todo.dueDate !== '') {
                            return format(todo.dueDate, 'MMMM').toLowerCase().includes(searchMonth);
                        }
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    filterByDay(array, day) {
        const parentArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return format(item.dueDate, 'd') === day;
            }
        });
        const remainingArray = array.filter((item) => {
            if (item.dueDate !== '') {
                return format(item.dueDate, 'd') !== day;
            } else {
                return true;
            }
        }).filter((item) => item.todos !== undefined);

        for (let i = 0; i < remainingArray.length; i++) {
            const todos = remainingArray[i].todos.filter((todo) => {
                if (todo.dueDate !== '') {
                    return format(todo.dueDate, 'd') === day;
                }
            });
            if (todos.length > 0) {
                parentArray.push(remainingArray[i]);
            } else {
                const remainingTodos = remainingArray[i].todos.filter((todo) => {
                    if (todo.dueDate !== '') {
                        return format(todo.dueDate, 'd') !== day;
                    } else {
                        return true;
                    }
                }).filter((todo) => todo.todos !== undefined);

                for (let j = 0; j < remainingTodos.length; j++) {
                    const subTodos = remainingTodos[j].todos.filter((todo) => {
                        if (todo.dueDate !== '') {
                            return format(todo.dueDate, 'd') === day;
                        }
                    });
                    if (subTodos.length > 0) {
                        parentArray.push(remainingArray[i]);
                    }
                }
            }
        }
        return parentArray;
    }

    search(array, text) {
        let filteredProjects = [];
        if (text === undefined) return;
        const titleArray = this.filterByTitle(array, text);
        const descriptionArray = this.filterByDescription(array, text);
        const notesArray = this.filterByNotes(array, text);
        const dateArray = this.filterByDate(array, text);
        const yearArray = this.filterByYear(array, text);
        const monthArray = this.filterByMonth(array, text);
        const dayArray = this.filterByDay(array, text);
        filteredProjects = filteredProjects.concat(titleArray);
        filteredProjects = filteredProjects.concat(descriptionArray);
        filteredProjects = filteredProjects.concat(notesArray);
        filteredProjects = filteredProjects.concat(dateArray);
        filteredProjects = filteredProjects.concat(yearArray);
        filteredProjects = filteredProjects.concat(monthArray);
        filteredProjects = filteredProjects.concat(dayArray);
        const filteredSet = [...new Set(filteredProjects.flat())];
        return filteredSet;
    }

    filterByWithDueDate(array) {
        return array.filter((item) => item.dueDate !== '');
    }

    filterByWithoutDueDate(array) {
        return array.filter((item) => item.dueDate === '');
    }

    findById(array, id) {
        const target = this.filterById(array, id);
        if (target.length === 0) {
            const remainingArraytWithTodos = this.filterByWithTodos(array); 
            let i = 0;
            while (target.length === 0 && i < remainingArraytWithTodos.length) {
                const todoTarget = this.findById(remainingArraytWithTodos[i].todos, id);
                if (todoTarget.length !== 0) {
                    target.push(todoTarget[0]);
                }
                i++;
            }
        }
        return target;
    }

    filterById(array, id) {
        return array.filter((item) => item.id === id);
    }

    filterByWithTodos(array) {
        return array.filter((item) => item.todos !== undefined);
    }

    sortByTitleAsc(array) {
        return array.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return titleA.localeCompare(titleB);
        });
    }

    sortByTitleDesc(array) {
        return array.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return titleB.localeCompare(titleA);
        });
    }

    sortByDueDateAsc(array) {
        return array.sort((a, b) => {
            if (a.dueDate === '' && b.dueDate === '') {
                return 0;
            } else if (a.dueDate === '') {
                return -1;
            } else if (b.dueDate === '') {
                return 1;
            } else {
                return compareAsc(a.dueDate, b.dueDate);
            }
        });
    }

    sortByDueDateDesc(array) {
        return array.sort((a, b) => {
            if (a.dueDate === '' && b.dueDate === '') {
                return 0;
            } else if (b.dueDate === '') {
                return -1;
            } else if (a.dueDate === '') {
                return 1;
            } else {
                return compareDesc(a.dueDate, b.dueDate);
            }
        });
    }

    sortByPriorityAsc(array) {
        return array.sort((a, b) => a.convertPriority() > b.convertPriority() ? 1 : 
                                    a.convertPriority() < b.convertPriority() ? -1 : 0);
    }

    sortByPriorityDesc(array) {
        return array.sort((a, b) => a.convertPriority() > b.convertPriority() ? -1 : 
                                    a.convertPriority() < b.convertPriority() ? 1 : 0);
    }

    sortByStatusAsc(array) {
        return array.sort((a, b) => a.convertStatus() > b.convertStatus() ? 1 :
                                    a.convertStatus() < b.convertStatus() ? -1 : 0);
    }

    sortByStatusDesc(array) {
        return array.sort((a, b) => a.convertStatus() > b.convertStatus() ? -1 :
                                    a.convertStatus() < b.convertStatus() ? 1 : 0);
    }

    sortByDateAddedAsc(array) {
        return array.sort((a, b) => compareAsc(a.dateAdded, b.dateAdded));
    }

    sortByDateAddedDesc(array) {
        return array.sort((a, b) => compareDesc(a.dateAdded, b.dateAdded));
    }

    recoverfromTrash(item) {
        if (item.isProject) {
            this.addProject(item);
        } else {
            let parentProject = this._projects.filter((project) => project.id === item.projectParent);
            parentProject = parentProject[0];
            if (item.todoParent === undefined) {
                parentProject.addTodo(item);
            } else {
                let parentTodo = parentProject.todos.filter((todo) => todo.id === item.todoParent);
                parentTodo = parentTodo[0];
                parentTodo.addTodo(item);
            }
        }
        const index = this._deletedItems.indexOf(item);
        this._deletedItems.splice(index, 1);
    }

    deletefromTrash(item) {
        const index = this._deletedItems.indexOf(item);
        this._deletedItems.splice(index, 1);
    }
}

export { Model as default };