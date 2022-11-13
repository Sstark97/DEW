import { mapHeight, gameState, timeState, symbols } from './const.js'

// Función para manejar el estado del juego
const setState = (map, stop, lose, flags, level) => {
    gameState.map = map
    gameState.stop = stop
    gameState.lose = lose
    gameState.flags = flags
    gameState.level = level
}

// Función que establece el temporizador del juego
const setTime = element => {
    let timer = '00:00'

    const timeINterval = setInterval(() => {
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

    return timeINterval
}

// Creación del mapa vacío
const fillMap = size => {
    const map = []

    for (let row = 0; row < size; row++) {
        map.push(new Array(size).fill('-', 0, size))
    }

    return map
}

// Le añadimos al mapa los números que indican las minas más cercanas
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

// Generamos el Mapa completo
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

// Creamos los botones de acción del Juagador
const createPlayerOptions = () => {
    const { mine } = symbols

    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'w-full lg:w-1/6 h-20 flex justify-between items-center pt-2 pb-1 px-1 lg:px-0'
    optionsContainer.id = 'options'

    const reset = document.createElement('button')
    reset.textContent = 'Resetear'
    reset.className = 'w-1/8 bg-amber-500 mr-2 p-2 rounded-md'
    reset.id = 'reset'

    const change = document.createElement('button')
    change.textContent = `${mine}`
    change.className = 'w-1/6 md:w-1/12 lg:hidden bg-lime-600 p-2 rounded-md text-center text-xl p-2'
    change.id = 'change'

    const resolve = document.createElement('button')
    resolve.textContent = 'Resolver'
    resolve.classList = 'w-1/8 bg-red-500 p-2 rounded-md [&[disabled]]:bg-red-400'
    resolve.id = 'resolve'
    resolve.disabled = true

    optionsContainer.append(reset, change, resolve)

    return optionsContainer
}

// Creamos la sección de información acerca del juego
const createGameInfo = (mineSymbol, mines) => {
    const gameInfo = document.createElement('section')
    gameInfo.className = 'w-5/6 md:w-8/12 lg:w-7/12 xl:w-2/5 mx-auto flex justify-between items-center font-bold text-lg pt-2 pb-1'

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

// Creamos el tablero de juego completo
const createGame = (gameBoard, options, mineSymbol) => {
    const rows = []
    let cols = []
    const { size, mines, level } = options

    const [gameInfo, pTimer] = createGameInfo(mineSymbol, mines)

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div')
        rowDiv.className = 'flex w-full h-9/12'
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div')
            square.className = `w-3/12 ${mapHeight[level]} bg-lime-400 border-solid border-2 border-gray-900 flex items-center justify-center text-lg font-bold`
            square.id = `${row}-${col}`
            cols.push(square)
        }
        rowDiv.append(...cols)
        rows.push(rowDiv)
        cols = []
    }

    gameBoard.insertAdjacentElement('beforebegin', gameInfo)
    gameBoard.append(...rows, createPlayerOptions())
    timeState.time = setTime(pTimer)

    return generateMap(options, mineSymbol)
}

export {
    setState,
    createGame,
    fillMap,
    generateMap
}
