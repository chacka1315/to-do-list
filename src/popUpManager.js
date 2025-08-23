import projectManager from "./projectManager";
import appController from "./appController";
import DOMManager from "./DOMManager";
import Task from "./createTask";
import storageManager from "./storageManager";

function popUpManager() {
  const content = document.querySelector("#content");
  const taskFormDialog = document.querySelector("#taskFormDialog");
  const confirmBtn = document.querySelector("#confirmBtn");
  const inputs = taskFormDialog.querySelectorAll("input:not(#other_date)");
  const inputDate = taskFormDialog.querySelector("#other_date");
  const inputTime = taskFormDialog.querySelector("#due_time"); //just to get time
  const textareas = taskFormDialog.querySelectorAll("textarea");
  const select = taskFormDialog.querySelector("select");
  const cancelBtn = taskFormDialog.querySelector("button[type='button']");

  select.addEventListener("change", () => {
    if (select.value === "other") {
      inputDate.style.display = "inline";
      inputDate.required = true;
    } else {
      inputDate.style.display = "none";
      inputDate.required = false;
    }
  });

  const getDueDate = () => {
    if (select.value === "Today") {
      return new Date();
    } else if (select.value === "Tomorrow") {
      const tomorrow = new Date();
      return tomorrow.setDate(tomorrow.getDate() + 1);
    } else if (select.value === "other") {
      const [year, month, day] = inputDate.value.split("-").map(Number);
      const [hour, minute] = inputTime.value.split(":").map(Number);
      return new Date(year, month - 1, day, hour, minute);
    }
  };

  const addTaskPopUp = () => taskFormDialog.showModal();

  const cleanTaskPopUpField = () => {
    for (let i = 0; i < inputs.length; i++) {
      if (i !== 2 && i !== 3) {
        inputs[i].value = "";
      }
      textareas.forEach((textarea) => (textarea.value = ""));
    }
  };

  let projectId = null;
  let confirmTaskMode = null;
  let taskToEdit = null;
  content.addEventListener("click", (e) => {
    if (e.target.matches("button.addTaskBtn")) {
      projectId = e.target.dataset.id;
      confirmTaskMode = "add";
      addTaskPopUp();
      cleanTaskPopUpField();
    } else if (e.target.matches("button.editTaskBtn")) {
      console.log(e.target);
      const projectIdForEdit = e.target.dataset.idProject;
      const taskIdForEdit = e.target.dataset.idTask;
      confirmTaskMode = "edit";
      const project = projectManager.projects.find(
        (project) => project.id === projectIdForEdit
      );
      if (project) {
        taskToEdit = project.tasks.find((task) => task.id === taskIdForEdit);
        if (taskToEdit) editTaskPopUp(taskToEdit);
      }
    }
  });

  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirmTaskMode === "add") {
      if (!taskFormDialog.querySelector("form").checkValidity()) {
        taskFormDialog.querySelector("form").reportValidity();
        return;
      }
      const inputsValueTab = Array.from(inputs, (input) => input.value.trim());
      const textareasTab = Array.from(textareas, (textarea) =>
        textarea.value.trim()
      );
      const dueDateValue = getDueDate();
      const createTaskArgs = [...inputsValueTab, ...textareasTab, dueDateValue];
      const newtask = new Task(...createTaskArgs);
      projectManager.addTaskToProjectbyID(projectId, newtask);
      cleanTaskPopUpField();
      appController.chooseDisplayType();
    } else if (confirmTaskMode === "edit") {
      const obj = {
        title: titleInput.value,
        description: descriptionInput.value,
        dueDate: getDueDate(),
        dueTime: dueTimeInput.value,
        priority: priorityInput.value,
        notes: notesInput.value,
      };
      taskToEdit.setTaskInfos = obj;
      taskFormDialog.close();
      appController.chooseDisplayType();
    }
    storageManager.updateStorage();
  });

  cancelBtn.addEventListener("click", () => {
    cleanTaskPopUpField();
    taskFormDialog.close();
  });

  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const dueTimeInput = document.querySelector("#due_time");
  const priorityInput = document.querySelector("#priority");
  const notesInput = document.querySelector("#notes");

  const editTaskPopUp = (task) => {
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    dueTimeInput.value = task.dueTime;
    priorityInput.value = task.priority;
    notesInput.value = task.notes;
    taskFormDialog.showModal();
  };

  const sidebar = document.querySelector("#sidebar");
  const projectDialog = document.querySelector("#projectFormDialog");
  const projectForm = projectDialog.querySelector("form");
  const projectTitleInput = document.querySelector("#project_title");
  const cancelProjectBtn = projectForm.querySelector("#cancelProjectBtn");
  const confirmProjectBtn = document.querySelector("#confirmProjectBtn");

  let confirmProjectMode = null;
  let projectToEditId = null;
  sidebar.addEventListener("click", (e) => {
    const editProjectBtn = e.target.closest("span.editProjectBtn"); //to chatch edit button cause they have svg inside
    const addProjectBtn = e.target.closest("#addProject"); //to chatch add project svg click
    if (addProjectBtn) {
      projectDialog.showModal();
      projectTitleInput.value = "";
      confirmProjectMode = "add";
    } else if (editProjectBtn) {
      confirmProjectMode = "edit";
      projectToEditId = editProjectBtn.dataset.id;
      const project = projectManager.projects.find(
        (project) => project.id === projectToEditId
      );
      if (project) {
        editProjectPopUp(project);
      }
    } else if (e.target.matches("button#addGeneralTaskBtn")) {
      projectId = e.target.dataset.id;
      confirmTaskMode = "add";
      addTaskPopUp();
      cleanTaskPopUpField();
    }
  });

  cancelProjectBtn.addEventListener("click", () => {
    projectDialog.close();
  });

  confirmProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirmProjectMode === "add") {
      const projectTitle = projectTitleInput.value;
      projectManager.createProject(projectTitle);
      DOMManager.sidebarDisplayer.updateSidebar();
      appController.chooseDisplayType();
      projectDialog.close();
    } else if (confirmProjectMode === "edit") {
      const editedTitle = projectTitleInput.value;
      projectManager.editProjectTitle(projectToEditId, editedTitle);
      DOMManager.sidebarDisplayer.updateSidebar();
      appController.chooseDisplayType();
      projectDialog.close();
    }
    storageManager.updateStorage();
  });

  const editProjectPopUp = (project) => {
    projectTitleInput.value = project.title;
    projectDialog.showModal();
  };
}

export default popUpManager;
