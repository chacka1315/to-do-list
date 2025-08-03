import projectManager from "./projectManager";

class Sorte {
    static projectTaskSoter(type) {
        switch (type) {
            case "title":
                projectManager.projects.forEach (project => {
                project.tasks.sort( (task1, task2) => ( (task1.title).localeCompare(task2.title) ) );
                });
                break;
            case "dueDate":
                projectManager.projects.forEach (project => {
                project.tasks.sort( (task1, task2) => ( new Date(task1.dueDate) - new Date(task2.dueDate) ) );
                });
                break;
            case "priority" :
                projectManager.projects.forEach (project => {
                project.tasks.sort( (task1, task2) => ( task1.priority - task2.priority ) );    
                });
                break;
        }
    }

}

export default Sorte