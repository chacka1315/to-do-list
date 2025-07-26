import Project from "./createProject";
import Task from "./createTask";


const myProject = new Project("MyProject");
const rich = new Project("Be a billionaire");
const task1 = new Task("Go to gym", "blabla", "monday", "2", "It will be fun");
const task2 = new Task("Reade Dennis", "blabla", "tuesday", "1", "It will be fun");
myProject.addTask(task1);
rich.addTask(task2);
console.log(myProject);
console.log(rich);

console.log(myProject.tasks);
console.log(rich.tasks);