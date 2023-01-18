import { addCarForm } from "./car.js";
import { resetBtn, createForm } from "./functions.js";
import { addUserForm } from "./user.js";

const CAR_TABLE = `
    CREATE TABLE IF NOT EXISTS Car (
        carId unique,
        license,
        brand,
        model,
        carState
    );
`;

const USER_TABLE = `
    CREATE TABLE IF NOT EXISTS User (
        userId unique,
        userName,
        dni,
        drivingLicense
    );
`;

const RENT_CAR_TABLE = `
    CREATE TABLE IF NOT EXISTS RentCar (
        carId unique,
        userId unique,
        startDate,
        endDate
    );
`

const carForm = [
    {name: "Id", type: "number"},
    {name: "Matrícula", type: "text"},
    {name: "Marca", type: "text"},
    {name: "Modelo", type: "text"},
]

const userForm = [
    {name: "Id", type: "number"},
    {name: "Nombre", type: "text"},
    {name: "DNI", type: "text"},
    {name: "Carnet de Conducir", type: "text"},
]

const rentForm = [
    {name: "Id Usuario", type: "number"},
    {name: "Id Coche", type: "number"},
    {name: "Fecha Inicio", type: "date"},
    {name: "Fecha Fin", type: "date"},
]

const carSelect = ["Libre", "Alquilado"]
const CAR_FIELDS = ["Id", "Matrícula", "Marca", "Modelo", "Estado", "Acciones"]
const USER_FIELDS = ["Id", "Nombre", "DNI", "Carnet de Conducir"];
const RENT_FIELDS = ["Id Usuario", "Id Coche", "Fecha Inicio", "Fecha Fin"];

const mainActions = {
    createCarForm: () => createForm(carForm, "Car", "Coche"),
    createUserForm: () => createForm(userForm, "User", "Usuario"),
    createRentForm: () => createForm(rentForm, "Rent", "Alquiler"),
    addCar: () => addCarForm(),
    addUser: () => addUserForm()
}

const renderNav = {
    car: () => resetBtn("Car", "Coche", CAR_FIELDS, true),
    user: () => resetBtn("User", "Usuario", USER_FIELDS, false),
    rent: () => resetBtn("Rent", "Alquiler", RENT_FIELDS, false)
}

export {
    CAR_TABLE,
    USER_TABLE,
    RENT_CAR_TABLE,
    CAR_FIELDS,
    USER_FIELDS,
    RENT_FIELDS,
    carForm,
    userForm,
    rentForm,
    carSelect,
    mainActions, 
    renderNav
}