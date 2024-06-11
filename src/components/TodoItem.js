export default class TodoItem {
	constructor(title, description, dueDate, priority) {
		this.id = `${title}-${Date.now()}`; // Unique ID for each todo item
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.isCompleted = false; // Default value for isCompleted
	}

	update({ title, description, dueDate, priority }) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
	}
}
