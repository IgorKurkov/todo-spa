import Task from "./Task";
import Storage from "./storage";
import { formatDate, viewMessage } from "./utils";

export default class TaskControls {
  constructor(tasks, host, selectList, form) {
    this.allTasks = tasks;
    this.selectList = selectList;
    this.host = host;
    this.form = form;
    this.sortWay = true;
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

  handleSort(sortingMethod) {
    this.sortWay
      ? this.allTasks.sort(sortingMethod)
      : this.allTasks.sort(sortingMethod).reverse();
    this.sortWay = !this.sortWay;
    this.render();
  }

  sortByText() {
    let byText = (a, b) => {
      const [x, y] = [a.text, b.text];
      return x < y ? -1 : x > y ? 1 : 0;
    };
    this.handleSort(byText);
  }

  sortByDate() {
    let byDate = (a, b) => {
      const [x, y] = [a.date, b.date];
      return x < y ? -1 : x > y ? 1 : 0;
    };
    this.handleSort(byDate);
  }

  sortByDone() {
    let byDone = (a, b) => {
      const [x, y] = [a.isDone, b.isDone];
      return x === y ? 0 : x ? 1 : -1; // truly values first return (x === y)? 0 : x? -1 : 1;
    };
    this.handleSort(byDone);
  }

  handleTasksListClicks() {
    this.host.addEventListener("click", ev => {
      if (ev.target.classList.contains("checkbox")) {
        this.toggleTask(ev.target.id)
          ? viewMessage(`Congrats! You done task!)`)
          : viewMessage(`Wow! Are you uncheck your task? Why?`);
      }
      if (ev.target.classList.contains("remove-task")) {
        this.removeTask(ev.target.id);
        viewMessage(`Task was succesfully removed!)`);
      }
    });
  }

  initMaterializeSelects() {
    document.addEventListener("DOMContentLoaded", () => {
      const instances = M.FormSelect.init(this.selectList, {
        classes: "icons"
      });
    });
  }

  handleSortingSelect() {
    const handler = () => {
      const e = this.selectList;
      const handlers = {
        date: () => {
          this.sortByDate();
          viewMessage(`Sorted by task's dates`);
        },
        text: () => {
          this.sortByText();
          viewMessage(`Sorted by task names`);
        },
        done: () => {
          this.sortByDone();
          viewMessage(`Sorted by finished tasks`);
        }
      };
      const handler = handlers[e.options[e.selectedIndex].value];
      if (handler && e.selectedIndex > 0) {
        handler();
      }
    };
    this.selectList.addEventListener("change", handler);
  }

  handleFormSubmit() {
    this.form.addEventListener("submit", ev => {
      ev.preventDefault();
      let formData = ev.target.elements;
      if (formData.text.value) {
        this.addTask(new Task(formData.text.value.trim()));
      } else {
        viewMessage(
          `You try to add task without text)))<br>
          It's not a best practice)`
        );
      }
      formData.text.value = "";
    });
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
        <button class="remove-task secondary-content">
          <i title="remove task" id="${
            task.id
          }" class="material-icons remove-task">delete</i>
        </button>
      </li>
    `;
  }

  render() {
    const html = this.allTasks.reduce(
      (acc, task) => acc + this.generateTemplate(task),
      ""
    );
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
    this.initMaterializeSelects();
    this.handleSortingSelect();
    this.handleTasksListClicks();
    this.handleFormSubmit();
    this.render();
  }
}
