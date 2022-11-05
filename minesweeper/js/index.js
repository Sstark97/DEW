import { levelSelect, symbols, mapIds, numberColors, gameState } from './const.js'
import { createGame, liberateSquares, resolveByBtn, resolveGame, setState, showMines } from './functions.js'

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
    setState(map, false, 0, element.value)
})

gameBoard.addEventListener('click', e => {
    const element = e.target
    const { map, lose, level, flags } = gameState
    const { mine } = symbols
    const { mines } = levelSelect[level]
    let resolve = false

    if (element.id === 'reset') {
        const finalMessage = document.querySelector('h2')
        if (finalMessage) {
            game.removeChild(finalMessage)
        }

        gameBoard.innerHTML = ''
        game.className = 'hidden'
        btnContainer.classList.remove('hidden')
        setState([], false, 0, '')
    }

    if (element.id === 'resolve' && !element.disabled) {
        const lose = resolveByBtn(gameState, symbols)

        if (lose) {
            setState(map, lose, flags, level)
        }
        showMines(map, mine)
        resolve = true
    }

    if (mapIds.includes(element.id[0]) && !lose) {
        const [x, y] = element.id.split('-')
        const rowValue = parseInt(x)
        const colValue = parseInt(y)
        const mapValue = map[rowValue][colValue]

        if (mapValue === '-') {
            liberateSquares(map, element, mine)
        } else {
            element.textContent = mapValue
            element.className += ` bg-yellow-700 ${numberColors[mapValue] ?? ''}`
        }

        if (mapValue === mine) {
            setState(map, true, flags, level)
            showMines(map, mine)
        }
    }

    resolveGame(gameBoard, gameState, mines, resolve)
})

gameBoard.addEventListener('contextmenu', e => {
    const element = e.target
    const { flag } = symbols
    const { map, lose, level, flags } = gameState
    const { mines } = levelSelect[level]
    const btnResolve = document.querySelector('#resolve')

    e.preventDefault()

    if (element.textContent === flag) {
        element.textContent = ''
    } else if (flags < mines) {
        element.textContent = flag
    }

    const currentFlags = [...document.querySelectorAll('.flex div')].filter(e => e.textContent === flag).length
    btnResolve.disabled = currentFlags === mines ? undefined : true
    setState(map, lose, currentFlags, level)
}, false)
