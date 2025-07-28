import DOMManager from "./UI";
import projectManager from "./ProjectManager";

function AppController() {
    const content = document.querySelector("#content");
    const sidebar = document.querySelector("#sidebar");

    const contentEventController = () => {
        content.addEventListener("click", (e) => {
            const deleteBtn = e.target.closest("button.deleteBtn");
            if (deleteBtn) {
                const taskId = deleteBtn.dataset.idTask;
                const projectId = deleteBtn.dataset.idProject;
                projectManager.deleteProjectTaskbyID(projectId, taskId);
                DOMManager.displayAllTasks();
            };
        })
    };

    const sidebarEventController = () => {
        sidebar.addEventListener("click", (e) =>{
            console.log('clockeddddddddd')
            const buttonClicked = e.target;
            if (buttonClicked.matches("button[id=seeAllBtn]")) {
                DOMManager.displayAllTasks();
            } else if (buttonClicked.matches("button[id=todayBtn]")) {
                DOMManager.displayTodayTasks(); 
            }   
        })
    }

    const seeAll = () => {

    }

    const seeTodayTask = () => {

    }
    return {contentEventController, sidebarEventController}
}

const appController = AppController();
export default appController;
