import { levelSelect, symbols, gameState, actions } from './const.js'
import { createGame, setState } from './general.js'
import { resetGame, setFlags, resolveByBtn } from './actions.js'

const btnContainer = document.querySelector('#btn_container')
const gameBoard = document.querySelector('#gameBoard')
const gameText = document.querySelector('h1')
const game = document.querySelector('#game')

// Evento que genera el mapa
btnContainer.addEventListener('click', e => {
    const element = e.target

    if (element.nodeName === 'BUTTON') {
        const gameOptions = levelSelect[element.value]
        const map = createGame(gameBoard, gameOptions, symbols.mine)
        console.log(map)

        btnContainer.classList.add('hidden')
        gameText.textContent = `Nivel ${gameOptions.level}`

        game.append(gameBoard)
        game.className = ''
        setState(map, false, false, 0, element.value)
    }
})

// Evento que controla el click dentro del mapa
gameBoard.addEventListener('click', e => {
    const element = e.target
    const { stop } = gameState
    const { mine, flag, currentSymbol } = symbols

    if (element.id === 'reset') {
        resetGame(game, gameBoard, btnContainer)
    } else if (element.id === 'change') {
        element.textContent = element.textContent === mine ? flag : mine
        symbols.currentSymbol = element.textContent
    } else if (element.id === 'resolve' && !element.disabled) {
        resolveByBtn(gameState, symbols)
    } else if (!stop) {
        actions[currentSymbol](currentSymbol === mine ? element : e)
    }
})

// Evento que controla el colocar una bandera
gameBoard.addEventListener('contextmenu', e => {
    setFlags(e)
}, false)
