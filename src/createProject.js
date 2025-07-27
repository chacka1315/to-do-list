
class Project {
    constructor ( title ) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.tasks = [];
    };

    addTask ( task ) {
        this.tasks.push( task );
    }

    deleteTask ( taskIndex ) {
        this.tasks.splice(taskIndex, 1);
    }
}

export default Project

