import TaskControls from "./TaskControls";
import Storage from "./storage";

const host = document.getElementById("tasks-list");
const form = document.getElementById("main-form");
const sortingSelectList = document.getElementById("sorting");

const taskControls = new TaskControls(
  Storage.getTasks(),
  host,
  sortingSelectList,
  form
);

taskControls.init();
