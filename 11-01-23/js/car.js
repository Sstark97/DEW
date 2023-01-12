import { createDatabase } from "./db.js";
import { carForm, carSelect } from "./const.js";

const createCarForm = () => {
    const form = document.createElement("form");
    const select = document.createElement("select");
    const main = document.querySelector("main");

    const inputs = carForm.map(element => {
        const div = document.createElement("div")    
        const label = document.createElement("label");
        const input = document.createElement("input");

        label.textContent = element.name;
        input.type = element.type;

        div.append(label, input)

        return div 
    });

    const options = carSelect.map(option => {
        const currentOption = document.createElement("option");
        currentOption.value = option
        currentOption.textContent = option

        return currentOption
    })

    const selectLabel = document.createElement("label")
    selectLabel.textContent = "Estado"

    select.append(...options);

    form.append(...inputs, select);
    main.append(form);
}

const addCar = car => {
    const dbInstance = createDatabase()

    dbInstance.transaction(tran => {
        
        tran.executeSql('insert into Car (carId, license, brand, model, carState) values (?,?,?,?,?)',car);
    });
}

export {
    addCar,
    createCarForm
}