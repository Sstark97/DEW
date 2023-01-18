import { mainActions, CAR_FIELDS } from "./const.js";
import { createDatabase, createDbTableInHtml } from "./db.js";
import { deleteCar } from "./car.js";

const main = document.querySelector("main");
createDatabase()

window.addEventListener("load", () => {
  main.append(createDbTableInHtml(CAR_FIELDS, "Car", true))
})

main.addEventListener("click", (e) => {
  const element = e.target;

  if (mainActions[element.id]) {
    mainActions[element.id]();
  } else if (element.nodeName === "I") {
    deleteCar(element.id)
    main.append(createDbTableInHtml(CAR_FIELDS, "Car", true))
  }
});
