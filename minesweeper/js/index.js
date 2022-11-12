import { levelSelect, symbols, mapIds, numberColors, gameState } from './const.js'
import { createGame, setState } from './general.js'
import { showMines, resolveByBtn, isWin, resolveGame, resetGame } from './actions.js'
import { liberateSquaresRecursive } from './squares.js'

const btnContainer = document.querySelector('#btn_container')
const gameBoard = document.querySelector('#gameBoard')
const gameText = document.querySelector('h1')
const game = document.querySelector('#game')

btnContainer.addEventListener('click', e => {
    const element = e.target
    const gameOptions = levelSelect[element.value]

    const map = createGame(gameBoard, gameOptions, symbols.mine)
    console.log(map)
    btnContainer.classList.add('hidden')
    gameText.textContent = `Nivel ${gameOptions.level}`

    game.append(gameBoard)
    game.className = ''
    setState(map, false, false, 0, element.value)
})

gameBoard.addEventListener('click', e => {
    const element = e.target
    const { map, stop, level, flags } = gameState
    const { mine } = symbols
    const { mines } = levelSelect[level]

    if (element.id === 'reset') {
        resetGame(game, gameBoard, btnContainer)
    }

    if (!stop) {
        if (element.id === 'resolve' && !element.disabled) {
            const lose = resolveByBtn(gameState, symbols)
            setState(map, true, lose, flags, level)
            showMines(map, mine)
        } else if (mapIds.includes(element.id[0]) && !stop) {
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

            if (isWin(mines)) {
                setState(map, true, false, flags, level)
            }

            if (mapValue === mine) {
                setState(map, true, true, flags, level)
                showMines(map, mine)
            }
        }

        resolveGame(gameState, mines)
    }
})

gameBoard.addEventListener('contextmenu', e => {
    const element = e.target
    const { flag } = symbols
    const { map, stop, level, flags } = gameState
    const { mines } = levelSelect[level]
    const btnResolve = document.querySelector('#resolve')

    e.preventDefault()

    if (!stop) {
        if (element.textContent === flag) {
            element.textContent = ''
        } else if (flags < mines) {
            element.textContent = flag
        }

        const currentFlags = [...document.querySelectorAll('.flex div')].filter(e => e.textContent === flag).length
        btnResolve.disabled = currentFlags === mines ? undefined : true
        setState(map, stop, false, currentFlags, level)
    }
}, false)
