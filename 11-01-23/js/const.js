const CAR_TABLE = `
    CREATE TABLE IF NOT EXIST Car (
        carId unique,
        license,
        brand,
        model,
        carState
    );
`;

const USER_TABLE = `
    CREATE TABLE TABLE IF NOT EXIST User (
        userId unique,
        userName,
        dni,
        drivingLicense
    );
`;

const RENT_CAR_TABLE = `
    CREATE TABLE TABLE IF NOT EXIST RentCar (
        carId unique,
        userId unique,
        startDate,
        endDate
    );
`

export {
    CAR_TABLE,
    USER_TABLE,
    RENT_CAR_TABLE
}