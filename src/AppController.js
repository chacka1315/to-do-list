import DOMManager from "./UI";
import projectManager from "./ProjectManager";

function AppController() {
    const content = document.querySelector("#content");
        
    content.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest("button.deleteBtn");
        if (deleteBtn) {
            const taskId = deleteBtn.dataset.idTask;
            const projectId = deleteBtn.dataset.idProject;
            projectManager.deleteProjectTaskbyID(projectId, taskId);
            DOMManager.updateContentDisplay();
        };
    });

}

export default AppController
