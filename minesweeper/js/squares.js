import { numberColors } from './const.js'

// Liberar las 8 Casillas adyacentes (Uso el recursivo)
const liberateSquares = (map, element, mineSymbol) => {
    const [x, y] = element.id.split('-')
    const rowValue = parseInt(x)
    const colValue = parseInt(y)
    let initialRowLoop = rowValue !== 0 ? rowValue - 1 : rowValue
    let initialColLoop = colValue !== 0 ? colValue - 1 : colValue

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const currentElement = document.getElementById(`${initialRowLoop}-${initialColLoop}`)

            if (currentElement && map[initialRowLoop] && map[initialColLoop] && map[initialRowLoop][initialColLoop] !== mineSymbol) {
                const mapValue = map[initialRowLoop][initialColLoop] === '-' ? '' : map[initialRowLoop][initialColLoop]
                currentElement.textContent = mapValue
                currentElement.className += ` bg-yellow-700 ${numberColors[mapValue] ?? ''}`
            }
            initialColLoop++
        }
        initialRowLoop++
        initialColLoop = colValue !== 0 ? colValue - 1 : colValue
    }
}

const stopCondition = (map, size, element, row, col, mineSymbol) => (row < 0 || row >= size || col < 0 || col >= size) ||
(map[row][col] === mineSymbol) || (element.className.includes('bg-yellow-700'))

const changeSquare = (map, element, row, col) => {
    let stop = false
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(map[row][col])) {
        element.className += ` bg-yellow-700 ${numberColors[map[row][col]] ?? ''}`
        element.textContent = map[row][col]

        stop = true
    } else if (map[row][col] === '-') {
        element.className += ' bg-yellow-700'
        element.textContent = ''
    }

    return stop
}

const createAdjacentPos = (row, col) => (
    [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1]
    ]
)

const liberateSquaresRecursive = (map, size, row, col, mineSymbol) => {
    const element = document.getElementById(`${row}-${col}`)

    if (stopCondition(map, size, element, row, col, mineSymbol)) {
        return
    }

    const stopChange = changeSquare(map, element, row, col)
    if (stopChange) {
        return
    }

    const adjacentCells = createAdjacentPos(row, col)
    adjacentCells.forEach(cell => {
        const [row, col] = cell

        liberateSquaresRecursive(map, size, row, col, mineSymbol)
    })
}

export {
    liberateSquares,
    liberateSquaresRecursive
}
