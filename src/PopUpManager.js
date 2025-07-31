import projectManager from "./ProjectManager";
import appController from "./AppController";
import Task from "./createTask";

function PopUpManager() {
    const content = document.querySelector("#content");
    const taskFormDialog = document.querySelector("#taskFormDialog");
    const confirmBtn = document.querySelector("#confirmBtn");
    const inputs = taskFormDialog.querySelectorAll("input:not(#other_date)");
    const inputDate = taskFormDialog.querySelector("#other_date");
    const textareas = taskFormDialog.querySelectorAll("textarea");
    const select = taskFormDialog.querySelector("select");
    const cancelBtn = taskFormDialog.querySelector("button[type='button']");
    const addTaskBtn = document.querySelectorAll(".addTaskBtn");

    select.addEventListener("change", () =>{
        if (select.value === "other") {
            inputDate.style.display = "inline";
            inputDate.required = true;
        } else {
            inputDate.style.display = "none"
            inputDate.required = false;
        };
    });

    const getDueDate = () => {
        let finalDate;
        if (select.value === "today") {
            finalDate = new Date().toISOString().split("T")[0];
            console.log(finalDate);
        } else if (select.value === "tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            finalDate = tomorrow.toISOString().split("T")[0];
        } else if (select.value === "other") {
            finalDate = inputDate.value;
        }
        return finalDate;
    }
    



    const addTaskPopUp = () => taskFormDialog.showModal();

    const cleanTaskPopUpField = () => {
        for (let i = 0; i < inputs.length; i++) {
            if (i !== 2 && i !== 3) {
                inputs[i].value = ""
            }  
        textareas.forEach(textarea => textarea.value ="");
        }
    }

    let projectId = null;
    content.addEventListener("click", (e) => {
        if (e.target.matches("button.addTaskBtn")) {
            projectId = e.target.dataset.id;
            addTaskPopUp();
        }
    })


    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!taskFormDialog.querySelector("form").checkValidity()) {
            taskFormDialog.querySelector("form").reportValidity();
            return;
        };
        const inputsValueTab = Array.from(inputs, input => input.value);
        const textareasTab = Array.from(textareas, textarea => textarea.value);
        const dueDateValue = getDueDate();
        const createTaskArgs = [...inputsValueTab, ...textareasTab, dueDateValue]
        const newtask = new Task(...createTaskArgs);
        projectManager.addTaskToProjectbyID(projectId, newtask);
        console.log(`i add to ${projectId}`)
        console.log(newtask)
        cleanTaskPopUpField();
        appController.chooseDisplayType();
    })
    

    cancelBtn.addEventListener("click", () => {
        cleanTaskPopUpField();
        taskFormDialog.close();
    })





    const editTaskPopUp = () => {
        
    }

    const addProjectPopUp = () => {
        
    }

}

export default PopUpManager;