import "./styles.css";
import DOMManager from "./DOMManager.js";
import appController from "./AppController.js";
import PopUpManager from "./PopUpManager.js";
import storageManager from "./StorageManager.js";


storageManager.getStorageData();
appController.contentEventController();
appController.sidebarEventController();
DOMManager.sidebarDisplayer.updateSidebar();
DOMManager.contentDisplayer.displayAllTasks();
PopUpManager();



