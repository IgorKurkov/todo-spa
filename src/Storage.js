
class Storage {
  constructor() {
    this.tasks =
      localStorage.getItem("tasks") || localStorage.setItem("tasks", "[]");
  }
  getTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
  }
  saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

export default Storage = new Storage();
