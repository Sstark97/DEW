import { CAR_TABLE, USER_TABLE, RENT_CAR_TABLE } from "./const.js";

const createDatabase = () => {
  const dbInstance = openDatabase(
    "rent_cars",
    "1.0",
    "Rent Car database",
    2 * 1024 * 1024
  );

  dbInstance.transaction((tran) => {
    tran.executeSql(CAR_TABLE);
    tran.executeSql(USER_TABLE);
    tran.executeSql(RENT_CAR_TABLE);

    // tran.executeSql("insert into Car (carId, license, brand, model, carState) values (1,'f','f','f','libre')")
  });

  return dbInstance;
};

const getDatabase = () => {
  const dbInstance = openDatabase(
    "rent_cars",
    "1.0",
    "Rent Car database",
    2 * 1024 * 1024
  );

  return dbInstance
}

export {
    createDatabase,
    getDatabase
}