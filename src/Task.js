import md5 from "md5";

export default class Task {
  constructor(text) {
    this.id = md5(Date.now());
    this.text = text;
    this.date = Date.now();
    this.isDone = false;
  }
}
