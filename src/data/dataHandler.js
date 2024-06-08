import TodoItem from '../components/TodoItem';
import Project from '../components/Project';

class DataHandler {
	constructor() {
		this.todoItems = [];
		this.projects = [];
	}

	createTodoItem(title, description, dueDate, priority) {
		const newTodo = new TodoItem(title, description, dueDate, priority);
		this.todoItems.push(newTodo);
		return newTodo;
	}

	getTodoItems() {
		return this.todoItems;
	}

	createProject(title) {
		const newProject = new Project(title);
		this.projects.push(newProject);
		return newProject;
	}

	getProjects() {
		return this.projects;
	}

	addTodoItemToProject(projectTitle, todoItem) {
		const project = this.projects.find((p) => p.title === projectTitle);
		if (project) {
			project.addTodoItem(todoItem);
		}
	}
}

const dataHandler = new DataHandler();
export default dataHandler;
