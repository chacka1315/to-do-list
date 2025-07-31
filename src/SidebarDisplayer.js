import trashIcon from "./assets/trash-svg.inline.svg";
import editProjectIcon from "./assets/projectEdit.inline.svg";
import projectManager from "./ProjectManager";
function SidebarDisplayer () {
    const myProjects = document.querySelector("#myProjects");
    const projectList = myProjects.querySelector("ul");
    const updateSidebar = () =>  {
        projectList.textContent = "";
        projectManager.projects.forEach( project => {
            const projectLine = document.createElement("li");
            const projectTitle = document.createElement("h2")
            projectTitle.dataset.id = project.id;
            projectTitle.textContent = project.title;
            const trashSpan = document.createElement("span")
            trashSpan.innerHTML = trashIcon;
            const editSpan = document.createElement("span")
            editSpan.innerHTML = editProjectIcon;

            projectLine.appendChild(projectTitle);
            projectLine.appendChild(editSpan);
            projectLine.appendChild(trashSpan);
            projectList.appendChild(projectLine);    
        });
        
    };
    return {updateSidebar}
}

const sidebarDisplayer = SidebarDisplayer();
export default sidebarDisplayer;