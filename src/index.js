import Task from "./Task";
import TaskControls from "./TaskControls";
import Storage from "./storage";
import md5 from "md5";

const host = document.getElementById("tasks-container");
const taskControls = new TaskControls(Storage.getTasks(), host);

taskControls.init();

const form = document.getElementById("main-form");
form.addEventListener("submit", ev => {
  ev.preventDefault();
  let form = ev.target.elements;
  let text = form.text.value ? form.text.value.trim() : null;
  let newTask = new Task(md5(Date.now()), text, Date.now(), false);
  taskControls.addTask(newTask);
  console.log(taskControls.getAllTasks());
  
});

host.addEventListener("click", ev => {
  console.log(ev)
  if (ev.target.classList.contains("checkbox")) {
    taskControls.toggleTask(ev.target.id);
  }
  if (ev.target.classList.contains("delete")) {
    taskControls.removeTask(ev.target.id);
  }
});
