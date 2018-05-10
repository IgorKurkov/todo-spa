import Storage from "./storage";
import { formatDate } from "./utils";

export default class TaskControls {
  constructor(tasks, host) {
    this.allTasks = tasks;
    this.host = host;
    this.sortWay = true;
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

  sorting(sortingMethod) {
    if (this.sortWay) {
      this.allTasks.sort(sortingMethod);
      this.sortWay = !this.sortWay;
    } else {
      this.allTasks.sort(sortingMethod).reverse();
      this.sortWay = !this.sortWay;
    }
    this.render();
  }

  sortByText() {
    let byText = (a, b) => {
      const [x, y] = [a.text, b.text];
      return x < y ? -1 : x > y ? 1 : 0;
    };
    this.sorting(byText);
  }

  sortByDate() {
    let byDate = (a, b) => {
      const [x, y] = [a.date, b.date];
      return x < y ? -1 : x > y ? 1 : 0;
    };
    this.sorting(byDate);
  }

  sortByDone() {
    let byDone = (a, b) => {
      const [x, y] = [a.isDone, b.isDone];
      return x === y ? 0 : x ? 1 : -1; // truly values first return (x === y)? 0 : x? -1 : 1;
    };
    this.sorting(byDone);
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
          }" class="material-icons remove-task">delete</i>
        </button>
      </li>
    `;
  }

  render() {
    const html = this.allTasks
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
