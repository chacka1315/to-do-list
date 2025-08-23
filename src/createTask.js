class Task {
  constructor(title, dueTime, priority, description, notes, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.priority = priority;
    this.notes = notes;
    this.id = crypto.randomUUID();
    this.completedState = false;
    this.addDate = new Date().toISOString().split("T")[0];
    this.detailsOpen = false;
  }

  set setTaskInfos(obj) {
    this.title = obj.title;
    this.description = obj.description;
    this.dueDate = obj.dueDate;
    this.dueTime = obj.dueTime;
    this.priority = obj.priority;
    this.notes = obj.notes;
  }

  toggleCompleteState() {
    this.completedState = !this.completedState;
  }

  toggleDetailsOpenedState() {
    this.detailsOpen = !this.detailsOpen;
  }

  static restoreTaskMethods(JSONtask) {
    const task = Object.assign(new Task(), JSONtask);
    return task;
  }
}

export default Task;
