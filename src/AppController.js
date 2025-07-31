import DOMManager from "./DOMManager";
import projectManager from "./ProjectManager";
import PopUpManager from "./PopUpManager";

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
            const addTaskBtn = e.target.closest("button.addTaskBtn");

            if (deleteTaskBtn) {
                deleteTask(deleteTaskBtn);
                chooseDisplayType();


            } else if (taskDetailsBtn) {
                seeTaskDetails(taskDetailsBtn);  
                chooseDisplayType();
            } 
            PopUpManager();
        })
    };

    let actualDisplay = "alltasks";
    let projectClickedId = null;
    const sidebarEventController = () => {
        sidebar.addEventListener("click", (e) =>{
            const buttonClicked = e.target;
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
                
            }
            PopUpManager();
            
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
