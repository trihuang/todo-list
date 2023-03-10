import { compareAsc, parseISO, format } from 'date-fns';
import Project from './model/project';
import Todo from './model/todo';
import Model from './model/model';

console.log(new Date());
console.log(format(new Date(), 'yyyy-MM-dd'));

console.log(format(new Date(2014, 1, 11), 'MMM d'));

const model = new Model();
console.log(model.projects);
