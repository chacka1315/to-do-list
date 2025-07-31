import projectManager from "./ProjectManager";
import trashIcon from "./assets/trash-svg.inline.svg";
import detailsIcon from "./assets/chevron-down.inline.svg"

function ContentDisplayer() {

    const content = document.querySelector("#content");

    const generateSimpleTaskBlock = (divProject, project, task) => {
        const divTask = document.createElement("div");
        const div = document.createElement("div");
        const taskCheckBox = document.createElement("input");
        taskCheckBox.type = "checkbox";
        taskCheckBox.id = `task-${task.id}`;
        taskCheckBox.dataset.idtask = task.id;
        taskCheckBox.dataset.idProject = project.id;
        const taskLabel = document.createElement("label");
        taskLabel.htmlFor = `task-${task.id}`;
        taskLabel.textContent = task.title;

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.classList.add("deleteTaskBtn");
        deleteTaskBtn.dataset.idTask = task.id;
        deleteTaskBtn.dataset.idProject = project.id;
        deleteTaskBtn.innerHTML = trashIcon;

        const taskDetailsBtn = document.createElement("button");
        taskDetailsBtn.classList.add("taskDetailsBtn");
        taskDetailsBtn.dataset.idTask = task.id;
        taskDetailsBtn.dataset.idProject = project.id;
        taskDetailsBtn.innerHTML = detailsIcon;

        const dueDatePara = document.createElement("p");
        dueDatePara.textContent = task.dueDate;

        div.appendChild(taskCheckBox);
        div.appendChild(taskLabel);
        div.appendChild(taskDetailsBtn);
        div.appendChild(deleteTaskBtn);
        
        divTask.appendChild(div);
        divTask.appendChild(dueDatePara);
        divProject.appendChild(divTask);
        content.appendChild(divProject); 
    }


    const generateTaskWithDetailsBlock = (divProject, project, task) => {
        const divTask = document.createElement("div");
        const div = document.createElement("div");
        const taskCheckBox = document.createElement("input");
        taskCheckBox.type = "checkbox";
        taskCheckBox.id = `task-${task.id}`;
        taskCheckBox.dataset.idtask = task.id;
        taskCheckBox.dataset.idProject = project.id;
        const taskLabel = document.createElement("label");
        taskLabel.htmlFor = `task-${task.id}`;
        taskLabel.textContent = task.title;

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.classList.add("deleteTaskBtn");
        deleteTaskBtn.dataset.idTask = task.id;
        deleteTaskBtn.dataset.idProject = project.id;
        deleteTaskBtn.innerHTML = trashIcon;

        const taskDetailsBtn = document.createElement("button");
        taskDetailsBtn.classList.add("taskDetailsBtn");
        taskDetailsBtn.dataset.idTask = task.id;
        taskDetailsBtn.dataset.idProject = project.id;
        taskDetailsBtn.innerHTML = detailsIcon;

        const divDescription = document.createElement("div");
        divDescription.textContent = task.description;

        const dueDateSpan = document.createElement("span");
        dueDateSpan.textContent = task.dueDate;

        const dueTimeSpan = document.createElement("span");
        dueTimeSpan.textContent = task.dueTime;

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = `priority : ${task.priority}`;

        const divAddDate = document.createElement("div");
        divAddDate.textContent = task.addDate;

        const divNotes = document.createElement("div");
        const notesSpan = document.createElement("span");
        notesSpan.textContent = "Notes : ";
        const userNotes = document.createElement("span");
        userNotes.textContent = task.notes;
        divNotes.appendChild(notesSpan);
        divNotes.appendChild(userNotes);

        const editTaskBtn = document.createElement("button");
        editTaskBtn.textContent = "Edit";


        div.appendChild(taskCheckBox);
        div.appendChild(taskLabel);
        div.appendChild(taskDetailsBtn);
        div.appendChild(deleteTaskBtn);

        
        divTask.appendChild(div);
        divTask.appendChild(divDescription);
        divTask.appendChild(dueDateSpan);
        divTask.appendChild(dueTimeSpan);
        divTask.appendChild(prioritySpan);
        divTask.appendChild(divAddDate);
        divTask.appendChild(divNotes);
        divTask.appendChild(editTaskBtn);
        divProject.appendChild(divTask);
        content.appendChild(divProject); 
    }


    const generateAddTaskBtn = (divProject, projectId) => {
        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "+ Add Task";
        addTaskBtn.dataset.id = projectId;
        addTaskBtn.classList.add("addTaskBtn");
        divProject.appendChild(addTaskBtn); 
    };

     const displayAllTasks = () =>  {
        content.textContent = "";
        projectManager.projects.forEach( project => {
            const divProject = document.createElement("div");
            const projectTitle = document.createElement("h1");
            projectTitle.textContent = project.title;
            divProject.appendChild(projectTitle);

            //if project has any tasks just display the project title with a text and the button to add another tasks
            if (!project.tasks.length) {
                divProject.appendChild(projectTitle);
                const text = document.createElement("p")
                text.textContent = "No tasks here ! Click the button bellow to add your tasks..."
                divProject.appendChild(text);
                content.appendChild(divProject); 
            } else {
                project.tasks.forEach ( task => {
                task.detailsOpen ? generateTaskWithDetailsBlock(divProject, project, task) : generateSimpleTaskBlock(divProject,project, task);
                });
            };
            generateAddTaskBtn(divProject, project.id);
        });
        
    };


    const displayTodayTasks = () =>{
    content.textContent = "";
        projectManager.projects.forEach( project => {
            const divProject = document.createElement("div");
            const projectTitle = document.createElement("h1");
            projectTitle.textContent = project.title;
            divProject.appendChild(projectTitle);

            //catch today tasks on an array
            const todayTasks = project.tasks.filter(task => task.dueDate === "today" );
            
            //if project has any tasks just display the project title with a text and the button to add another tasks
            if (!todayTasks.length) {
                divProject.appendChild(projectTitle);
                const text = document.createElement("p")
                text.textContent = "No tasks today..."
                divProject.appendChild(text);
                content.appendChild(divProject); 
            } else {
                todayTasks.forEach ( task => {
                task.detailsOpen ? generateTaskWithDetailsBlock(divProject, project, task) : generateSimpleTaskBlock(divProject,project, task);
                });
            };
            generateAddTaskBtn(divProject, project.id);    
        });
    }

    const displayOneProject = (projectId) => {
        content.textContent = "";
        const projectClicked = projectManager.projects.find( project => project.id === projectId);
        if (projectClicked){
            const divProject = document.createElement("div");
            const projectTitle = document.createElement("h1");
            projectTitle.textContent = projectClicked.title;
            divProject.appendChild(projectTitle);

            if (!projectClicked.tasks.length) {
                divProject.appendChild(projectTitle);
                const text = document.createElement("p")
                text.textContent = "No tasks here ! Click the button bellow to add your tasks..."
                divProject.appendChild(text);
                content.appendChild(divProject); 
            } else {
                projectClicked.tasks.forEach ( task => {
                task.detailsOpen ? generateTaskWithDetailsBlock(divProject, projectClicked, task) : generateSimpleTaskBlock(divProject,projectClicked, task);
                });
            };
            generateAddTaskBtn(divProject, projectId); 
        }
    

    }

    return{displayAllTasks, displayTodayTasks, displayOneProject}
}

const contentDisplayer = ContentDisplayer();
export default contentDisplayer;