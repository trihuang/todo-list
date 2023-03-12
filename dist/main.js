(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function o(o){e(1,arguments);var s=Object.prototype.toString.call(o);return o instanceof Date||"object"===t(o)&&"[object Date]"===s?new Date(o.getTime()):"number"==typeof o||"[object Number]"===s?new Date(o):("string"!=typeof o&&"[object String]"!==s||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function s(t,s){e(2,arguments);var i=o(t),r=o(s),n=i.getTime()-r.getTime();return n<0?-1:n>0?1:n}class i{constructor(e,t,o,s,i,r,n){this.title=e,this.id=crypto.randomUUID(),this.description=t,this.dueDate=o,this.priority=s,this.status=i,this.notes=r,this.todos=n,this.dateAdded=new Date,this.isProject=!0}get title(){return this._title}get id(){return this._id}get description(){return this._description}get dueDate(){return this._dueDate}get priority(){return this._priority}get status(){return this._status}get notes(){return this._notes}get todos(){return this._todos}get dateAdded(){return this._dateAdded}get isProject(){return this._isProject}set title(e){""===(e=e.trim())&&alert("Please enter a title."),this._title=e}set id(e){this._id=e}set description(e){this._description=e}set dueDate(e){void 0===e&&alert("Please enter a due date."),this._dueDate=e}set priority(e){this._priority=e}set status(e){this._status=e,"Completed"===this._status&&"Completed"===e||-1===s(this._dueDate,new Date)&&(this._status="Overdue")}set notes(e){this._notes=e}set todos(e){if(void 0===e)this._todos=e;else{for(let t=0;t<e.length;t++)if(e[t].projectParent=this._id,void 0!==e[t].todos)for(let o=0;o<e[t].todos.length;o++)e[t].todos[o].projectParent=this._id;this._todos=e}}set dateAdded(e){this._dateAdded=e}set isProject(e){this._isProject=e}addTodo(e){let t;void 0===this._todos?(t=[],e.projectParent=this._id,e.updateTodosParents(e.todos),t.push(e),this._todos=t):(e.projectParent=this._id,e.updateTodosParents(e.todos),this._todos.push(e))}removeTodo(e){const t=this._todos.indexOf(e);this._todos.splice(t,1)}}class r extends i{constructor(e,t,o,s,i,r,n){super(e,t,o,s,i,r,n),this.projectParent=void 0,this.todoParent=void 0,this.isProject=!1}get todos(){return this._todos}get dueDate(){return this._dueDate}get projectParent(){return this._projectParent}get todoParent(){return this._todoParent}set dueDate(e){this._dueDate=e}set todos(e){void 0===this._todoParent&&(this.updateTodosParents(e),this._todos=e)}set projectParent(e){this._projectParent=e}set todoParent(e){this._todoParent=e}addTodo(e){if(void 0===this._todoParent){let t;void 0===this._todos?(t=[],e.projectParent=this._projectParent,e.todoParent=this._id,this.updateTodosParents(e.todos),t.push(e),this._todos=t):(e.projectParent=this._projectParent,e.todoParent=this._id,this.updateTodosParents(e.todos),this._todos.push(e))}}updateTodosParents(e){if(void 0!==e)for(let t=0;t<e.length;t++)e[t].todoParent=this._id,e[t].projectParent=this._projectParent}}function n(t){e(1,arguments);var s=o(t);return s.setHours(0,0,0,0),s}function d(t,o){e(2,arguments);var s=n(t),i=n(o);return s.getTime()===i.getTime()}var a={};function l(){return a}function h(t,s){var i,r,n,d,a,h,c,u;e(1,arguments);var f=l(),p=function(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}(null!==(i=null!==(r=null!==(n=null!==(d=null==s?void 0:s.weekStartsOn)&&void 0!==d?d:null==s||null===(a=s.locale)||void 0===a||null===(h=a.options)||void 0===h?void 0:h.weekStartsOn)&&void 0!==n?n:f.weekStartsOn)&&void 0!==r?r:null===(c=f.locale)||void 0===c||null===(u=c.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==i?i:0);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var v=o(t),g=v.getDay(),D=(g<p?7:0)+g-p;return v.setDate(v.getDate()-D),v.setHours(0,0,0,0),v}function c(t,o,s){e(2,arguments);var i=h(t,s),r=h(o,s);return i.getTime()===r.getTime()}function u(t,s){e(2,arguments);var i=o(t),r=o(s);return i.getFullYear()===r.getFullYear()&&i.getMonth()===r.getMonth()}new class{constructor(e,t){this.model=e,this.view=t,this.initializeProjectsPage(this.model.projects),this.handleLogoEventListener(),this.handleSearchBarEventListeners(),console.log(this.model.projects)}initializeProjectsPage(e){this.view.displayProjects(e)}handleLogoEventListener(){this.view.bindLogoEventListener(this.model.projects)}handleSearchBarEventListeners(){this.view.bindSearchBarEventListeners(this.handleSearch)}handleSearch=e=>{this.model.search(e)};handleCreateProjectBtn(){this.view.bindCreateProjectBtnEventListener(this.handleCreateProject)}handleCreateProject=()=>{this.model.createProject()}}(new class{constructor(){const e=new r("Take out the garbage","",void 0,"None","None","",void 0),t=new r("Wash the dishes","",void 0,"None","None","",void 0),o=new r("Walk the dog","",void 0,"None","None","",void 0),s=new i("Chores","Things that need to be done around the house.",new Date(2023,2,12),"High","In Progress","Do not leave them until tomorrow!",[e,t,o]),n=new i("Write a Letter","Grandma is waiting for a reply.",new Date(2023,2,8),"None","None","",void 0),d=new r("Submit report","",new Date(2023,2,9),"None","None","",void 0),a=new r("Meeting with boss","",new Date(2023,2,9),"High","None","This is a very important meeting!",void 0),l=new r("Gather data","",new Date(2023,2,9),"Medium","In Progress","Need more information.",void 0),h=new r("Create slides","",void 0,"None","None","",void 0),c=new r("Prepare presentation","",void 0,"None","In Progress","",[l,h]),u=new r("Meeting with clients","Product showcase.",new Date(2023,2,20),"None","None","",void 0),f=new i("Work","Some things to take care of.",new Date(2023,2,20),"Medium","None","",[d,a,c,u]),p=new i("Photography","Going on a trip to the national park to take photos!",new Date(2023,3,15),"None","None","",void 0);this.projects=[s,n,f,p],this.itemsOnDisplay=[],this.deletedItems=[],console.log(this.filterByPriority(this.projects))}get projects(){return this._projects}get itemsOnDisplay(){return this._itemsOnDisplay}get deletedItems(){return this._deletedItems}set projects(e){return this._projects=e}set itemsOnDisplay(e){return this._itemsOnDisplay=e}set deletedItems(e){return this._deletedItems=e}createProject(e,t,o,s,r,n,d){const a=new i(e,t,o,s,r,n,d);this.addProject(a)}createTodo(e,t,o,s,i,n,d,a){const l=new r(e,t,o,s,i,n,d);a.addTodo(l)}addProject(e){this._projects.push(e)}removeItem(e){e.isProject?this.removeProject(e):this.removeTodo(e),this._deletedItems.push(e)}removeProject(e){const t=this._projects.indexOf(e);this._projects.splice(t,1)}removeTodo(e){let t=this._projects.filter((t=>t.id===e.projectParent));if(t=t[0],void 0===e.todoParent)t.removeTodo(e);else{let o=t.todos.filter((t=>t.id===e.todoParent));o=o[0],o.removeTodo(e)}}filterByToday(e){const t=e.filter((e=>d(e.dueDate,new Date))),o=e.filter((e=>!d(e.dueDate,new Date))).filter((e=>void 0!==e.todos));for(let e=0;e<o.length;e++)if(o[e].todos.filter((e=>d(e.dueDate,new Date))).length>0)t.push(o[e]);else{const s=o[e].todos.filter((e=>!d(e.dueDate,new Date))).filter((e=>void 0!==e.todos));for(let i=0;i<s.length;i++)s[i].todos.filter((e=>d(e.dueDate,new Date))).length>0&&t.push(o[e])}return t}filterByThisWeek(e){const t=e.filter((e=>c(e.dueDate,new Date))),o=e.filter((e=>!c(e.dueDate,new Date))).filter((e=>void 0!==e.todos));for(let e=0;e<o.length;e++)if(o[e].todos.filter((e=>c(e.dueDate,new Date))).length>0)t.push(o[e]);else{const s=o[e].todos.filter((e=>!c(e.dueDate,new Date))).filter((e=>void 0!==e.todos));for(let i=0;i<s.length;i++)s[i].todos.filter((e=>c(e.dueDate,new Date))).length>0&&t.push(o[e])}return t}filterByThisMonth(e){const t=e.filter((e=>u(e.dueDate,new Date))),o=e.filter((e=>!u(e.dueDate,new Date))).filter((e=>void 0!==e.todos));for(let e=0;e<o.length;e++)if(o[e].todos.filter((e=>u(e.dueDate,new Date))).length>0)t.push(o[e]);else{const s=o[e].todos.filter((e=>!u(e.dueDate,new Date))).filter((e=>void 0!==e.todos));for(let i=0;i<s.length;i++)s[i].todos.filter((e=>u(e.dueDate,new Date))).length>0&&t.push(o[e])}return t}filterByOverdue(e){const t=e.filter((e=>-1===s(e.dueDate,new Date)&&!d(e.dueDate,new Date))),o=e.filter((e=>!(-1===s(e.dueDate,new Date)&&!d(e.dueDate,new Date)))).filter((e=>void 0!==e.todos));for(let e=0;e<o.length;e++)if(o[e].todos.filter((e=>-1===s(e.dueDate,new Date)&&!d(e.dueDate,new Date))).length>0)t.push(o[e]);else{const i=o[e].todos.filter((e=>!(-1===s(e.dueDate,new Date)&&!d(e.dueDate,new Date)))).filter((e=>void 0!==e.todos));for(let r=0;r<i.length;r++)i[r].todos.filter((e=>-1===s(e.dueDate,new Date)&&!d(e.dueDate,new Date))).length>0&&t.push(o[e])}return t}filterByPriority(e,t){if(void 0===t){const t=e.filter((e=>"None"!==e.priority));console.log(t)}}filterProjectsByPriority(e,t){this.filterByPriority(e,t)}filterTodosByPriority(e,t){this.filterByPriority(e,t)}filterByStatus(e,t){}filterProjectsByStatus(e,t){this.filterByStatus(e,t)}filterTodosByStatus(e,t){this.filterByStatus(e,t)}filterByTitle(e){console.log(`filter titles with ${e}`)}filterByDescription(e){console.log(`filter description with ${e}`)}filterByNotes(e){console.log(`filter notes with ${e}`)}filterByDate(e){console.log(`filter dates with ${e}`)}search(e){void 0!==e&&(console.log(e),this.filterByTitle(e),this.filterByDescription(e),this.filterByNotes(e),this.filterByDate(e))}sortByPriorityAsc(){}sortByPriorityDesc(){}sortByDueDateAsc(){}sortByDueDateDesc(){}sortByTitleAsc(){}sortByTitleDesc(){}sortByDateAddedAsc(){}sortByDateAddedDesc(){}recoverfromTrash(e){}deletefromTrash(e){const t=this._deletedItems.indexOf(e);this._deletedItems.splice(t,1)}},new class{constructor(){this.addSideBarEventListeners(),this.displayProjectsHeader()}bindLogoEventListener(e){document.querySelector(".navbar-brand").addEventListener("click",(t=>{this.displayProjectsHeader(),this.displayProjects(e)}))}bindSearchBarEventListeners(e){const t=document.querySelector(".form-inline .btn"),o=document.querySelector(".form-inline .form-control");t.addEventListener("click",(t=>{let s=o.value.trim();""!==s&&null!==s&&e(s)})),o.addEventListener("search",(t=>{let s=o.value.trim();""!==s&&null!==s&&e(s)}))}bindCreateProjectBtnEventListener(e){}toggleNotificationBadge(){}bindNotificationsEventListeners(e){}addSideBarEventListeners(){}addSortCriteriaEventListeners(){}addFilterCriteriaEventListeners(){}addProjectEventListener(){}addChecklistEventListeners(){}toggleCheckCircle(){}displayProjectsHeader(){document.querySelector(".navbar > h2").textContent="Projects"}displayProjects(e){console.log("display projects")}displayProject(e){}displayTodosHeader(){}displayTodos(e){}displayTodo(e){}displayTrashPage(){}clearContent(){}});const f=new r("Todo 1","this is the first todo",void 0,"Medium","None","blabla",void 0),p=new r("Sub Todo 1","add this todo",void 0,"None","None","",void 0),v=new r("Sub sub todo","try adding this todo",void 0,"None","None","",void 0),g=new i("Project 1","boo",new Date,"High","In Progress","bar",void 0);f.todos=[p,v],g.todos=[f]})();