import Model from './model/model';
import View from './view/view';
import Controller from './controller/controller';

const app = new Controller(new Model(), new View());