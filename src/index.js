import './styles/style.css';
import { renderTodos, renderProjects } from './display/displayHandler';
import dataHandler from './data/dataHandler';
import {
	createTodoModal,
	showModal,
	setupModalHandlers,
} from './display/modalHandler';

if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
} else {
	console.log('Looks like we are in production mode!');
}

document.addEventListener('DOMContentLoaded', () => {
	const todoBtn = document.querySelector('#todo-button');
	const projectsBtn = document.querySelector('#projects-button');
	const mainContainer = document.querySelector('main');

	// Create the modal for adding a new todo item
	createTodoModal();

	// Create some default todo items in the default project
	const defaultProject = dataHandler.getDefaultProject();

	// Variable to track the current project
	let currentProject = defaultProject;

	// Render the default project's todos initially when the page loads
	renderTodos(mainContainer, defaultProject);

	// Set up event listeners
	todoBtn.addEventListener('click', () =>
		renderTodos(mainContainer, currentProject)
	);
	projectsBtn.addEventListener('click', () => renderProjects(mainContainer));

	// Set up modal handlers with current project context
	setupModalHandlers(currentProject, renderTodos, mainContainer);

	// Event listener for main container clicks
	mainContainer.addEventListener('click', (event) => {
		const { id, classList } = event.target;

		if (id === 'add-todo-button') {
			showModal();
		} else if (id === 'add-project-button') {
			handleAddNewProject();
		} else if (classList.contains('project-card')) {
			const projectTitle = event.target.querySelector('h3').textContent;
			currentProject = dataHandler
				.getProjects()
				.find((project) => project.title === projectTitle);
			renderTodos(mainContainer, currentProject);
		}
	});
});

// Function to handle adding a new project
function handleAddNewProject() {
	alert('You are about to create a new project');
	// Future logic for adding a new project will go here
}

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

	dataHandler.createTodoItem(
		'Generic Todo 3',
		'Description for Todo 3',
		'2024-11-30',
		'Medium'
	);

	// Create a generic Project with three TodoItems
	const project1 = dataHandler.createProject('Generic Project1');
	const project2 = dataHandler.createProject('Generic Project2');
	const project3 = dataHandler.createProject('Generic Project3');

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

	dataHandler.addTodoItemToProject(project1.title, projectTodo1);
	dataHandler.addTodoItemToProject(project1.title, projectTodo2);
	dataHandler.addTodoItemToProject(project1.title, projectTodo3);

	dataHandler.addTodoItemToProject(project2.title, projectTodo1);
	dataHandler.addTodoItemToProject(project2.title, projectTodo2);
	dataHandler.addTodoItemToProject(project2.title, projectTodo3);

	dataHandler.addTodoItemToProject(project3.title, projectTodo1);
	dataHandler.addTodoItemToProject(project3.title, projectTodo2);
	dataHandler.addTodoItemToProject(project3.title, projectTodo3);
}
