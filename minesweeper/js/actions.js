import { gameState, levelSelect, symbols, numberColors } from './const.js'
import { setState } from './general.js'
import { liberateSquaresRecursive } from './squares.js'

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

const resolveByBtn = (gameState, symbols, flags) => {
    const { map, level } = gameState
    const { mine, flag } = symbols
    const flagsList = [...document.querySelectorAll('.flex div')].filter(e => e.textContent === flag)
    const { mines: allMines } = levelSelect[level]
    let mines = 0

    flagsList.forEach(element => {
        const [x, y] = element.id.split('-')

        if (map[x][y] === mine) {
            mines++
        }
    })

    showMines(map, mine)

    return allMines !== mines
}

const isWin = mines => {
    const squares = [...document.querySelectorAll('.flex div')]
    const totalSquares = squares.length
    const emptySquares = squares.filter(text => text.className.includes('bg-yellow-700')).length

    return totalSquares - emptySquares === mines
}

const resolveByClick = (element, mines) => {
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
    }

    if (mapValue === mine) {
        setState(map, true, true, flags, level)
        showMines(map, mine)
    }
}

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
    }
}

const resetGame = (game, gameBoard, btnContainer) => {
    const info = document.querySelector('#game section')
    if (info) {
        game.removeChild(info)
    }

    gameBoard.innerHTML = ''
    game.className = 'hidden'
    btnContainer.classList.remove('hidden')
    setState([], false, false, 0, '')
}

export {
    showMines,
    resolveByBtn,
    isWin,
    resolveGame,
    resolveByClick,
    resetGame
}
