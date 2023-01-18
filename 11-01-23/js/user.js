import { getDatabase } from "./db.js";
import { resetBtn } from "./functions.js";
import { USER_FIELDS } from "./const.js";

const addUser = (user) => {
  const dbInstance = getDatabase();

  dbInstance.transaction((tran) => {
    tran.executeSql(
      "insert into User (userId, userName, dni, drivingLicense) values (?,?,?,?)",
      user
    );
  });
};

const addUserForm = () => {
  const userInputsNodeValues = document.querySelectorAll("#createUser input");
  const userInputValues = [...userInputsNodeValues];

  const userMappedValues = userInputValues.map((userInput) => userInput.value);

  if (!userMappedValues.some((userInput) => userInput === "")) {
    addUser(userMappedValues);
    resetBtn("User", "Usuario", USER_FIELDS);
  }
};

export { addUser, addUserForm };
