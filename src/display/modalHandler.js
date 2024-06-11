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

function createEditTodoModal() {
	const modalOverlay = document.createElement('div');
	modalOverlay.id = 'edit-modal-overlay';

	const modal = document.createElement('div');
	modal.id = 'edit-modal';
	modal.innerHTML = `
      <h2>Edit Todo Item</h2>
      <form id="edit-todo-form">
          <label for="edit-title">Title:</label>
          <input type="text" id="edit-title" name="edit-title" required>
          
          <label for="edit-description">Description:</label>
          <textarea id="edit-description" name="edit-description" required></textarea>
          
          <label for="edit-dueDate">Due Date:</label>
          <input type="date" id="edit-dueDate" name="edit-dueDate" required>
          
          <label for="edit-priority">Priority:</label>
          <select id="edit-priority" name="edit-priority" required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
          </select>
          
          <button type="submit">Save Changes</button>
          <button type="button" id="cancel-edit-button">Cancel</button>
      </form>
  `;

	modalOverlay.appendChild(modal);
	document.body.appendChild(modalOverlay);
}

function createProjectModal() {
	const modalOverlay = document.createElement('div');
	modalOverlay.id = 'project-modal-overlay';

	const modal = document.createElement('div');
	modal.id = 'project-modal';
	modal.innerHTML = `
        <h2>Add New Project</h2>
        <form id="project-form">
            <label for="project-title">Project Title:</label>
            <input type="text" id="project-title" name="project-title" required>
            
            <button type="submit">Add Project</button>
            <button type="button" id="cancel-project-button">Cancel</button>
        </form>
    `;

	modalOverlay.appendChild(modal);
	document.body.appendChild(modalOverlay);
}

function showModal(modalId) {
	document.querySelector(`#${modalId}`).style.display = 'flex';
}

function hideModal(modalId) {
	document.querySelector(`#${modalId}`).style.display = 'none';
}

function setupModalHandlers(uiHandler) {
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

		const currentProject = uiHandler.getCurrentProject();
		dataHandler.addTodoItemToProject(currentProject.title, newTodo);

		uiHandler.renderTodos(currentProject);
		hideModal('modal-overlay');

		// Clear form fields
		event.target.reset();
	});

	document
		.querySelector('#cancel-button')
		.addEventListener('click', () => hideModal('modal-overlay'));
}

function setupEditModalHandlers(uiHandler) {
	document
		.querySelector('#edit-todo-form')
		.addEventListener('submit', (event) => {
			event.preventDefault();

			const id = event.target.dataset.todoId;
			const title = event.target['edit-title'].value;
			const description = event.target['edit-description'].value;
			const dueDate = event.target['edit-dueDate'].value;
			const priority = event.target['edit-priority'].value;

			const todo = dataHandler.updateTodoItem(id, {
				title,
				description,
				dueDate,
				priority,
			});

			const currentProject = uiHandler.getCurrentProject();
			uiHandler.renderTodos(currentProject);
			hideModal('edit-modal-overlay');
		});

	document
		.querySelector('#cancel-edit-button')
		.addEventListener('click', () => hideModal('edit-modal-overlay'));
}

function setupProjectModalHandlers(uiHandler) {
	document
		.querySelector('#project-form')
		.addEventListener('submit', (event) => {
			event.preventDefault();

			const title = event.target['project-title'].value;

			dataHandler.createProject(title);

			uiHandler.renderProjects();
			hideModal('project-modal-overlay');

			// Clear form fields
			event.target.reset();
		});

	document
		.querySelector('#cancel-project-button')
		.addEventListener('click', () => hideModal('project-modal-overlay'));
}

export {
	createTodoModal,
	createEditTodoModal,
	createProjectModal,
	showModal,
	hideModal,
	setupModalHandlers,
	setupEditModalHandlers,
	setupProjectModalHandlers,
};
