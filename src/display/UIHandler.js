import dataHandler from '../data/dataHandler';
import { showModal } from './modalHandler';

class UIHandler {
	constructor(mainContainer) {
		this.mainContainer = mainContainer;
		this.currentProject = dataHandler.getDefaultProject();
	}

	renderTodos(project) {
		this.mainContainer.innerHTML = '';

		// Create a div for the "Add New Todo Item" button
		const buttonDiv = document.createElement('div');
		buttonDiv.className = 'button-container';
		const addButton = document.createElement('button');
		addButton.textContent = 'Add New Todo Item';
		addButton.id = 'add-todo-button';
		buttonDiv.appendChild(addButton);

		// Create a div to contain the project name
		const projectNameDiv = document.createElement('div');
		projectNameDiv.className = 'project-name';
		projectNameDiv.textContent = `Project: ${project.title}`;

		// Create a div to contain the todo items
		const todoContainer = document.createElement('div');
		todoContainer.className = 'todo-container';

		// Get todo items for the current project and append them to the todoContainer
		const todos = project.getTodoItems();
		todos.forEach((todo) => {
			const todoElement = document.createElement('div');
			todoElement.className = 'card';
			todoElement.innerHTML = `
            <div class="card-header">
                <h3>${todo.title}</h3>
                <button class="delete-button">&times;</button>
            </div>
            <p>${todo.description}</p>
            <label>
                Priority:
                <select>
                    <option value="Low" ${
											todo.priority === 'Low' ? 'selected' : ''
										}>Low</option>
                    <option value="Medium" ${
											todo.priority === 'Medium' ? 'selected' : ''
										}>Medium</option>
                    <option value="High" ${
											todo.priority === 'High' ? 'selected' : ''
										}>High</option>
                </select>
            </label>
            <p>Due Date: ${todo.dueDate || 'No due date'}</p>
            <label>
                <input type="checkbox" ${todo.isCompleted ? 'checked' : ''}>
                Completed
            </label>
            <button class="edit-button">Edit</button>
        `;

			const deleteButton = todoElement.querySelector('.delete-button');
			deleteButton.addEventListener('click', () => {
				dataHandler.deleteTodoItemFromProject(project.title, todo);
				this.renderTodos(project);
			});

			const editButton = todoElement.querySelector('.edit-button');
			editButton.addEventListener('click', (event) => {
				event.stopPropagation();
				const editForm = document.querySelector('#edit-todo-form');
				if (editForm) {
					editForm.dataset.todoId = todo.id;
					document.querySelector('#edit-title').value = todo.title;
					document.querySelector('#edit-description').value = todo.description;
					document.querySelector('#edit-dueDate').value = todo.dueDate;
					document.querySelector('#edit-priority').value = todo.priority;
					showModal('edit-modal-overlay');
				}
			});

			todoContainer.appendChild(todoElement);
		});

		// Append the buttonDiv and todoContainer to the main container
		this.mainContainer.appendChild(buttonDiv);
		this.mainContainer.appendChild(projectNameDiv);
		this.mainContainer.appendChild(todoContainer);
	}

	renderProjects() {
		this.mainContainer.innerHTML = '';

		// Create a div for the "Add New Project" button
		const buttonDiv = document.createElement('div');
		buttonDiv.className = 'button-container';
		const addButton = document.createElement('button');
		addButton.textContent = 'Add New Project';
		addButton.id = 'add-project-button';
		buttonDiv.appendChild(addButton);

		// Create a div to contain the projects
		const projectContainer = document.createElement('div');
		projectContainer.className = 'project-container';

		// Get projects and append them to the projectContainer
		const projects = dataHandler.getProjects();
		projects.forEach((project) => {
			const projectElement = document.createElement('div');
			projectElement.className = 'card project-card';
			projectElement.innerHTML = `
            <div class="card-header">
                <h3>${project.title}</h3>
                <button class="delete-button">&times;</button>
            </div>
            <p>Items: ${project.getTodoItems().length}</p>
        `;

			const todoList = document.createElement('ul');
			project.getTodoItems().forEach((todo) => {
				const todoItem = document.createElement('li');
				todoItem.textContent = todo.title;
				todoList.appendChild(todoItem);
			});

			projectElement.appendChild(todoList);

			const deleteButton = projectElement.querySelector('.delete-button');
			deleteButton.addEventListener('click', (event) => {
				event.stopPropagation();
				dataHandler.deleteProject(project.title);
				this.currentProject = dataHandler.getDefaultProject();
				this.renderProjects();
				this.renderTodos(this.currentProject);
			});

			projectElement.addEventListener('click', () => {
				this.currentProject = project;
				this.renderTodos(project);
			});

			projectContainer.appendChild(projectElement);
		});

		// Append the buttonDiv and projectContainer to the main container
		this.mainContainer.appendChild(buttonDiv);
		this.mainContainer.appendChild(projectContainer);
	}

	getCurrentProject() {
		return this.currentProject;
	}
}

export default UIHandler;
