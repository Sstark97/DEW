import { createDatabase } from "./db.js";
import { userForm } from "./const.js";

const createUserForm = () => {
    const form = document.createElement("form");
    const main = document.querySelector("main");

    const inputs = userForm.map(element => {
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

const addUser = user => {
    const dbInstance = createDatabase()

    dbInstance.transaction(tran => {
        
        tran.executeSql('insert into User (userId, userName, dni, drivingLicense) values (?,?,?,?)',user);
    });
}

export {
    addUser,
    createUserForm
}