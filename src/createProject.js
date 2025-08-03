
class Project {
    constructor ( title ) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.tasks = [];
    };

    set tasksTab (NewTasksTab) {
        this.tasks = NewTasksTab;
    };

    addTask ( task ) {
        this.tasks.push( task );
    }

    deleteTask ( taskIndex ) {
        this.tasks.splice(taskIndex, 1);
    }

    static restoreProjectMethods (JSONproject) {
    const project = Object.assign(new Project(), JSONproject);
    return project;
    };
}

export default Project

