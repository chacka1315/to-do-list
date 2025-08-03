import "./styles.css";
import DOMManager from "./DOMManager.js";
import appController from "./appController.js";
import popUpManager from "./popUpManager.js";
import storageManager from "./storageManager.js";


storageManager.getStorageData();
appController.contentEventController();
appController.sidebarEventController();
DOMManager.sidebarDisplayer.updateSidebar();
DOMManager.contentDisplayer.displayAllTasks();
popUpManager();



