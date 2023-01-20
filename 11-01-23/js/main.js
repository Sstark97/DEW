import { mainActions, CAR_FIELDS, renderNav } from "./const.js";
import { createDatabase, createDbTableInHtml } from "./db.js";
import { deleteCar } from "./car.js";

const main = document.querySelector("main");
const header = document.querySelector("header");
createDatabase()

window.addEventListener("load", () => {
  main.append(createDbTableInHtml(CAR_FIELDS, "Car", true))
})

header.addEventListener("click", e => {
  const element = e.target;

  if(element.nodeName === "DIV") {
    renderNav[element.id]()
  }

})

main.addEventListener("click", (e) => {
  const element = e.target;
  e.preventDefault()

  if (mainActions[element.id]) {
    mainActions[element.id]();

  } else if (element.nodeName === "I") {
    deleteCar(element.id)
    main.append(createDbTableInHtml(CAR_FIELDS, "Car", true))

  } 
});

