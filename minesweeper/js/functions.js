import { mapHeight, numberColors, gameState } from './const.js'

const setState = (map, lose, flags, level) => {
    gameState.map = map
    gameState.lose = lose
    gameState.flags = flags
    gameState.level = level
}

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

const createPlayerOptions = () => {
    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'flex items-center w-full h-24'
    optionsContainer.id = 'options'

    const reset = document.createElement('button')
    reset.textContent = 'Resetear'
    reset.className = 'w-1/8 bg-amber-500 p-2 mr-3 rounded-md'
    reset.id = 'reset'

    const resolve = document.createElement('button')
    resolve.textContent = 'Resolver'
    resolve.classList = 'w-1/8 bg-red-500 p-2 rounded-md [&[disabled]]:bg-red-400'
    resolve.id = 'resolve'
    resolve.disabled = true

    optionsContainer.append(reset, resolve)

    return optionsContainer
}

const createGame = (gameBoard, options, mineSymbol) => {
    const rows = []
    let cols = []
    const { size, mines, level } = options

    const p = document.createElement('p')
    p.textContent = `Número de minas (${mineSymbol}): ${mines}`
    p.className = 'font-bold text-lg pt-2 pb-1'

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div')
        rowDiv.className = 'flex'
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div')
            square.className = `w-1/5 ${mapHeight[level]} bg-lime-400 border-solid border-2 border-gray-900 flex items-center justify-center text-lg font-bold`
            square.id = `${row}-${col}`
            cols.push(square)
        }
        rowDiv.append(...cols)
        rows.push(rowDiv)
        cols = []
    }

    gameBoard.className = 'w-2/5 mx-auto'
    gameBoard.append(p, ...rows, createPlayerOptions())

    return generateMap(options, mineSymbol)
}

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

const getMines = (map, mineSymbol) => {
    const minesWithPos = []

    map.forEach((element, rowIndex) => {
        element.reduce((previous, current, colIndex) => {
            if (current === mineSymbol) {
                minesWithPos.push({ x: rowIndex, y: colIndex })
            }
            return previous
        }, 0)
    })

    return minesWithPos
}

const showMines = (map, mineSymbol) => {
    const minesWithPos = getMines(map, mineSymbol)

    minesWithPos.forEach(element => {
        const { x, y } = element

        const currentElement = document.getElementById(`${x}-${y}`)
        currentElement.textContent = mineSymbol
        currentElement.className += ' bg-yellow-700'
    })
}

const resolveByBtn = (gameState, symbols) => {
    const { map } = gameState
    const { mine, flag } = symbols
    const flagsList = [...document.querySelectorAll('.flex div')].filter(e => e.textContent === flag)
    let lose = false

    flagsList.forEach(element => {
        const [x, y] = element.id.split('-')

        if (map[x][y] !== mine) {
            lose = true
        }
    })

    return lose
}

const resolveGame = (gameBoard, gameState, mines, resolve) => {
    const { lose, flags } = gameState
    let res = ''
    const h2 = document.createElement('h2')
    const h2IfExist = document.querySelector('h2')

    const squares = [...document.querySelectorAll('.flex div')]
    const totalSquares = squares.length
    const emptySquares = squares.filter(text => text.className.includes('bg-yellow-700')).length

    if (lose) {
        res += 'Has perdido 😢!'
    } else if (totalSquares - emptySquares === mines || (flags === mines && resolve)) {
        res += 'Has ganado 😊!'
    }

    if ((!h2IfExist) && res !== '') {
        h2.textContent = res
        h2.className = 'font-bold text-xl text-center py-8'
        gameBoard.insertAdjacentElement('beforebegin', h2)
    }
}

export {
    setState,
    createGame,
    fillMap,
    generateMap,
    liberateSquares,
    showMines,
    resolveByBtn,
    resolveGame
}
