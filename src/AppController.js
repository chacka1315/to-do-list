import DOMManager from "./UI";
import projectManager from "./ProjectManager";

function AppController() {
    const content = document.querySelector("#content");
    const sidebar = document.querySelector("#sidebar");

    const contentEventController = () => {
        content.addEventListener("click", (e) => {
            const deleteTaskBtn = e.target.closest("button.deleteTaskBtn");
            const taskDetailsBtn = e.target.closest("button.taskDetailsBtn");

            if (deleteTaskBtn) {
                deleteTask(deleteTaskBtn);
                actualDisplay === "alltasks" && DOMManager.contentDisplayer.displayAllTasks();
                actualDisplay === "todaytasks" && DOMManager.displayTodayTasks();

            } else if (taskDetailsBtn) {
                seeTaskDetails(taskDetailsBtn);  
                actualDisplay === "alltasks" && DOMManager.contentDisplayer.displayTaskWithDetails();
                actualDisplay === "todaytasks" && DOMManager.displayTodayTasks();
            }
        })
    };

    let actualDisplay = "alltasks";
    const sidebarEventController = () => {
        sidebar.addEventListener("click", (e) =>{
            const buttonClicked = e.target;
            if (buttonClicked.matches("button[id=seeAllBtn]")) {
                actualDisplay = "alltasks";
                DOMManager.contentDisplayer.displayAllTasks();
            } else if (buttonClicked.matches("button[id=todayBtn]")) {
                DOMManager.displayTodayTasks(); 
                actualDisplay = "todaytasks";
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

    return {contentEventController, sidebarEventController}
}

const appController = AppController();
export default appController;
