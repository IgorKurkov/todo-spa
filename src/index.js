import Task from "./Task";
import TaskControls from "./TaskControls";
import Storage from "./storage";
import { message } from "./utils";

const host = document.getElementById("host");
const taskControls = new TaskControls(Storage.getTasks(), host);

taskControls.init();

const form = document.getElementById("main-form");
form.addEventListener("submit", ev => {
  ev.preventDefault();
  let formData = ev.target.elements;
  if (formData.text.value) {
    taskControls.addTask(new Task(formData.text.value.trim()));
  } else {
    message(`You try to add task without text)))<br>It's not a best practice)`)
  }
  formData.text.value = "";
});



host.addEventListener("click", ev => {
  if (ev.target.classList.contains("checkbox")) {
    taskControls.toggleTask(ev.target.id)
      ? message(`Congrats! You done task!)`)
      : message(`Wow! Are you uncheck your task? Why?`);
  }
  if (ev.target.classList.contains("delete")) {
    taskControls.removeTask(ev.target.id);
    message(`Task was succesfully removed!)`);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, { classes: "icons" });
});
