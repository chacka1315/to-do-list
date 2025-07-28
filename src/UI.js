import projectManager from "./ProjectManager";
import trashIcon from "./assets/trash-svg.inline.svg";
import detailsIcon from "./assets/details.inline.svg"

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
            const div = document.createElement("div");
            const taskCheckBox = document.createElement("input");
            taskCheckBox.type = "checkbox";
            taskCheckBox.id = task.title;
            taskCheckBox.dataset.idtask = task.id;
            taskCheckBox.dataset.idProject = project.id;
            const taskLabel = document.createElement("label");
            taskLabel.htmlFor = task.title;
            taskLabel.textContent = task.title;

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.dataset.idTask = task.id;
            deleteBtn.dataset.idProject = project.id;
            deleteBtn.innerHTML = trashIcon;

            const detailsBtn = document.createElement("button");
            detailsBtn.dataset.id = task.id;
            detailsBtn.innerHTML = detailsIcon;

            const dueDatePara = document.createElement("p");
            dueDatePara.textContent = task.dueDate;

            div.appendChild(taskCheckBox);
            div.appendChild(taskLabel);
            div.appendChild(detailsBtn);
            div.appendChild(deleteBtn);
            
            divTask.appendChild(div);
            divTask.appendChild(dueDatePara);
            divProject.appendChild(divTask);
            content.appendChild(divProject);    
        }) 
        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "+ Add Task";
        divProject.appendChild(addTaskBtn);  
    });
    
};

    return {updateSidebarDisplay, updateContentDisplay}
}

const DOMManager =  DOMmanager()
export default DOMManager