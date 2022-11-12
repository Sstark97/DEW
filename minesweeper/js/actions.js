import { levelSelect } from './const.js'
import { setState } from './general.js'

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

    return mines !== allMines
}

const isWin = mines => {
    const squares = [...document.querySelectorAll('.flex div')]
    const totalSquares = squares.length
    const emptySquares = squares.filter(text => text.className.includes('bg-yellow-700')).length

    return totalSquares - emptySquares === mines
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
    resetGame
}
