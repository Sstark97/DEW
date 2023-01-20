import { CAR_TABLE, USER_TABLE, RENT_CAR_TABLE } from "./const.js";
import { deleteSqlTableInHtml } from "./functions.js";

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

const getDatabase = () => {
  const dbInstance = openDatabase(
    "rent_cars",
    "1.0",
    "Rent Car database",
    2 * 1024 * 1024
  );

  return dbInstance;
};

const createDbTableInHtml = (fields, sqlTable, isDelete = false) => {
  deleteSqlTableInHtml();

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tr1 = document.createElement("tr");
  const tbody = document.createElement("tbody");

  table.classList = "w-1/3 mx-auto mt-10 border border-slate-200 rounded";
  thead.classList =
    "w-full font-light border border-slate-200 bg-indigo-900 text-white";
  tr1.classList = "flex justify-around w-full py-2";
  tbody.classList = "w-full";

  fields.forEach((element) => {
    const th = document.createElement("th");
    th.textContent = element;

    tr1.append(th);
  });

  thead.append(tr1);

  const dbInstance = getDatabase();

  dbInstance.transaction(function (tran) {
    tran.executeSql(`SELECT * FROM ${sqlTable}`, [], (tran, data) => {
      [...data.rows].forEach(element => {
        const tr = document.createElement("tr");
        tr.className = "flex justify-around w-full text-center py-2";

        const tds = Object.values(element).map((value) => {
          const td = document.createElement("td");
          td.textContent = value;

          return td;
        });

        if (isDelete) {
          const deleteTd = document.createElement("td");
          const icon = document.createElement("i");

          deleteTd.className = "text-red-500 hover:cursor-pointer";
          icon.className = "bx bxs-trash-alt";
          icon.id = element.carId;

          deleteTd.append(icon);
          tds.push(deleteTd);
        }

        tr.append(...tds);
        tbody.append(tr);
      });
    });
  });

  table.append(thead, tbody);

  return table;
};

export { createDatabase, getDatabase, createDbTableInHtml };
