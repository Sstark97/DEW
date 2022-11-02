// import { symbols } from "./const.js"

const fillMap = size => {
    const map = []

    for (let row = 0; row < size; row++) {
        map.push(new Array(size).fill('-', 0, size))
    }

    return map
}

const generateMap = (options, mineSymbol) => {
    const { size, mines } = options
    const mapFilled = fillMap(size)
    let mapMines = 0

    while (mapMines !== mines) {
        const posX = Math.floor(Math.random() * (size + 1))
        const posY = Math.floor(Math.random() * (size + 1))

        if (mapFilled[posX][posY] !== mineSymbol) {
            mapFilled[posX][posY] = mineSymbol
            mapMines++
        }
    }
}

const createGame = (gameBoard, options) => {
    const rows = []
    let cols = []
    const { size } = options

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div')
        rowDiv.className = 'flex'
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div')
            square.className = 'w-1/5 h-14 bg-green-500 border-solid border-2 border-gray-900 flex items-center justify-center'
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
