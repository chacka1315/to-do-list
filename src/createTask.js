class Task {
    constructor ( title, description, dueDate, priority, note ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
        this.id = this.id = crypto.randomUUID();
        this.completed = false;
    }

    toggleCompleteState () {
        this.completed = !this.completed
    }
}

export default Task