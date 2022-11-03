import { levelSelect, symbols, gameState } from './const.js'
import { createGame } from './functions.js'

const btnContainer = document.querySelector('#btn_container')
const gameBoard = document.querySelector('#gameBoard')
const gameText = document.querySelector('h1')
const game = document.querySelector('#game')

btnContainer.addEventListener('click', e => {
    const element = e.target
    const gameOptions = levelSelect[element.value]

    createGame(gameBoard, gameOptions)
    btnContainer.classList.add('hidden')
    gameText.textContent = `Nivel ${gameOptions.level}`
    game.append(gameBoard)
    game.className = ''
})

gameBoard.addEventListener('click', e => {
    const element = e.target
    const { map } = gameState

    if (element.id === 'reset') {
        game.removeChild(gameBoard)
        game.className = 'hidden'
        btnContainer.classList.remove('hidden')
        console.log(element)
    }

    if (element.nodeName === 'DIV') {
        const [x, y] = element.id.split('-')
        const row = parseInt(x)
        const col = parseInt(y)

        const mapValue = map[row][col] === '-' ? '' : map[row][col]

        element.textContent = mapValue
    }
})

gameBoard.addEventListener('contextmenu', e => {
    const element = e.target

    e.preventDefault()
    element.textContent = element.textContent !== symbols.flag ? symbols.flag : ''
}, false)
