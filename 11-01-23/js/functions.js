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

const createForm = (tableForm, tableId, tableLabel) => {
    const existForm = document.querySelector(`#create${tableId}`);
  
    if (existForm) {
      existForm.remove();
    }
    deleteSqlTableInHtml();
  
    const main = document.querySelector("main");
    const h1 = document.querySelector("h1");
    const form = document.createElement("form");
    const btnSubmit = document.createElement("button");
  
    h1.textContent = `Crear ${tableLabel}`;
    form.className = "w-1/4 flex flex-col mx-auto mt-10";
    form.id = `create${tableId}`;
  
    btnSubmit.id = `add${tableId}`;
    btnSubmit.className =
      "bg-indigo-700 text-white border border-slate-200 rounded px-3 py-3 mt-4";
    btnSubmit.textContent = "Añadir";
  
    const inputs = tableForm.map((element) => {
      const div = document.createElement("div");
      const label = document.createElement("label");
      const input = document.createElement("input");
  
      label.textContent = element.name;
      input.type = element.type;
  
      div.className = "flex justify-between mt-4";
      input.className = "border border-slate-200 rounded";
  
      div.append(label, input);
  
      return div;
    });
  
    form.append(...inputs, btnSubmit);
    main.append(form);
  };

export {
    deleteSqlFormInHtml,
    deleteSqlTableInHtml,
    resetBtn,
    createForm
}