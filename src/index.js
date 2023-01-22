import "./styles/main.css";

console.log("Hello from Webpack");

class User {
  #name;
  constructor() {
    this.#name = "Kate";
  }
  getInfo() {
    console.log(this.#name);
  }
}
let kate = new User();
kate.getInfo();
