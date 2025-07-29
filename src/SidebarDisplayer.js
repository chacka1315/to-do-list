import projectManager from "./ProjectManager";
function SidebarDisplayer () {
    const myProjects = document.querySelector("#myProjects");
    const projectList = myProjects.querySelector("ul");
    const updateSidebar = () =>  {
        projectList.textContent = "";
        projectManager.projects.forEach( project => {
            const projectTitle = document.createElement("li");
            projectTitle.textContent = project.title;
            console.log(project.title);
            projectList.appendChild(projectTitle);    
        });
        
    };
    return {updateSidebar}
}

const sidebarDisplayer = SidebarDisplayer();
export default sidebarDisplayer;