import { createDbTableInHtml } from "./db.js";

const deleteSqlTableInHtml = () => {
  const tableExist = document.querySelector("table");

  if (tableExist) {
    tableExist.remove();
  }
};

const deleteSqlFormInHtml = () => {
  const form = document.querySelector("form");
  const h1 = document.querySelector("h1");

  if (form) {
    form.remove();
    h1.textContent = "";
  }
};

const resetBtn = (typeForm, typeBtn, fields, isDelete) => {
  const main = document.querySelector("main");
  const button = document.querySelector("button");

  button.id = `create${typeForm}Form`;
  button.textContent = `Crear ${typeBtn}`;
  deleteSqlFormInHtml();
  main.append(createDbTableInHtml(fields, typeForm, isDelete));
};

export {
    deleteSqlFormInHtml,
    deleteSqlTableInHtml,
    resetBtn
}