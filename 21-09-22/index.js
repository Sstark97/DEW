const isBinary = (number) => /[0-1]/.test(number) && number.length === 1

const isDigit = (number) => /[0-9]/.test(number)

const generateMinesMap = () => {
  const rows = prompt("Diga el número de Filas");
  const colums = prompt("Diga el número de Columnas");

  if(!isDigit(rows) || !isDigit(colums)) {
    alert("Las filas y columnas deben ser digitos")
  } else if (rows === "0" || colums === "1") {
    alert("No se puede crear un mapa de 0 x 0")
  }

  let row = [];
  let mineMap = [];
  let stop = false;

  for (let i = 0; i < parseInt(rows); i++) {
    if (stop) {
      break;
    }
    for (let j = 0; j < parseInt(colums); j++) {
      let rowString = prompt(`Introduce un valor para el elemento[${i}][${j}]`);
      if (isBinary(rowString)) {
        row.push(parseInt(rowString));
      } else {
        stop = true
        alert("Los números deben ser binarios");
        break;
      }
    }

    mineMap.push(row);
    row = [];
  }

  return mineMap;

};

const mineTest = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];

const countMines = () => {
  const mapMines = generateMinesMap()
  let mapWithCountMines = [];
  let rowMines = [];
  const mapMinesLength = mapMines.length;

  for (let i = 0; i < mapMinesLength; i++) {
    let mines = 0;
    for (let j = 0; j < mapMines[i].length; j++) {

      if (mapMines[i + 1] !== undefined && mapMines[i + 1][j] === 1) {
        console.log()
        mines++;
      } 

      if (mapMines[i][j + 1] === 1) {
        mines++;
      } 

      if (mapMines[i + 1] !== undefined  && mapMines[i + 1][j + 1] === 1) {
        mines++;
      }

      if (mapMines[i - 1] !== undefined && mapMines[i - 1][j] === 1) {
        mines++;
      }

      if (mapMines[i - 1] !== undefined && mapMines[i - 1][j + 1] === 1) {
        mines++;
      }

      if (mapMines[i - 1] !== undefined && mapMines[i - 1][j - 1] !== undefined && mapMines[i - 1][j - 1] === 1) {
        mines++;
      }

      if (mapMines[i][j - 1] !== undefined && mapMines[i][j-1] === 1) {
        mines++;
      }

      if (mapMines[i][j - 1] !== undefined && mapMines[i + 1] !== undefined && mapMines[i + 1][j-1] === 1) {
        mines++;
      }

      rowMines.push(mines !== 0 ? mines : mapMines[i][j])
      mines = 0
    }
    mapWithCountMines.push(rowMines);
    rowMines = [];
  }

  return mapWithCountMines;
};

console.log(countMines(mineTest))

// Debugger
// https://googlechrome.github.io/devtools-samples/debug-js/get-started

