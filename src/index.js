import './styles/style.css';
import { renderTodos, renderProjects } from './display/displayHandler';
import dataHandler from './data/dataHandler';

if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
} else {
	console.log('Looks like we are in production mode!');
}

document.addEventListener('DOMContentLoaded', () => {
	const todoBtn = document.querySelector('#todo-button');
	const projectsBtn = document.querySelector('#projects-button');
	const mainContainer = document.querySelector('main');

	// for testing purposes
	generateData();

	todoBtn.addEventListener('click', () => renderTodos(mainContainer));
	projectsBtn.addEventListener('click', () => renderProjects(mainContainer));
});

// for testing purposes
function generateData() {
	// Create two generic TodoItems
	dataHandler.createTodoItem(
		'Generic Todo 1',
		'Description for Todo 1',
		'2024-12-31',
		'High'
	);

	dataHandler.createTodoItem(
		'Generic Todo 2',
		'Description for Todo 2',
		'2024-11-30',
		'Medium'
	);

	// Create a generic Project with three TodoItems
	const project = dataHandler.createProject('Generic Project');
	const projectTodo1 = dataHandler.createTodoItem(
		'Project Todo 1',
		'Description for Project Todo 1',
		'2024-12-01',
		'Low'
	);

	const projectTodo2 = dataHandler.createTodoItem(
		'Project Todo 2',
		'Description for Project Todo 2',
		'2024-12-02',
		'Medium'
	);

	const projectTodo3 = dataHandler.createTodoItem(
		'Project Todo 3',
		'Description for Project Todo 3',
		'2024-12-03',
		'High'
	);

	dataHandler.addTodoItemToProject(project.title, projectTodo1);
	dataHandler.addTodoItemToProject(project.title, projectTodo2);
	dataHandler.addTodoItemToProject(project.title, projectTodo3);
}
