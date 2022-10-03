import {
  show,
  showElement,
  showElementPos,
  addElement,
  addToEnd,
  remove,
  removeToEnd,
  reverse,
  sortAlphebetic,
} from "./arrays.js";

export const countries = [
  "España",
  "Portugal",
  "Francia",
  "Italia",
  "Alemania",
  "Grecia",
  "Polonia",
  "Ucrania",
  "Suiza",
  "Finlandia",
  "Islandia",
  "Inglaterra",
  "China",
  "Japón",
  "Australia",
];

export const appOptions = [
  "Aplicación de Países",
  "Seleccione la operación a realizar(Escriba un número)",
  "1) Número de páises",
  "2) Ver la lista de Países",
  "3) Intervalo de Países",
  "4) Añadir un país",
  "5) Borrar un país",
  "6) Consultar un país",
  "7) Salir de la App",
];

export const showAllOptions = {
  1: () => show(countries),
  2: () => reverse(countries),
  3: () => sortAlphebetic(countries),
};

export const addOptions = {
  1: (arr, elem) => addElement(arr, elem),
  2: (arr, elem) => addToEnd(arr, elem),
};

export const removeOptions = {
  1: (arr) => remove(arr),
  2: (arr) => removeToEnd(arr),
};

export const showOptions = {
  1: (arr, pos) => showElement(arr, pos),
  2: (arr, elem) => showElementPos(arr, elem),
};
