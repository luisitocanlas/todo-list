import TodoItem from '../components/TodoItem';
import Project from '../components/Project';

class DataHandler {
	constructor() {
		this.projects = [];

		// Create default project
		this.defaultProject = new Project('Default');
		this.projects.push(this.defaultProject);
	}

	createTodoItem(title, description, dueDate, priority) {
		return new TodoItem(title, description, dueDate, priority);
	}

	createProject(title) {
		const newProject = new Project(title);
		this.projects.push(newProject);
		return newProject;
	}

	getDefaultProject() {
		return this.defaultProject;
	}

	getProjects() {
		return this.projects;
	}

	getProjectByTitle(title) {
		return this.projects.find((project) => project.title === title);
	}

	addTodoItemToProject(projectTitle, todoItem) {
		const project = this.getProjectByTitle(projectTitle);
		if (project) {
			project.addTodoItem(todoItem);
		}
	}

	deleteTodoItemFromProject(projectTitle, todoItem) {
		const project = this.getProjectByTitle(projectTitle);
		if (project) {
			project.removeTodoItem(todoItem);
		}
	}

	deleteProject(projectTitle) {
		if (projectTitle === this.defaultProject.title) {
			console.log('Cannot delete the default project');
			return;
		}
		this.projects = this.projects.filter(
			(project) => project.title !== projectTitle
		);
	}

	updateTodoItem(id, updatedData) {
		let todoItem;
		this.projects.forEach((project) => {
			project.getTodoItems().forEach((todo) => {
				if (todo.id === id) {
					todo.update(updatedData);
					todoItem = todo;
				}
			});
		});
		return todoItem;
	}
}

const dataHandler = new DataHandler();
export default dataHandler;
