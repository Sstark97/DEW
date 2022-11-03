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
    Intermedio: 'h-12',
    Díficil: 'h-8'
}

const gameState = {
    map: []
}

export {
    levelSelect,
    symbols,
    mapHeight,
    gameState
}
