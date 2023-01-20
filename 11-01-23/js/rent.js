import { RENT_FIELDS } from "./const.js";
import { createDatabase } from "./db.js";
import { resetBtn } from "./functions.js";

const addRentCar = rent => {
    const dbInstance = createDatabase()    

    dbInstance.transaction(tran => {
        tran.executeSql('insert into RentCar (carId, userId, startDate, endDate) values (?,?,?,?)', rent);
    });
}

const addRentCarForm = () => {
    const rentInputsNodeValues = document.querySelectorAll("#createRentCar input");
    const rentInputValues = [...rentInputsNodeValues];
  
    const rentMappedValues = rentInputValues.map((rentInput) => rentInput.value);
  
    if (!rentMappedValues.some((rentInput) => rentInput === "")) {
      addRentCar(rentMappedValues);
      resetBtn("RentCar", "Alquiler", RENT_FIELDS, false);
    }
  };

export {
    addRentCar,
    addRentCarForm
}