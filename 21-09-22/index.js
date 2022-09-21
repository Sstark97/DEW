const isBinary = (number) => !number.includes(23456789);

const generateMinesMap = () => {
  const rows = prompt("Diga el número de Filas");
  const colums = prompt("Diga el número de Columnas");

  let row = [];
  let mineMap = [];

  for (let i = 0; i < parseInt(rows); i++) {
    for (let j = 0; j < parseInt(colums); j++) {
      let rowString = prompt("Introduce un valor");
      if (isBinary(rowString)) {
        row.push(parseInt(rowString));
      } else {
        alert("Los números deben ser binarios");
        break;
      }
    }

    mineMap.push(row);
    row = [];
  }

  return mineMap;

  // alert("Las filas y columnas deben ser números")
};

const mineTest = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];

const countMines = (mapMines) => {
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
