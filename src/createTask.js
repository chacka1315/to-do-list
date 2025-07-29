class Task {
    constructor ( title, description, dueDate, dueTime, priority, notes ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.notes = notes;
        this.id = crypto.randomUUID();
        this.completed = false;
        this.addDate = new Date()
        this.detailsOpen = false;
    }

    toggleCompleteState () {
        this.completed = !this.completed;
    };

    toggleDetailsOpenedState () {
        this.detailsOpen = !this.detailsOpen;
    }
}

export default Task