import { levelSelect, symbols, gameState } from './const.js'
import { createGame } from './functions.js'

const btnContainer = document.querySelector('#btn_container')
const gameBoard = document.querySelector('#gameboard')
const gameText = document.querySelector('h1')
const body = document.querySelector('body')

btnContainer.addEventListener('click', e => {
    const element = e.target
    const gameOptions = levelSelect[element.value]

    createGame(gameBoard, gameOptions)
    element.parentElement.style.display = 'none'
    gameText.textContent = `Nivel ${gameOptions.level}`
    body.append(gameBoard)
})

gameBoard.addEventListener('click', e => {
    const element = e.target
    const { map } = gameState

    const [x, y] = element.id.split('-')
    const row = parseInt(x)
    const col = parseInt(y)

    const mapValue = map[row][col] === '-' ? '' : map[row][col]

    element.textContent = mapValue
})

gameBoard.addEventListener('contextmenu', e => {
    const element = e.target

    e.preventDefault()
    element.textContent = element.textContent !== symbols.flag ? symbols.flag : ''
}, false)
