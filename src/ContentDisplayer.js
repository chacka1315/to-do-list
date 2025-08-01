import projectManager from "./ProjectManager";
import trashIcon from "./assets/trash-svg.inline.svg";
import detailsIcon from "./assets/chevron-down.inline.svg";
import watchIcon from "./assets/clock.inline.svg";
import detailsIcon2 from "./assets/chevron-up.inline.svg";
import dateFormater from "./DateFormater";
import { format, isToday } from "date-fns";

function ContentDisplayer() {

    const content = document.querySelector("#content");

    const generateSimpleTaskBlock = (divProject, project, task) => {
        const divTask = document.createElement("div");
        const div = document.createElement("div");
        const taskCheckBox = document.createElement("input");
        taskCheckBox.type = "checkbox";
        taskCheckBox.id = `task-${task.id}`;
        taskCheckBox.dataset.idTask = task.id;
        taskCheckBox.dataset.idProject = project.id;
        const taskLabel = document.createElement("label");
        taskLabel.htmlFor = `task-${task.id}`;
        taskLabel.textContent = task.title;
        addStyleOnCompletedTask(task.completedState, taskCheckBox, taskLabel);

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
        const dueDateDaySpan = document.createElement("span");
        const dueDateTimeSpan = document.createElement("span");
        const timeSpan = document.createElement("span");
        const watchIconSpan = document.createElement("span")
        watchIconSpan.innerHTML = watchIcon;
 
        dueDateDaySpan.textContent = dateFormater.formateDate(task.dueDate);
        timeSpan.textContent = dateFormater.formateTime(task.dueDate);
        dueDateTimeSpan.appendChild(watchIconSpan);
        dueDateTimeSpan.appendChild(timeSpan);
        dueDatePara.appendChild(dueDateDaySpan);
        dueDatePara.appendChild(dueDateTimeSpan);
        dueDatePara.classList.add("dueDate1");
        divTask.classList.add("divTask1")
        

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
        taskCheckBox.dataset.idTask = task.id;
        taskCheckBox.dataset.idProject = project.id;
        const taskLabel = document.createElement("label");
        taskLabel.htmlFor = `task-${task.id}`;
        taskLabel.textContent = task.title;
        addStyleOnCompletedTask(task.completedState, taskCheckBox, taskLabel);
        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.classList.add("deleteTaskBtn");
        deleteTaskBtn.dataset.idTask = task.id;
        deleteTaskBtn.dataset.idProject = project.id;
        deleteTaskBtn.innerHTML = trashIcon;

        const taskDetailsBtn = document.createElement("button");
        taskDetailsBtn.classList.add("taskDetailsBtn");
        taskDetailsBtn.dataset.idTask = task.id;
        taskDetailsBtn.dataset.idProject = project.id;
        taskDetailsBtn.innerHTML = detailsIcon2;

        const paraDescription = document.createElement("p");
        paraDescription.textContent = task.description;
        paraDescription.classList.add("description");

        const dueDateSpan = document.createElement("span");
        dueDateSpan.textContent = dateFormater.formateDate(task.dueDate);
        dueDateSpan.classList.add("dueDate2");

        const dueTimeSpan = document.createElement("span");
        dueTimeSpan.textContent = dateFormater.formateTime(task.dueDate);;
        dueTimeSpan.classList.add("dueTime2");

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = priorityObj[task.priority][0];
        prioritySpan.style.color = priorityObj[task.priority][1];
        prioritySpan.classList.add("priority");

        const paraAddDate = document.createElement("p");
        paraAddDate.textContent = ` Added on ${task.addDate}`;
        paraAddDate.classList.add("addDate");

        const paraNotes = document.createElement("p");
        paraNotes.classList.add("notes")
        const notesSpan = document.createElement("span");
        notesSpan.textContent = "Notes : ";
        const userNotes = document.createElement("span");
        userNotes.textContent = task.notes;
        paraNotes.appendChild(notesSpan);
        paraNotes.appendChild(userNotes);

        const editTaskBtn = document.createElement("button");
        editTaskBtn.dataset.idTask = task.id;
        editTaskBtn.dataset.idProject = project.id;
        editTaskBtn.classList.add("editTaskBtn");
        editTaskBtn.textContent = "Edit";


        div.appendChild(taskCheckBox);
        div.appendChild(taskLabel);
        div.appendChild(taskDetailsBtn);
        div.appendChild(deleteTaskBtn);

        
        divTask.classList.add("divTask2");
        divTask.appendChild(div);
        divTask.appendChild(paraDescription);
        divTask.appendChild(dueDateSpan);
        divTask.appendChild(dueTimeSpan);
        divTask.appendChild(prioritySpan);
        divTask.appendChild(paraAddDate);
        divTask.appendChild(paraNotes);
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

    const generateAnyProjectText = () => {
        const text = document.createElement("p");
        text.textContent = "You don't have any project for the momnent...";
        text.style.fontStyle = "italic";
        text.style.color = "gray";
        text.style.fontSize = "16px";
        content.appendChild(text);
    };

    const priorityObj = {
        1 : ["Critical", "red"],
        2 : ["High", "orange"],
        3 : ["Medium", "blue"],
        4 : ["Low", "black"],
    };


    const addStyleOnCompletedTask = (isCompleted, checkbox, label) => {
        if (isCompleted) {
            checkbox.checked = true;
            label.classList.add("completedTaskStyle");
        } else{
            checkbox.checked = false;
            label.classList.remove("completedTaskStyle");
        }
        
    };

     const displayAllTasks = () =>  {
        content.textContent = "";
        const displayTitle = document.createElement("h2");
        displayTitle.textContent = "All current Projects";
        content.appendChild(displayTitle);
        !projectManager.projects.length ? generateAnyProjectText() :
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
                text.style.fontStyle = "italic";
                text.style.color = "gray"
                text.style.fontSize = "13px";
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
        const displayTitle = document.createElement("h2");
        displayTitle.textContent = "Today";
        content.appendChild(displayTitle);
        !projectManager.projects.length ? generateAnyProjectText() :
        projectManager.projects.forEach( project => {
            const divProject = document.createElement("div");
            const projectTitle = document.createElement("h1");
            projectTitle.textContent = project.title;
            divProject.appendChild(projectTitle);

            //catch today tasks on an array
            const todayTasks = project.tasks.filter(task => isToday(task.dueDate));
            
            //if project has any tasks just display the project title with a text and the button to add another tasks
            if (!todayTasks.length) {
                divProject.appendChild(projectTitle);
                const text = document.createElement("p")
                text.textContent = "No tasks today..."
                text.style.fontStyle = "italic";
                text.style.color = "gray"
                text.style.fontSize = "13px";
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
                text.style.fontSize = "13px";
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