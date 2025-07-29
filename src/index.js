import "./styles.css";
import projectManager from "./ProjectManager.js";
import Task from "./createTask";
import DOMManager from "./UI.js";
import appController from "./AppController.js";

appController.contentEventController();
appController.sidebarEventController();

projectManager.createProject("MyProject");
const task5 = new Task("Dont wast time", "blabla", "monday", "6 : 00", "1", "It will be fun");
const task6 = new Task("Reade Napoleon", "blabla", "today", "6 : 00", "2", "It will be fun");
const task7 = new Task("Listen book", "blabla", "today", "6 : 00", "3", "It will be fun");
const task8 = new Task("affirmation", "blabla", "tuesday", "6 : 00", "1", "It will be fun");
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task5)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task6)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task7)
projectManager.addTaskToProjectbyID(projectManager.projects[0].id, task8)


projectManager.createProject("Be a billionaire");
const task1 = new Task("Go to gym", "blabla", "today", "6 : 00", "3", "It will be fun");
const task2 = new Task("Reade Dennis", "blabla", "tuesday", "6 : 00", "1", "It will be fun");
const task3 = new Task("Code", "blabla", "tuesday", "6 : 00", "1", "It will be fun");
const task4 = new Task("Visualize", "blabla", "today", "6 : 00", "2", "It will be fun");
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

