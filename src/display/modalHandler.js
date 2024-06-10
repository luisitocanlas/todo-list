import dataHandler from '../data/dataHandler';

function createTodoModal() {
	const modalOverlay = document.createElement('div');
	modalOverlay.id = 'modal-overlay';

	const modal = document.createElement('div');
	modal.id = 'modal';
	modal.innerHTML = `
        <h2>Add New Todo Item</h2>
        <form id="todo-form">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
            
            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea>
            
            <label for="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" required>
            
            <label for="priority">Priority:</label>
            <select id="priority" name="priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            
            <button type="submit">Add Todo</button>
            <button type="button" id="cancel-button">Cancel</button>
        </form>
    `;

	modalOverlay.appendChild(modal);
	document.body.appendChild(modalOverlay);
}

function showModal() {
	document.querySelector('#modal-overlay').style.display = 'flex';
}

function hideModal() {
	document.querySelector('#modal-overlay').style.display = 'none';
}

function setupModalHandlers(currentProject, renderTodos, mainContainer) {
	document.querySelector('#todo-form').addEventListener('submit', (event) => {
		event.preventDefault();

		const title = event.target.title.value;
		const description = event.target.description.value;
		const dueDate = event.target.dueDate.value;
		const priority = event.target.priority.value;

		const newTodo = dataHandler.createTodoItem(
			title,
			description,
			dueDate,
			priority
		);

		dataHandler.addTodoItemToProject(currentProject.title, newTodo);

		renderTodos(mainContainer, currentProject);
		hideModal();

		// Clear form fields
		event.target.reset();
	});

	document.querySelector('#cancel-button').addEventListener('click', hideModal);
}

export { createTodoModal, showModal, setupModalHandlers };
