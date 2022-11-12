import { mapHeight, gameState } from './const.js'

const setState = (map, stop, lose, flags, level) => {
    gameState.map = map
    gameState.stop = stop
    gameState.lose = lose
    gameState.flags = flags
    gameState.level = level
}

const setTime = element => {
    let timer = '00:00'

    setInterval(() => {
        let [minutes, seconds] = timer.split(':')

        const s = parseInt(seconds) + 1
        if (s === 60) {
            const m = parseInt(minutes) + 1
            seconds = '00'
            minutes = m >= 10 ? m : `${minutes.substring(0, 1)}${m}`
        } else {
            seconds = s >= 10 ? s : `${seconds.substring(0, 1)}${s}`
        }

        timer = `${minutes}:${seconds}`
        element.textContent = `⌛ ${timer}`
    }
    , 1000)
}

const fillMap = size => {
    const map = []

    for (let row = 0; row < size; row++) {
        map.push(new Array(size).fill('-', 0, size))
    }

    return map
}

const countMines = (mapMines, mineSymbol) => {
    const mapWithCountMines = []
    let rowMines = []
    const mapMinesLength = mapMines.length

    for (let i = 0; i < mapMinesLength; i++) {
        let mines = 0
        for (let j = 0; j < mapMines[i].length; j++) {
            const isMine = mapMines[i][j] === mineSymbol
            if (mapMines[i + 1] !== undefined && mapMines[i + 1][j] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i][j + 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i + 1] !== undefined && mapMines[i + 1][j + 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i - 1] !== undefined && mapMines[i - 1][j] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i - 1] !== undefined && mapMines[i - 1][j + 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i - 1] !== undefined && mapMines[i - 1][j - 1] !== undefined && mapMines[i - 1][j - 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i][j - 1] !== undefined && mapMines[i][j - 1] === mineSymbol && !isMine) {
                mines++
            }

            if (mapMines[i][j - 1] !== undefined && mapMines[i + 1] !== undefined && mapMines[i + 1][j - 1] === mineSymbol && !isMine) {
                mines++
            }

            rowMines.push(mines !== 0 ? mines : mapMines[i][j])
            mines = 0
        }
        mapWithCountMines.push(rowMines)
        rowMines = []
    }

    return mapWithCountMines
}

const generateMap = (options, mineSymbol) => {
    const { size, mines } = options
    const mapFilled = fillMap(size)
    let mapMines = 0

    while (mapMines !== mines) {
        const posX = Math.floor(Math.random() * (size))
        const posY = Math.floor(Math.random() * (size))

        if (mapFilled[posX][posY] !== mineSymbol) {
            mapFilled[posX][posY] = mineSymbol
            mapMines++
        }
    }

    return countMines(mapFilled, mineSymbol)
}

const createPlayerOptions = () => {
    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'flex items-center w-full h-20'
    optionsContainer.id = 'options'

    const reset = document.createElement('button')
    reset.textContent = 'Resetear'
    reset.className = 'w-1/8 bg-amber-500 p-2 mr-3 rounded-md'
    reset.id = 'reset'

    const resolve = document.createElement('button')
    resolve.textContent = 'Resolver'
    resolve.classList = 'w-1/8 bg-red-500 p-2 rounded-md [&[disabled]]:bg-red-400'
    resolve.id = 'resolve'
    resolve.disabled = true

    optionsContainer.append(reset, resolve)

    return optionsContainer
}

const createGameInfo = (mineSymbol, mines) => {
    const gameInfo = document.createElement('section')
    gameInfo.className = 'w-2/5 mx-auto flex justify-between items-center font-bold text-lg pt-2 pb-1'

    const pMines = document.createElement('p')
    pMines.textContent = `${mineSymbol}: ${mines}`

    const gameResult = document.createElement('p')
    gameResult.className = 'text-center text-3xl py-2 grow'
    gameResult.id = 'gameResult'
    gameResult.textContent = '🙂'

    const pTimer = document.createElement('p')
    pTimer.textContent = '⌛ 00:00'

    gameInfo.append(pMines, gameResult, pTimer)
    return [gameInfo, pTimer]
}

const createGame = (gameBoard, options, mineSymbol) => {
    const rows = []
    let cols = []
    const { size, mines, level } = options

    const [gameInfo, pTimer] = createGameInfo(mineSymbol, mines)

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div')
        rowDiv.className = 'flex'
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div')
            square.className = `w-24 ${mapHeight[level]} bg-lime-400 border-solid border-2 border-gray-900 flex items-center justify-center text-lg font-bold`
            square.id = `${row}-${col}`
            cols.push(square)
        }
        rowDiv.append(...cols)
        rows.push(rowDiv)
        cols = []
    }

    gameBoard.className = 'w-2/5 mx-auto'
    gameBoard.insertAdjacentElement('beforebegin', gameInfo)
    gameBoard.append(...rows, createPlayerOptions())
    setTime(pTimer)

    return generateMap(options, mineSymbol)
}

export {
    setState,
    createGame,
    fillMap,
    generateMap
}
