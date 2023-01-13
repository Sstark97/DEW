import { mainActions } from "./const.js";
import { tableCar } from "./car.js";
import { createDatabase } from "./db.js";

const main = document.querySelector("main");
createDatabase()

main.addEventListener("click", (e) => {
//   e.preventDefault();

  tableCar()
  const element = e.target;

  if (mainActions[element.id]) {
    mainActions[element.id]();
  }
});
