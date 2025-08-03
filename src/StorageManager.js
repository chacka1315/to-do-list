import projectManager from "./ProjectManager";
import Task from "./createTask";
import Project from "./createProject";

function StorageManager() {
    const updateStorage = () =>{
        const allProjects = JSON.stringify(projectManager.projects);
        localStorage.setItem("userData", allProjects);
    };

    //give all methods de to task and project
    const restoreMethods = (savedProjects) => {
        const savedProjectsRestored = savedProjects.map(project => {
            const restoredProject =  Project.restoreProjectMethods(project);
            const restoredTasks =project.tasks.map(task => Task.restoreTaskMethods(task));
            project.tasksTab = restoredTasks;
            return restoredProject;
        });
        console.log(savedProjectsRestored);
        return savedProjectsRestored;
    };


    const getStorageData = () =>{
        let savedProjects = localStorage.getItem("userData");
        if (savedProjects) {
            console.log("Some data are Here!");
            savedProjects = JSON.parse(savedProjects);
            const savedProjectsRestored = restoreMethods(savedProjects);
            projectManager.projectsTab = savedProjectsRestored;
            console.log(savedProjectsRestored)
            console.log(projectManager.projects)
        } else{
            console.log("Any data here!");
            appDataInitialiazer();
        };


    };

    //initialize with some random tasks
    const appDataInitialiazer = () => {
        projectManager.createProject("General");
        const task1 = new Task("Dont wast time", "18:00", "1","blabla", "It will be fun", `${new Date()}`);
        const task2 = new Task("Workout", "06:00", "2","blabla", "It will be fun", `${new Date()}`);
        const task3 = new Task("Dont wast time bro", "07:00", "1","blablabbbbbbbbbbbbbbbb", "It will be fun", `${new Date()}`);
        const task4 = new Task("Go to gym", "17:00", "3","blabla", "It will be fun", `${new Date()}`);
        projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task1);
        projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task2);
        projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task3);
        projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task4);
        projectManager.sorter(projectManager.projects[0].id, "priority");   
    };

 
    return {updateStorage, getStorageData,}
}

const storageManager = StorageManager();
export default storageManager;