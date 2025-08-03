import trashIcon from "./assets/trash-svg.inline.svg";
import editProjectIcon from "./assets/projectEdit.inline.svg";
import projectManager from "./projectManager";
function SidebarDisplayer () {
    const myProjects = document.querySelector("#myProjects");
    const projectList = myProjects.querySelector("ul");
    const addGeneralTaskBtn = document.querySelector("#addGeneralTaskBtn");

    const colorHashSymbol = () => {
        const r = Math.floor(Math.random()*256 );
        const g = Math.floor(Math.random()*256 );
        const b = Math.floor(Math.random()*256 );
        return `rgb(${r} ${b} ${g})`
    }

    const updateSidebar = () =>  {
        projectList.textContent = "";
        projectManager.projects.forEach( (project, index) => {
            if(index === 0) { // we don't want to display the the defaulte project like others
                addGeneralTaskBtn.dataset.id = project.id;
                return;
            }; 
            const projectLine = document.createElement("li");
            const projectTitle = document.createElement("h2")
            const hashSpan = document.createElement("span");
            hashSpan.textContent = "#"
            hashSpan.style.color = colorHashSymbol();
            hashSpan.style.fontWeight = "bolder";
            hashSpan.style.fontSize = "1.5rem"
            projectTitle.dataset.id = project.id;
            projectTitle.textContent = project.title;

            const trashSpan = document.createElement("span");
            trashSpan.dataset.id = project.id;
            trashSpan.classList.add("deleteProjectBtn");
            trashSpan.innerHTML = trashIcon;
            const editSpan = document.createElement("span");
            editSpan.dataset.id = project.id;
            editSpan.classList.add("editProjectBtn");
            editSpan.innerHTML = editProjectIcon;

            projectLine.appendChild(hashSpan)
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