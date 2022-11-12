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

const symbols = {
    mine: '💣',
    flag: '🚩'
}

const mapHeight = {
    Fácil: 'h-14',
    Intermedio: 'h-10',
    Díficil: 'h-8'
}

const mapIds = '1234567890'

const numberColors = {
    1: 'text-blue-500',
    2: 'text-lime-500',
    3: 'text-red-500',
    4: 'text-blue-900',
    5: 'text-red-800',
    6: 'text-teal-500'
}

const gameState = {
    map: [],
    stop: false,
    lose: false,
    flags: 0,
    level: ''
}

const timeState = { timeInterval: undefined }

export {
    levelSelect,
    symbols,
    mapHeight,
    mapIds,
    numberColors,
    gameState,
    timeState
}
