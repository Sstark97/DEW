import { levelSelect, symbols, mapIds, numberColors, gameState } from './const.js'
import { createGame, liberateSquares } from './functions.js'

const btnContainer = document.querySelector('#btn_container')
const gameBoard = document.querySelector('#gameBoard')
const gameText = document.querySelector('h1')
const game = document.querySelector('#game')

btnContainer.addEventListener('click', e => {
    const element = e.target
    const gameOptions = levelSelect[element.value]

    createGame(gameBoard, gameOptions, symbols.mine)
    btnContainer.classList.add('hidden')
    gameText.textContent = `Nivel ${gameOptions.level}`
    game.append(gameBoard)
    game.className = ''
})

gameBoard.addEventListener('click', e => {
    const element = e.target
    const { map } = gameState

    if (element.id === 'reset') {
        gameBoard.innerHTML = ''
        game.className = 'hidden'
        btnContainer.classList.remove('hidden')
    }

    if (mapIds.includes(element.id[0])) {
        const [x, y] = element.id.split('-')
        const rowValue = parseInt(x)
        const colValue = parseInt(y)
        const mapValue = map[rowValue][colValue]

        if (mapValue !== symbols.mine) {
            liberateSquares(map, element, symbols.mine)
        } else {
            element.textContent = mapValue
            element.className += ` bg-yellow-700 ${numberColors[mapValue] ?? ''}`
        }
    }
})

gameBoard.addEventListener('contextmenu', e => {
    const element = e.target

    e.preventDefault()
    element.textContent = element.textContent !== symbols.flag ? symbols.flag : ''
}, false)
