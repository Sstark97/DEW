import { showIntervalArray, remove, removeToEnd, len } from "./arrays.js";
import {
  countries,
  appOptions,
  showAllOptions,
  addOptions,
  removeOptions,
  showOptions,
  showMenuOptions
} from "./const.js";

/*
    El array base será una variable global y que se pasará por parámetro en todas las funciones. Crea
    uno con al menos 15 países. Se pide lo siguiente, utilizando las funciones creadas en el ejercicio
    anterior.

    • Todas las operaciones que se realicen se irán mostrando en la página con su título
*/

// • Mostrar número de países.
const showNumberOfCountries = () => {
  const appOption = appOptions.find((option) => option.includes("1"));

  alert(`${appOption}\nEl número de países es: ${len(countries)}`);
};

/*
    • Mostrar listado de países (y le preguntará si quiere mostrarlos en el orden que
    se encuentran en el array, del revés u ordenados alfabéticamente).
*/
const showCountries = () => {
  const appOption = appOptions.find((option) => option.includes("2"));

  const showOption = parseInt(
    prompt(
      `${appOption}\nComo quieres ordernarlos (Escriba un número):\n1) Orden original\n2) Orden inverso\n3) Alfabeticamente`
    )
  );

  alert(
    showAllOptions[showOption] !== undefined
      ? `Lista de países (${showMenuOptions[showOption]}): ${showAllOptions[showOption]()}`
      : "Opción no válida"
  );
};

/*
    • Mostrar un intervalo de países (y le pedirá que introduzca el intervalo en formato
    inicio-fin; luego deberás extraer el valor inicio y fin).
*/
const showCountriesInterval = () => {
  const appOption = appOptions.find((option) => option.includes("3"));

  const start = parseInt(prompt(`${appOption}\nDigame la posición de inicio`));
  const end = parseInt(prompt(`${appOption}\nDigame la posición de fin`));

  if (start > end) {
    alert("Las posiciones son incorrectas");
    return;
  }

  const subArray = showIntervalArray(countries, start, end);
  const startElement = remove([...subArray]);
  const endElement = removeToEnd([...subArray]);

  alert(
    `${appOption}\nLos países listados son: ${subArray}\nElemento Inicial: ${startElement}\nElemento Final: ${endElement}`
  );
};

/*
    • Añadir un país (y le preguntará si quiere añadir al principio o al final).
*/
const addCountry = () => {
  const appOption = appOptions.find((option) => option.includes("4"));
  const addForm = parseInt(
    prompt(
      `${appOption}\nComo quiere añadir el elemento (Escriba un número):\n1) Añadir al principio\n2) Añadir al final`
    )
  );

  if (addOptions[addForm] !== undefined) {
    const country = prompt("Digame un país a añadir");

    if (!countries.includes(country)) {
      addOptions[addForm](countries, country);
      alert("El elemento ha sido añadido con éxito");
      return;
    }

    alert(`${country} ya está en la lista de países`);
    return;
  }

  alert("La opción no es válida");
};

/*
    • Borrar un país (y le preguntará si quiere borrar al principio o al final).
*/
const removeCountry = () => {
  const appOption = appOptions.find((option) => option.includes("5"));
  const addForm = parseInt(
    prompt(
      `${appOption}\nComo quiere borrar el elemento (Escriba un número):\n1) Borrar al principio\n2) Borrar al final`
    )
  );

  if (removeOptions[addForm] !== undefined) {
    const removedElement = removeOptions[addForm](countries);
    alert(`El elemento ${removedElement} ha sido borrado con éxito `);
    return;
  }

  alert("La opción no es válida");
};

/*
    • Consultar un país (y le preguntará si quiere consultar por posición o por nombre).
*/
const showACountry = () => {
  const appOption = appOptions.find((option) => option.includes("6"));
  const toShow = parseInt(
    prompt(
      `${appOption}\nComo quieres consultar el país? (Selecciona un número):\n1) Por posición\n2) Por nombre`
    )
  );

  if (showOptions[toShow] === undefined) {
    alert("Opción no valida");
    return;
  }

  const otherOption = prompt(
    toShow === 1 ? "Escriba la posición" : "Escriba el nombre"
  );

  const result = showOptions[toShow](countries, otherOption);
  const notExist = result === -1 ? "(No existe)" : "";

  const message = toShow !== 1 ? `El país es: ${result} ${notExist}` : `La posición es: ${result}`;

  alert(message);
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
  6: () => showACountry(),
};

const showCountriesMenu = () => {
  while (true) {
    const option = parseInt(prompt(appOptions.join("\n")));

    if (option === 7) break;

    if (menuOptions[option] !== undefined) {
      menuOptions[option]();
    } else {
      alert("La opción no es válida");
    }
  }
};

showCountriesMenu();
