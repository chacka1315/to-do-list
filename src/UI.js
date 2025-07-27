import projectManager from "./ProjectManager";

function DOMmanager () {
    const myProjects = document.querySelector("#myProjects");
    const projectList = myProjects.querySelector("ul");
    const content = document.querySelector("#content");

    const updateSidebarDisplay = () =>  {
        projectList.textContent = "";
        projectManager.projects.forEach( project => {
            const projectTitle = document.createElement("li");
            projectTitle.textContent = project.title;
            console.log(project.title);
            projectList.appendChild(projectTitle);    
        });
        
    };

    const updateContentDisplay = () =>  {
    content.textContent = "";
    projectManager.projects.forEach( project => {
        const divProject = document.createElement("div");
        const projectTitle = document.createElement("h1");
        projectTitle.textContent = project.title;
        divProject.appendChild(projectTitle);
        project.tasks.forEach ( task => {

            const divTask = document.createElement("div");
            const taskCheckBox = document.createElement("input");
            taskCheckBox.type = "checkbox";
            taskCheckBox.id = task.title;
            taskCheckBox.dataset.id = task.id;
            const taskLabel = document.createElement("label");
            taskLabel.for = task.title;
            taskLabel.textContent = task.title;

            divTask.appendChild(taskCheckBox);
            divTask.appendChild(taskLabel);
            divProject.appendChild(divTask);
            content.appendChild(divProject);
        })   
    });
    
};

    return {updateSidebarDisplay, updateContentDisplay}
}

const DOMManager =  DOMmanager()
export default DOMManager