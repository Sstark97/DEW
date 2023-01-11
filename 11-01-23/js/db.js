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
  });

  return dbInstance;
};

export {
    createDatabase
}