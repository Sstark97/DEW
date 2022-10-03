import {
  len,
  show,
  reverse,
  sortAlphebetic,
  showIntervalArray,
  remove,
  removeToEnd,
  addElement,
  addToEnd,
  showElement,
  showElementPos,
} from "./arrays.js";

/*
    El array base será una variable global y que se pasará por parámetro en todas las funciones. Crea
    uno con al menos 15 países. Se pide lo siguiente, utilizando las funciones creadas en el ejercicio
    anterior.

    • Todas las operaciones que se realicen se irán mostrando en la página con su título
*/

const countries = [
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

const showAllOptions = {
  1: () => show(countries),
  2: () => reverse(countries),
  3: () => sortAlphebetic(countries),
};

const addOptions = {
  1: (arr, elem) => addElement(arr, elem),
  2: (arr, elem) => addToEnd(arr, elem),
};

const removeOptions = {
  1: arr => remove(arr),
  2: arr => removeToEnd(arr),
};

const showOptions = {
    1: (arr, pos) => showElement(arr, pos),
    2: (arr, elem) => showElementPos(arr,elem),
};

// • Mostrar número de países.
const showNumberOfCountries = () => len(countries);

/*
    • Mostrar listado de países (y le preguntará si quiere mostrarlos en el orden que
    se encuentran en el array, del revés u ordenados alfabéticamente).
*/
const showCountries = () => {
  const showOption = parseInt(prompt("Como quieres ordernarlos (Escriba un número):\n1) Orden original\n2) Orden inverso\n3) Alfabeticamente"));

  alert(showAllOptions[showOption] !== undefined ? `Lista de países: ${showAllOptions[showOption]()}`: "Opción no válida");
};

/*
    • Mostrar un intervalo de países (y le pedirá que introduzca el intervalo en formato
    inicio-fin; luego deberás extraer el valor inicio y fin).
*/
const showCountriesInterval = () => {
  const start = parseInt(prompt("Digame la posición de inicio"));
  const end = parseInt(prompt("Digame la posición de fin"));

  const subArray = showIntervalArray(start, end);
  const startElement = remove(...subArray);
  const endElement = removeToEnd(...subArray);

  alert(
    `Los países listados son: ${subArray}\nElemento Inicial: ${startElement}\nElemento Final: ${endElement}`
  );
};

/*
    • Añadir un país (y le preguntará si quiere añadir al principio o al final).
*/
const addCountry = () => {
  const addForm = parseInt(
    prompt(
      "Como quiere añadir el elemento (Escriba un número):\n1) Añadir al principio\n2) Añadir al final"
    )
  );
  const elem = prompt("Digame un país a añadir");

  if (addOptions[addForm] !== undefined) {
    addOptions[addForm](countries, elem);
    alert("El elemento ha sido añadido con éxito");
    return;
  }

  alert("La opción no es válida");
};

/*
    • Borrar un país (y le preguntará si quiere borrar al principio o al final).
*/
const removeCountry = () => {
  const addForm = parseInt(
    prompt(
      "Como quiere borrar el elemento (Escriba un número):\n1) Borrar al principio\n2) Borrar al final"
    )
  );
  const elem = prompt("Digame un país a añadir");

  if (removeOptions[addForm] !== undefined) {
    removeOptions[addForm](countries);
    alert("El elemento ha sido borrado con éxito");
    return;
  }

  alert("La opción no es válida");
};

/*
    • Consultar un país (y le preguntará si quiere consultar por posición o por nombre).
*/
const showACountry = () => {
    const toShow = parseInt(prompt("Como quieres consultar el país? (Selecciona un número):\n1) Por posición\n2) Por nombre"))

    alert(showOptions[toShow] !== undefined ? `Lista de países: ${showOptions[toShow]()}`: "Opción no válida");
};

/*
    • Cuando el usuario cargue la página, se cargará un prompt donde se mostrarán (en el prompt, no en la página) las opciones
*/
const menuOptions = {
    1: () => showNumberOfCountries(),
    2: () => showCountries(),
    3: () => showCountriesInterval(),
    4: () => addCountry(),
    5: () => removeCountry(),
    6: () => showACountry()
}

const showCountriesMenu = () => {
    const option = parseInt(prompt("Aplicación de Países\nSeleccione la operación a realizar(Escriba un número)\n1) Número de páises\n2) Ver la lista de Países\n3) Intervalo de Países\n4) Añadir un país\n5) Borrar un país\n6) Consultar un país"))

    if(menuOptions[option] !== undefined) {
        menuOptions[option]()
    } else {
        alert("La opción no es válida")
    }

}

showCountriesMenu()
