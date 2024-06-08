export default class Project {
	constructor(title) {
		this.title = title;
		this.todoItems = []; // Container for todo items
	}

	addTodoItem(todoItem) {
		this.todoItems.push(todoItem);
	}

	getTodoItems() {
		return this.todoItems;
	}
}
