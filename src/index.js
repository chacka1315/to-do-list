import "./styles.css";
import projectManager from "./ProjectManager.js";
import Task from "./createTask";
import DOMManager from "./DOMManager.js";
import appController from "./AppController.js";
import PopUpManager from "./PopUpManager.js";

appController.contentEventController();
appController.sidebarEventController();


projectManager.createProject("MyProject");
const task5 = new Task("Dont wast time bro", "07:00", "1","blablabbbbbbbbbbbbbbbb", "It will be fun", `${new Date()}`);
const task6 = new Task("Go to gym", "17:00", "3","blabla", "It will be fun", `${new Date()}`);
const task7 = new Task("Dont wast time", "05:30", "1","blabla", "It will be fun", `${new Date()}`);
const task8 = new Task("Be yourself", "16:00", "2","blabla", "It will be fun", `${new Date()}`);
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task5)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task6)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task7)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task8)


projectManager.createProject("Do some stuff");
const task1 = new Task("Dont wast time", "18:00", "1","blabla", "It will be fun", `${new Date()}`);
const task2 = new Task("Workout", "06:00", "2","blabla", "It will be fun", `${new Date()}`);
const task3 = new Task("Dont wast time", "06:00", "3","blabla", "It will be fun", `${new Date()}`);
const task4 = new Task("Push up", "20:00", "1","blabla", "It will be fun", `${new Date()}` );
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task1)
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task2)
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task3)
projectManager.addTaskToProjectbyID(projectManager.projects[1].id, task4)



projectManager.sorter(projectManager.projects[1].id, "priority");
projectManager.sorter(projectManager.projects[0].id, "title");

DOMManager.sidebarDisplayer.updateSidebar();
DOMManager.contentDisplayer.displayAllTasks();
PopUpManager();

