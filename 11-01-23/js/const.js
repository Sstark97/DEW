import { createCarForm, addCarForm } from "./car.js";

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

const carSelect = ["Libre", "Alquilado"]

const mainActions = {
    createCarForm: () => createCarForm(carForm, carSelect),
    addCar: () => addCarForm()
}

export {
    CAR_TABLE,
    USER_TABLE,
    RENT_CAR_TABLE,
    carForm,
    carSelect,
    mainActions
}