(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function o(o){t(1,arguments);var s=Object.prototype.toString.call(o);return o instanceof Date||"object"===e(o)&&"[object Date]"===s?new Date(o.getTime()):"number"==typeof o||"[object Number]"===s?new Date(o):("string"!=typeof o&&"[object String]"!==s||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}class s{constructor(t,e,o,s,i,r,n){this.title=t,this.id=crypto.randomUUID(),this.description=e,this.dueDate=o,this.priority=s,this.status=i,this.notes=r,this.todos=n,this.dateAdded=new Date}get title(){return this._title}get id(){return this._id}get description(){return this._description}get dueDate(){return this._dueDate}get priority(){return this._priority}get status(){return this._status}get notes(){return this._notes}get todos(){return this._todos}get dateAdded(){return this._dateAdded}set title(t){""===(t=t.trim())&&alert("Please enter a title."),this._title=t}set id(t){this._id=t}set description(t){this._description=t}set dueDate(t){void 0===t&&alert("Please enter a due date."),this._dueDate=t}set priority(t){this._priority=t}set status(e){this._status=e,"Completed"===this._status&&"Completed"===e||-1===function(e,s){t(2,arguments);var i=o(e),r=o(s),n=i.getTime()-r.getTime();return n<0?-1:n>0?1:n}(this._dueDate,new Date)&&(this._status="Overdue")}set notes(t){this._notes=t}set todos(t){if(void 0===t)this._todos=t;else{for(let e=0;e<t.length;e++)if(t[e].projectParent=this._id,void 0!==t[e].todos)for(let o=0;o<t[e].todos.length;o++)t[e].todos[o].projectParent=this._id;this._todos=t}}set dateAdded(t){this._dateAdded=t}addTodo(t){let e;void 0===this._todos?(e=[],t.projectParent=this._id,t.updateTodosParents(t.todos),e.push(t),this._todos=e):(t.projectParent=this._id,t.updateTodosParents(t.todos),this._todos.push(t))}removeTodo(t){const e=this._todos.indexOf(t);this._todos.splice(e,1)}}class i extends s{constructor(t,e,o,s,i,r,n){super(t,e,o,s,i,r,n),this.projectParent=void 0,this.todoParent=void 0}get todos(){return this._todos}get dateAdded(){return this._dateAdded}get projectParent(){return this._projectParent}get todoParent(){return this._todoParent}set dueDate(t){this._dueDate=t}set todos(t){void 0===this._todoParent&&(this.updateTodosParents(t),this._todos=t)}set dateAdded(t){this._dateAdded=t}set projectParent(t){this._projectParent=t}set todoParent(t){this._todoParent=t}addTodo(t){if(void 0===this._todoParent){let e;void 0===this._todos?(e=[],t.projectParent=this._projectParent,t.todoParent=this._id,this.updateTodosParents(t.todos),e.push(t),this._todos=e):(t.projectParent=this._projectParent,t.todoParent=this._id,this.updateTodosParents(t.todos),this._todos.push(t))}}updateTodosParents(t){if(void 0!==t)for(let e=0;e<t.length;e++)t[e].todoParent=this._id,t[e].projectParent=this._projectParent}}new class{constructor(t,e){this.model=t,this.view=e,this.initializeProjectsPage(this.model.projects),this.handleLogoEventListener(),this.handleSearchBarEventListeners(),console.log(this.model.projects)}initializeProjectsPage(t){this.view.displayProjects(t)}handleLogoEventListener(){this.view.bindLogoEventListener(this.model.projects)}handleSearchBarEventListeners(){this.view.bindSearchBarEventListeners(this.handleSearch)}handleSearch=t=>{this.model.search(t)};handleCreateProjectBtn(){this.view.bindCreateProjectBtnEventListener(this.handleCreateProject)}handleCreateProject=()=>{this.model.createProject()}}(new class{constructor(){const t=new i("Take out the garbage","",void 0,"None","None","",void 0),e=new i("Wash the dishes","",void 0,"None","None","",void 0),o=new i("Walk the dog","",void 0,"None","None","",void 0),r=new s("Chores","Things that need to be done around the house.",new Date,"High","In Progress","Do not leave them until tomorrow!",[t,e,o]),n=new s("Write a Letter","Grandma is waiting for a reply.",new Date(2023,2,8),"None","None","",void 0),d=new i("Submit report","",new Date(2023,2,10),"None","None","",void 0),a=new i("Meeting with boss","",new Date(2023,2,15),"High","None","This is a very important meeting!",void 0),h=new i("Gather data","",new Date(2023,2,13),"Medium","In Progress","Need more information.",void 0),l=new i("Create slides","",void 0,"None","None","",void 0),c=new i("Prepare presentation","",void 0,"None","In Progress","",[h,l]),p=new i("Meeting with clients","Product showcase.",new Date(2023,2,20),"None","None","",void 0),u=new s("Work","Some things to take care of.",new Date(2023,2,20),"Medium","None","",[d,a,c,p]),y=new s("Photography","Going on a trip to the national park to take photos!",new Date(2023,3,15),"None","None","",void 0);this.projects=[r,n,u,y],this.projectsOnDisplay=[],this.todosOnDisplay=[],this.deletedProjects=[]}get projects(){return this._projects}get projectsOnDisplay(){return this._projectsOnDisplay}get todosOnDisplay(){return this._todosOnDisplay}get deletedProjects(){return this._deletedProjects}set projects(t){return this._projects=t}set projectsOnDisplay(t){return this._projectsOnDisplay=t}set todosOnDisplay(t){return this._todosOnDisplay=t}set deletedProjects(t){return this._deletedProjects=t}createProject(){}addProject(t){this._projects.push(t)}removeProject(t){const e=this._projects.indexOf(t);this._projects.splice(e,1)}filterByToday(){}filterByThisWeek(){}filterByThisMonth(){}filterByOverdue(){}filterByPriority(t,e){}filterProjectsByPriority(t,e){this.filterByPriority(t,e)}filterTodosByPriority(t,e){this.filterByPriority(t,e)}filterByStatus(t,e){}filterProjectsByStatus(t,e){this.filterByStatus(t,e)}filterTodosByStatus(t,e){this.filterByStatus(t,e)}filterByTitle(t){console.log(`filter titles with ${t}`)}filterByDescription(t){console.log(`filter description with ${t}`)}filterByNotes(t){console.log(`filter notes with ${t}`)}filterByDate(t){console.log(`filter dates with ${t}`)}search(t){void 0!==t&&(console.log(t),this.filterByTitle(t),this.filterByDescription(t),this.filterByNotes(t),this.filterByDate(t))}sortByPriorityAsc(){}sortByPriorityDesc(){}sortByDueDateAsc(){}sortByDueDateDesc(){}sortByTitleAsc(){}sortByTitleDesc(){}sortByDateAddedAsc(){}sortByDateAddedDesc(){}recoverfromTrash(){}deletefromTrash(){}},new class{constructor(){this.addSideBarEventListeners(),this.displayProjectsHeader()}bindLogoEventListener(t){document.querySelector(".navbar-brand").addEventListener("click",(e=>{this.displayProjectsHeader(),this.displayProjects(t)}))}bindSearchBarEventListeners(t){const e=document.querySelector(".form-inline .btn"),o=document.querySelector(".form-inline .form-control");e.addEventListener("click",(e=>{let s=o.value.trim();""!==s&&null!==s&&t(s)})),o.addEventListener("search",(e=>{let s=o.value.trim();""!==s&&null!==s&&t(s)}))}bindCreateProjectBtnEventListener(t){}toggleNotificationBadge(){}bindNotificationsEventListeners(t){}addSideBarEventListeners(){}addSortCriteriaEventListeners(){}addFilterCriteriaEventListeners(){}addProjectEventListener(){}addChecklistEventListeners(){}toggleCheckCircle(){}displayProjectsHeader(){document.querySelector(".navbar > h2").textContent="Projects"}displayProjects(t){console.log("display projects")}displayProject(t){}displayTodosHeader(){}displayTodos(t){}displayTodo(t){}displayTrashPage(){}clearContent(){}});const r=new i("Todo 1","this is the first todo",void 0,"Medium","None","blabla",void 0),n=new i("Sub Todo 1","add this todo",void 0,"None","None","",void 0),d=new i("Sub sub todo","try adding this todo",void 0,"None","None","",void 0),a=new s("Project 1","boo",new Date,"High","In Progress","bar",void 0);r.todos=[n,d],a.todos=[r],console.log(r.id),console.log(r.projectParent),console.log(n.projectParent),console.log(n.todoParent),console.log(d.projectParent),console.log(d.todoParent)})();