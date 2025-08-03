import Task from "./createTask";
import DOMManager from "./DOMManager";
import projectManager from "./ProjectManager";
import storageManager from "./StorageManager";

function AppController() {
    const content = document.querySelector("#content");
    const sidebar = document.querySelector("#sidebar");

    const chooseDisplayType = () => {
        actualDisplay === "alltasks" && DOMManager.contentDisplayer.displayAllTasks();
        actualDisplay === "todaytasks" && DOMManager.contentDisplayer.displayTodayTasks();
        actualDisplay === "oneproject" && DOMManager.contentDisplayer.displayOneProject(projectClickedId);
    };


    const contentEventController = () => {
        content.addEventListener("click", (e) => {
            const deleteTaskBtn = e.target.closest("button.deleteTaskBtn");
            const taskDetailsBtn = e.target.closest("button.taskDetailsBtn");
            const inputCheckbox = e.target.closest("input");

            if (deleteTaskBtn) {
                deleteTask(deleteTaskBtn);
                chooseDisplayType();

            } else if (taskDetailsBtn) {
                seeTaskDetails(taskDetailsBtn);  
                chooseDisplayType();
            } else if (inputCheckbox) {
                const taskId = inputCheckbox.dataset.idTask;
                const projectId = inputCheckbox.dataset.idProject;
                projectManager.toggleCompletedTask(projectId, taskId);
                chooseDisplayType();
            };
            storageManager.updateStorage();
        })
    };

    let actualDisplay = "alltasks";
    let projectClickedId = null;
    const sidebarEventController = () => {
        sidebar.addEventListener("click", (e) =>{
            const buttonClicked = e.target;
            const deleteProjectBtn = e.target.closest("span.deleteProjectBtn"); //to chatch delete button cause they have svg inside

            if (buttonClicked.matches("button[id=seeAllBtn]")) {
                actualDisplay = "alltasks";
                DOMManager.contentDisplayer.displayAllTasks();

            } else if (buttonClicked.matches("button[id=todayBtn]")) {
                DOMManager.contentDisplayer.displayTodayTasks(); 
                actualDisplay = "todaytasks";

            } else if (buttonClicked.matches("#myProjects li>h2")) {
                projectClickedId = buttonClicked.dataset.id;
                DOMManager.contentDisplayer.displayOneProject(projectClickedId);
                actualDisplay = "oneproject"; 

            } else if (deleteProjectBtn) {
                const projectToDeleteId = deleteProjectBtn.dataset.id;
                projectManager.deleteProjectByID(projectToDeleteId);
                DOMManager.sidebarDisplayer.updateSidebar();
                chooseDisplayType();
                storageManager.updateStorage();
            }    
        })
    }

    const deleteTask = (deleteBtn) => {
        const taskId = deleteBtn.dataset.idTask;
        const projectId = deleteBtn.dataset.idProject;
        projectManager.deleteProjectTaskbyID(projectId, taskId);
    }

    const seeTaskDetails = (taskDetailsBtn) => {
        const taskId = taskDetailsBtn.dataset.idTask;
        projectManager.projects.forEach( project => {
            const task = project.tasks.find( task => task.id === taskId);
            if (task) task.toggleDetailsOpenedState();
        })
    }

    return {contentEventController, sidebarEventController,chooseDisplayType}
}

const appController = AppController();
export default appController;
