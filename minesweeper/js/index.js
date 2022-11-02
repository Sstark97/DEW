import { levelSelect, symbols } from './const.js'
import { createGame, fillMap } from './functions.js'

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
    console.log(fillMap(gameOptions, ''))
})

gameBoard.addEventListener('contextmenu', e => {
    const element = e.target

    e.preventDefault()
    element.textContent = symbols.flag
}, false)
