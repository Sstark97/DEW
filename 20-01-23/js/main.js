const numberInsert = () => {
    return new Promise((resolve, reject) => {
    
        // Pide al usuario que introduzca un número
        const userNum = Number(window.prompt("Introduce un número (1 - 6):")); 

        // Elige un número randomNumber del 1 al 6
        const randomNumber = Math.floor(Math.random() * 6 + 1); 
        
        // Si el usuario introduce un valor que no es un número, ejecuta reject con un error
        if (isNaN(userNum)) {
            reject(new Error("Tipo de entrada incorrecta"));     
        }

        // Si el número del usuario coincide con el número randomNumber, retorna 2 puntos
        if (userNum === randomNumber) {
            resolve({
            points: 2,
            randomNumber,
            });
        } else if (userNum === randomNumber - 1 || userNum === randomNumber + 1) {
            // Si el número del usuario es diferente al número randomNumber por 1, retorna 1 punto
            resolve({
            points: 1,
            randomNumber,
            });
        } else {
            // Si no, retorna 0 puntos
            resolve({
            points: 0,
            randomNumber,
            });
        }
    });
}; 

const gameContinue = () => {
    return new Promise((resolve) => {

        // Pregunta si el usuario quiere continuar el juego.
        if (window.confirm("¿Quieres continuar?")) { 
            resolve(true);
        } else {
            resolve(false);
        }
    });
};

/**
 * Gestión del juego con Promesas
 * 
 * Gestión recursiva del juego con promesas,
 * pasando el número de puntos totales en cada llamada
 * en caso de que el jugador quiera seguir jugando
 * 
 * @param totalPoints = 0 puntos totales del juego
 * @return void
 */
const gamePromises = (totalPoints = 0) => {

    numberInsert()
        .then(res => {
            const { points, randomNumber } = res 
            totalPoints += points

            alert(`Ha sacado el ${randomNumber}\nTienes ${points} puntos\nEl total es de ${totalPoints}`)
        })
        .then(() => gameContinue())
        .then(res => {
            if(res) {
                gamePromises(totalPoints)
            }
        })
        .catch(err => alert(err))
}

/**
 * Gestión del juego con Async/await
 * 
 * Gestión recursiva del juego con async/await,
 * pasando el número de puntos totales en cada llamada
 * en caso de que el jugador quiera seguir jugando
 * 
 * @param totalPoints = 0 puntos totales del juego
 * @return void
 */
const gameAsyncAwait = async (totalPoints = 0) => {
    try {
        const { points, randomNumber } = await numberInsert()
        totalPoints += points

        alert(`Ha sacado el ${randomNumber}\nTienes ${points} puntos\nEl total es de ${totalPoints}`)

        const isContinue = await gameContinue()

        if(isContinue) {
            gameAsyncAwait(totalPoints)
        }
    } catch (err) {
        alert(err)
    }
}

gameAsyncAwait()
