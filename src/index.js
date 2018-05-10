import Task from "./Task";
import TaskControls from "./TaskControls";
import Storage from "./storage";
import { message } from "./utils";

const tasksList = document.getElementById("tasks-list");
const taskControls = new TaskControls(Storage.getTasks(), tasksList);

taskControls.init();

const form = document.getElementById("main-form");
form.addEventListener("click", ev => {
  if (ev.target.classList.contains("submit")) {
    ev.preventDefault();
    let formData = ev.target.form.elements;
    if (formData.text.value) {
      taskControls.addTask(new Task(formData.text.value.trim()));
    } else {
      message(
        `You try to add task without text)))<br>It's not a best practice)`
      );
    }
    formData.text.value = "";
  }
});

const filters = document.getElementById("filters");
const listQ = () => {
  var e = filters;
  if (e.selectedIndex > 0) {
    if ("date" === e.options[e.selectedIndex].value) {
      taskControls.sortByDate();
      message(`Sorted by task's created dates`)
    }
    if ("text" === e.options[e.selectedIndex].value) {
      taskControls.sortByText();
      message(`Sorted by task names`)
    }
    if ("done" === e.options[e.selectedIndex].value) {
      taskControls.sortByDone();
      message(`Sorted by finished tasks`)
    }
  }
};
filters.addEventListener("change", listQ);

tasksList.addEventListener("click", ev => {
  if (ev.target.classList.contains("checkbox")) {
    taskControls.toggleTask(ev.target.id)
      ? message(`Congrats! You done task!)`)
      : message(`Wow! Are you uncheck your task? Why?`);
  }
  if (ev.target.classList.contains("remove-task")) {
    taskControls.removeTask(ev.target.id);
    message(`Task was succesfully removed!)`);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, { classes: "icons" });
});
