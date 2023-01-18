import { createDatabase } from "./db.js";
import { rentForm } from "./const.js";

const createRentForm = () => {
    const form = document.createElement("form");
    const main = document.querySelector("main");

    const inputs = rentForm.map(element => {
        const div = document.createElement("div")    
        const label = document.createElement("label");
        const input = document.createElement("input");

        label.textContent = element.name;
        input.type = element.type;

        div.append(label, input)

        return div 
    });

    form.append(...inputs);
    main.append(form);
}

const addRent = rent => {
    const dbInstance = createDatabase()

    dbInstance.transaction(tran => {
        
        tran.executeSql('insert into RentCar (carId, userId, startDate, endDate) values (?,?,?,?)',rent);
    });
}

export {
    addRent,
    createRentForm
}