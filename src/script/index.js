import { compareAsc, parseISO, format } from 'date-fns';
import Project from './model/project';
import Todo from './model/todo';

console.log(new Date());
console.log(format(new Date(), 'yyyy-MM-dd'));

const proj = new Project('title', 'boo', '123', 'none', 'not yet started', '', []);
console.log(proj.title);
proj.title = 'whale';
console.log(proj.title);

const todo = new Todo('foo', 'bar', '12', 'none', 'in progress', '', [], undefined, undefined);
const todo2 = new Todo('boo', 'fs', '3', 'none', 'completed', '', [], undefined, undefined);
proj.addTodo(todo);
proj.addTodo(todo2);
console.log(proj.todos);

proj.removeTodo(todo);
console.log(proj.todos);

console.log(proj.dateAdded);
console.log(todo.dateAdded);

console.log(parseISO(proj.dateAdded));
