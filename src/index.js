import "./styles.css";
import projectManager from "./ProjectManager.js";
import Task from "./createTask";
import DOMManager from "./DOMManager.js";
import appController from "./AppController.js";
import PopUpManager from "./PopUpManager.js";

appController.contentEventController();
appController.sidebarEventController();


projectManager.createProject("MyProject");
const task5 = new Task("Dont wast time", "6 : 00", "1","blabla", "It will be fun", "monday" );
const task6 = new Task("Dont wast time", "6 : 00", "3","blabla", "It will be fun", "today" );
const task7 = new Task("Dont wast time", "6 : 00", "1","blabla", "It will be fun", "tomorrow" );
const task8 = new Task("Dont wast time", "6 : 00", "2","blabla", "It will be fun", "monday" );
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task5)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task6)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task7)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task8)


projectManager.createProject("Be a billionaire");
const task1 = new Task("Dont wast time", "6 : 00", "1","blabla", "It will be fun", "monday" );
const task2 = new Task("Dont wast time", "6 : 00", "2","blabla", "It will be fun", "today" );
const task3 = new Task("Dont wast time", "6 : 00", "3","blabla", "It will be fun", "monday" );
const task4 = new Task("Dont wast time", "6 : 00", "1","blabla", "It will be fun", "monday" );
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task1)
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task2)
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task3)
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task4)


console.log(projectManager)


task3.toggleCompleteState()
task1.toggleCompleteState()
task6.toggleCompleteState()
task8.toggleCompleteState()

projectManager.sorter(projectManager.projects[1].id, "priority");
projectManager.sorter(projectManager.projects[0].id, "title");

DOMManager.sidebarDisplayer.updateSidebar();
DOMManager.contentDisplayer.displayAllTasks();
PopUpManager();

