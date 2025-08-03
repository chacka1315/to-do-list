import Project from "./createProject"

class ProjectManager {
    constructor () {
        this.projects = [];
    };

    set projectsTab (newProjects) {
        this.projects = newProjects
    } 

    createProject (title) {
        this.projects.push( new Project (title) );
    }

    editProjectTitle (projectID, newTitle) {
        const project = this.projects.find( item => item.id === projectID);
        if (project) {
            project.title = newTitle;
        };
    };

    addTaskToProjectbyID (projectID, task) {
        const project = this.projects.find( item => item.id === projectID);
        if (project) {
            project.addTask(task);
        };
    };

    deleteProjectTaskbyID (projectID, taskID) {
        const project = this.projects.find( project => project.id === projectID );
        if (project) {
            const taskIndex = project.tasks.findIndex( task => task.id === taskID );
            if ( taskIndex !== -1 ) project.deleteTask(taskIndex);   
        };
    };

    deleteProjectByID(projectID) {
    this.projects = this.projects.filter(project => project.id !== projectID);
    };

    toggleCompletedTask = (projectId, taskId) => {
        const project = this.projects.find( project => project.id === projectId );
        if (project) {
            const task = project.tasks.find( task => task.id === taskId );
            if (task) {
                task.toggleCompleteState();
            }
        };
    }
}

const projectManager = new ProjectManager();
export default projectManager;