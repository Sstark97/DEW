import { getDatabase, deleteSqlTableInHtml } from "./db.js";

const createCarForm = (carForm) => {
  const existForm = document.querySelector("#createCar");

  if (existForm) {
    existForm.remove();
  }
  deleteSqlTableInHtml();

  const main = document.querySelector("main");
  const h1 = document.querySelector("h1");
  const form = document.createElement("form");
  const btnSubmit = document.createElement("button");

  h1.textContent = "Crear Coche";
  form.className = "w-1/4 flex flex-col mx-auto mt-10";
  form.id = "createCar";

  btnSubmit.id = "addCar";
  btnSubmit.className =
    "bg-sky-500 border border-slate-200 rounded px-3 py-3 mt-4";
  btnSubmit.textContent = "Añadir";

  const inputs = carForm.map((element) => {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = element.name;
    input.type = element.type;

    div.className = "flex justify-between mt-4";
    input.className = "border border-slate-200 rounded";

    div.append(label, input);

    return div;
  });

  form.append(...inputs, btnSubmit);
  main.append(form);
};

const addCarForm = () => {
  const carInputsNodeValues = document.querySelectorAll("#createCar input");
  const carInputValues = [...carInputsNodeValues];

  const carMappedValues = carInputValues.map((carInput) => carInput.value);
  carMappedValues.push("Libre");

  if (!carMappedValues.some((carInput) => carInput === "")) {
    addCar(carMappedValues);
  }
};

const addCar = (car) => {
  const dbInstance = getDatabase();

  dbInstance.transaction((tran) => {
    tran.executeSql(
      "insert into Car (carId, license, brand, model, carState) values (?,?,?,?,?)",
      car
    );
  });
};

export { addCar, addCarForm, createCarForm };
