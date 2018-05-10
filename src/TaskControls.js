import Storage from "./storage";
import { formatDate, sort } from "./utils";

export default class TaskControls {
  constructor(tasks, host) {
    this.allTasks = tasks;
    this.host = host;
  }

  getAllTasks() {
    return this.allTasks;
  }

  addTask(task) {
    this.allTasks.push(task);
    Storage.saveTasks(this.allTasks);
    this.render();
  }

  toggleTask(taskId) {
    let index = this.allTasks.findIndex(task => taskId === task.id);
    this.allTasks[index].isDone = this.allTasks[index].isDone ? false : true;
    Storage.saveTasks(this.allTasks);
    return this.allTasks[index].isDone;
  }

  removeTask(taskId) {
    let index = this.allTasks.findIndex(task => taskId === task.id);
    this.allTasks.splice(index, 1);
    Storage.saveTasks(this.allTasks);
    this.render();
  }

  sortByText() {
    this.allTasks.sort((a, b) => {
      sorting(a.text, b.text);
    });
    this.render();
  }

  sortByDate() {
    this.allTasks.sort((a, b) => {
      sorting(a.date, b.date);
    });
    this.render();
  }

  generateTemplate(task) {
    return `
      <li class="collection-item avatar">
        <i class="material-icons circle green">
          <label>
            <input class="checkbox" type="checkbox" id="${task.id}"
             ${task.isDone ? "checked" : ""}
          />
          <span class="label-text"></span>
          </label>
        </i>
        <span class="task-title">${task.text}</span>
        <p>
          ${!task.isDone ? "Not done yet" : "Done!"}<br>
          ${formatDate(task.date, ".")}
        </p>
        <button class="delete-task secondary-content">
          <i title="remove task" id="${
            task.id
          }" class="material-icons delete">delete</i>
        </button>
      </li>
    `;
  }

  render() {
    const html = this.allTasks
      .reverse()
      .reduce((acc, task) => acc + this.generateTemplate(task), "");
    this.host.innerHTML = `
        <li class="collection-header">
          <h4>
            You have ${this.allTasks.length} 
            ${!this.allTasks.length ? "tasks! Congratulations!" : "tasks"}
          </h4>
        </li>
        ${html}
      `;
  }

  init() {
    this.render();
  }
}
