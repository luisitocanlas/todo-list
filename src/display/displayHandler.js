import dataHandler from '../data/dataHandler';

function renderTodos(container) {
	container.innerHTML = '';

	// Create a div for the "Add New Todo Item" button
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'button-container';
	const addButton = document.createElement('button');
	addButton.textContent = 'Add New Todo Item';
	buttonDiv.appendChild(addButton);

	// Create a div to contain the todo items
	const todoContainer = document.createElement('div');
	todoContainer.className = 'todo-container';

	// Get todo items and append them to the todoContainer
	const todos = dataHandler.getTodoItems();
	todos.forEach((todo) => {
		const todoElement = document.createElement('div');
		todoElement.className = 'card';
		todoElement.innerHTML = `
          <h3>${todo.title}</h3>
          <p>${todo.description}</p>
          <p>Priority: ${todo.priority}</p>
          <p>Due Date: ${todo.dueDate || 'No due date'}</p>
      `;
		todoContainer.appendChild(todoElement);
	});

	// Append the buttonDiv and todoContainer to the main container
	container.appendChild(buttonDiv);
	container.appendChild(todoContainer);
}

function renderProjects(container) {
	container.innerHTML = '';

	// Create a div for the "Add New Project" button
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'button-container';
	const addButton = document.createElement('button');
	addButton.textContent = 'Add New Project';
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
          <h3>${project.title}</h3>
          <p>Items: ${project.getTodoItems().length}</p>
      `;

		const todoList = document.createElement('ul');
		project.getTodoItems().forEach((todo) => {
			const todoItem = document.createElement('li');
			todoItem.textContent = todo.title;
			todoList.appendChild(todoItem);
		});

		projectElement.appendChild(todoList);
		projectContainer.appendChild(projectElement);
	});

	// Append the buttonDiv and projectContainer to the main container
	container.appendChild(buttonDiv);
	container.appendChild(projectContainer);
}

export { renderTodos, renderProjects };
