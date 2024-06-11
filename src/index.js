import './styles/style.css';
import UIHandler from './display/UIHandler';
import {
	createTodoModal,
	createProjectModal,
	showModal,
	setupModalHandlers,
	setupProjectModalHandlers,
} from './display/modalHandler';
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

	const uiHandler = new UIHandler(mainContainer);

	// Create the modals for adding a new todo item and project
	createTodoModal();
	createProjectModal();

	// Create some default todo items in the default project
	const defaultProject = dataHandler.getDefaultProject();

	// Render the default project's todos initially when the page loads
	uiHandler.renderTodos(defaultProject);

	// Set up event listeners
	todoBtn.addEventListener('click', () =>
		uiHandler.renderTodos(uiHandler.getCurrentProject())
	);
	projectsBtn.addEventListener('click', () => uiHandler.renderProjects());

	// Set up modal handlers with current project context
	setupModalHandlers(uiHandler);
	setupProjectModalHandlers(uiHandler);

	// Event listener for main container clicks
	mainContainer.addEventListener('click', (event) => {
		const { id, classList } = event.target;

		if (id === 'add-todo-button') {
			showModal('modal-overlay');
		} else if (id === 'add-project-button') {
			showModal('project-modal-overlay');
		}
	});
});
