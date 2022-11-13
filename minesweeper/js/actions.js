import { gameState, levelSelect, symbols, numberColors, timeState, mapIds } from './const.js'
import { setState } from './general.js'
import { liberateSquaresRecursive } from './squares.js'

// Función que nos devuelve un array con la posición de cada mina en el mapa
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

// Función que nos devuelve las casillas que tienen banderas
const getFlags = flag => (
    [...document.querySelectorAll('.flex div')].filter(e => e.textContent === flag)
)

// Función que revela la posición de las minas en el mapa
const showMines = (map, mineSymbol) => {
    const minesWithPos = getMines(map, mineSymbol)

    minesWithPos.forEach(element => {
        const { x, y } = element

        const currentElement = document.getElementById(`${x}-${y}`)
        currentElement.textContent = mineSymbol
        currentElement.className += ' bg-yellow-700'
        currentElement.classList.remove('bg-lime-400')
    })
}

// Función que comprueba si el jugador ha ganado la partida
const isWin = mines => {
    const squares = [...document.querySelectorAll('.flex div')]
    const totalSquares = squares.length
    const emptySquares = squares.filter(text => text.className.includes('bg-yellow-700')).length

    return totalSquares - emptySquares === mines
}

// Función que resulve el juego a través del botón de resolver
const resolveByBtn = (gameState, symbols) => {
    const { map, level, flags } = gameState
    const { mine, flag } = symbols
    const flagsList = getFlags(flag)
    const { mines: allMines } = levelSelect[level]
    let mines = 0

    flagsList.forEach(element => {
        const [x, y] = element.id.split('-')

        if (map[x][y] === mine) {
            mines++
        }
    })

    showMines(map, mine)

    const lose = allMines !== mines
    setState(map, true, lose, flags, level)
    resolveGame(gameState, mines)
}

// Función que gestiona el juego si clickas en una casilla
const resolveByClick = element => {
    const { map, level, flags } = gameState
    const { mine } = symbols
    const [x, y] = element.id.split('-')
    const { size } = levelSelect[level]
    const rowValue = parseInt(x)
    const colValue = parseInt(y)
    const mapValue = map[rowValue][colValue]

    if (mapValue === '-') {
        liberateSquaresRecursive(map, size, rowValue, colValue, mine)
    } else {
        element.textContent = mapValue
        element.className += ` bg-yellow-700 ${numberColors[mapValue] ?? ''}`
        element.classList.remove('bg-lime-400')
    }

    if (mapValue === mine) {
        setState(map, true, true, flags, level)
        showMines(map, mine)
    }
}

// Función que controla si el juego ha acabado
const resolveGame = (gameState, mines) => {
    const { stop, lose, flags } = gameState
    const gameResult = document.querySelector('#gameResult')
    let res = ''

    if (lose) {
        res += '😢'
    } else if (isWin(mines) || (flags === mines && stop)) {
        res += '😊'
    }

    if (res !== '') {
        gameResult.textContent = res
        clearInterval(timeState.time)
    }
}

/*
    Función que resetea el juego y devuelve a el
    jugador al menú de selecciópn de dificultad
*/
const resetGame = (game, gameBoard, btnContainer) => {
    const info = document.querySelector('#game section')
    const h1 = document.querySelector('h1')

    if (info) {
        game.removeChild(info)
    }

    gameBoard.innerHTML = ''
    game.className = 'hidden'
    h1.textContent = 'Selecciona el nivel de Dificultad'
    btnContainer.classList.remove('hidden')
    symbols.currentSymbol = symbols.mine
    setState([], false, false, 0, '')
}

// Función que realiza la acción del click
const clickGame = (element) => {
    const { map, flags, level } = gameState
    const { mines } = levelSelect[level]

    if (mapIds.includes(element.id[0])) {
        resolveByClick(element)
    }

    if (isWin(mines)) {
        setState(map, true, false, flags, level)
    }

    resolveGame(gameState, mines)
}

// Función que coloca las banderas en el juego
const setFlags = e => {
    const element = e.target
    const { flag } = symbols
    const { map, stop, level, flags } = gameState
    const { mines } = levelSelect[level]
    const btnResolve = document.querySelector('#resolve')

    e.preventDefault()

    if (!stop && element.className.includes('bg-lime-400')) {
        element.textContent = element.textContent === flag || flags === mines ? '' : flag

        const currentFlags = getFlags(flag).length
        btnResolve.disabled = currentFlags === mines ? undefined : true

        setState(map, stop, false, currentFlags, level)
    }
}

export {
    showMines,
    getFlags,
    clickGame,
    setFlags,
    resolveByBtn,
    isWin,
    resolveGame,
    resolveByClick,
    resetGame
}
