import { clickGame, setFlags } from './actions.js'

// Niveles del juego
const levelSelect = {
    easy: {
        size: 8,
        mines: 10,
        level: 'Fácil'
    },
    medium: {
        size: 12,
        mines: 22,
        level: 'Intermedio'
    },
    hard: {
        size: 16,
        mines: 40,
        level: 'Díficil'
    }
}

// Simbolos del juego
const symbols = {
    mine: '💣',
    flag: '🚩',
    currentSymbol: '💣'
}

const actions = {
    '💣': element => clickGame(element),
    '🚩': e => setFlags(e)
}

// Diferentes alturas según el mapa
const mapHeight = {
    Fácil: 'h-12 md:h-14 lg:h-16',
    Intermedio: 'h-10',
    Díficil: 'h-8'
}

// Los posibles números que hay en el mapa
const mapIds = '1234567890'

// Colores de los números
const numberColors = {
    1: 'text-blue-500',
    2: 'text-lime-500',
    3: 'text-red-500',
    4: 'text-blue-900',
    5: 'text-red-800',
    6: 'text-teal-500'
}

// Estado del juego
const gameState = {
    map: [],
    stop: false,
    lose: false,
    flags: 0,
    level: ''
}

// Estado del Temporizador
const timeState = { timeInterval: undefined }

export {
    levelSelect,
    symbols,
    mapHeight,
    mapIds,
    numberColors,
    gameState,
    timeState,
    actions
}
