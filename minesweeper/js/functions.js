import { symbols, mapHeight, gameState } from './const.js'

const fillMap = size => {
    const map = []

    for (let row = 0; row < size; row++) {
        map.push(new Array(size).fill('-', 0, size))
    }

    return map
}

const countMines = (mapMines, mineSymbol) => {
    const mapWithCountMines = []
    let rowMines = []
    const mapMinesLength = mapMines.length

    for (let i = 0; i < mapMinesLength; i++) {
        let mines = 0
        for (let j = 0; j < mapMines[i].length; j++) {
            const isMine = mapMines[i][j] === mineSymbol
            if (mapMines[i + 1] !== undefined && mapMines[i + 1][j] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i][j + 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i + 1] !== undefined && mapMines[i + 1][j + 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i - 1] !== undefined && mapMines[i - 1][j] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i - 1] !== undefined && mapMines[i - 1][j + 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i - 1] !== undefined && mapMines[i - 1][j - 1] !== undefined && mapMines[i - 1][j - 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i][j - 1] !== undefined && mapMines[i][j - 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i][j - 1] !== undefined && mapMines[i + 1] !== undefined && mapMines[i + 1][j - 1] === mineSymbol && !isMine) {
                mines++
            }

            rowMines.push(mines !== 0 ? mines : mapMines[i][j])
            mines = 0
        }
        mapWithCountMines.push(rowMines)
        rowMines = []
    }

    return mapWithCountMines
}

const generateMap = (options, mineSymbol) => {
    const { size, mines } = options
    const mapFilled = fillMap(size)
    let mapMines = 0

    while (mapMines !== mines) {
        const posX = Math.floor(Math.random() * (size))
        const posY = Math.floor(Math.random() * (size))

        if (mapFilled[posX][posY] !== mineSymbol) {
            mapFilled[posX][posY] = mineSymbol
            mapMines++
        }
    }

    return countMines(mapFilled, mineSymbol)
}

const createGame = (gameBoard, options) => {
    const rows = []
    let cols = []
    const { size, level } = options
    gameState.map = generateMap(options, symbols.mine)

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div')
        rowDiv.className = 'flex'
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div')
            square.className = `w-1/5 ${mapHeight[level]} bg-green-500 border-solid border-2 border-gray-900 flex items-center justify-center`
            square.id = `${row}-${col}`
            cols.push(square)
        }
        rowDiv.append(...cols)
        rows.push(rowDiv)
        cols = []
    }

    gameBoard.className = 'w-2/5 mx-auto'
    gameBoard.append(...rows)
    return gameBoard
}

export {
    createGame,
    fillMap,
    generateMap
}
