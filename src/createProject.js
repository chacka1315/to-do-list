
class Project {
    constructor (title) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.tasks = [];
    };

    addTask (task) {
        this.tasks.push(task);
    }

    deleteTask (task) {
        const taskIndex = 1
        this.tasks.splice()
    }
}

export default Project

