import projectManager from "./ProjectManager";
import trashIcon from "./assets/trash-svg.inline.svg";
import detailsIcon from "./assets/chevron-down.inline.svg"
import sidebarDisplayer from "./SidebarDisplayer";
import contentDisplayer from "./ContentDisplayer";

function DOMmanager () {
    
    const content = document.querySelector("#content");
    // const sidebarDisplayerMethods = sidebarDisplayer;
    // const contentDisplayerMethods = contentDisplayer;


const displayTodayTasks = () =>{
    content.textContent = "";
        projectManager.projects.forEach( project => {
            const divProject = document.createElement("div");
            const projectTitle = document.createElement("h1");
            projectTitle.textContent = project.title;
            divProject.appendChild(projectTitle);

            const todayTasks = project.tasks.filter(task => task.dueDate === "today" );
            //if project has any tasks just display the project title with a text and the button to add another tasks
            if (!todayTasks.length) {
                divProject.appendChild(projectTitle);
                const text = document.createElement("p")
                text.textContent = "No tasks today..."
                divProject.appendChild(text);
                content.appendChild(divProject); 
            }

            else if(todayTasks.length) {
                todayTasks.forEach ( task => {
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
                    detailsBtn.classList.add("detailsBtn");
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
                }); 
            };
            const addTaskBtn = document.createElement("button");
            addTaskBtn.textContent = "+ Add Task";
            divProject.appendChild(addTaskBtn);  
        });
    }

    return {sidebarDisplayer, contentDisplayer, displayTodayTasks}
}

const DOMManager =  DOMmanager()
export default DOMManager