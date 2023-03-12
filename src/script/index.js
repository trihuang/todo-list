import { compareAsc, parseISO, format } from 'date-fns';
import Project from './model/project';
import Todo from './model/todo';
import Model from './model/model';
import View from './view/view';
import Controller from './controller/controller';

//console.log(new Date());
//console.log(format(new Date(), 'yyyy-MM-dd'));

//console.log(format(new Date(2014, 1, 11), 'MMM d'));

//const model = new Model();
//console.log(model.projects);

const app = new Controller(new Model(), new View());

// Some tests

const todo1 = new Todo('Todo 1', 'this is the first todo', undefined, 'Medium', 'None', 'blabla', undefined);
const subTodo1 = new Todo('Sub Todo 1', 'add this todo', undefined, 'None', 'None', '', undefined);
const subSubTodo = new Todo('Sub sub todo', 'try adding this todo', undefined, 'None', 'None', '', undefined);
const proj = new Project('Project 1', 'boo', new Date(), 'High', 'In Progress', 'bar', undefined);
todo1.todos = [subTodo1, subSubTodo];

proj.todos = [todo1];

console.log(todo1.id);
console.log(todo1.projectParent);

console.log(subTodo1.projectParent);
console.log(subTodo1.todoParent);
console.log(subSubTodo.projectParent);
console.log(subSubTodo.todoParent);
