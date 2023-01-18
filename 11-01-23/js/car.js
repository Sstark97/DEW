import { getDatabase } from "./db.js";
import { CAR_FIELDS } from "./const.js";
import { resetBtn } from "./functions.js";

const addCar = (car) => {
  const dbInstance = getDatabase();

  dbInstance.transaction((tran) => {
    tran.executeSql(
      "insert into Car (carId, license, brand, model, carState) values (?,?,?,?,?)",
      car
    );
  });
};

const addCarForm = () => {
  const carInputsNodeValues = document.querySelectorAll("#createCar input");
  const carInputValues = [...carInputsNodeValues];

  const carMappedValues = carInputValues.map((carInput) => carInput.value);
  carMappedValues.push("Libre");

  if (!carMappedValues.some((carInput) => carInput === "")) {
    addCar(carMappedValues);
    resetBtn("Car", "Coche", CAR_FIELDS, true);
  }
};

const deleteCar = (id) => {
  const dbInstance = getDatabase();

  dbInstance.transaction((tran) => {
    tran.executeSql("delete from Car where carId = ?", [id]);
  });
};

export { addCar, deleteCar, addCarForm };
