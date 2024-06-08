export default class TodoItem {
	constructor(title, description, dueDate, priority) {
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.dueDate = null; // Default value for dueDate
		this.isCompleted = false; // Default value for isCompleted
	}
}
