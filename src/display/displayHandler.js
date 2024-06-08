import dataHandler from '../data/dataHandler';

function renderTodos(container) {
	container.innerHTML = '';
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
		container.appendChild(todoElement);
	});
}

function renderProjects(container) {
	container.innerHTML = '';
	const projects = dataHandler.getProjects();
	projects.forEach((project) => {
		const projectElement = document.createElement('div');
		projectElement.className = 'card';
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
		container.appendChild(projectElement);
	});
}

export { renderTodos, renderProjects };
