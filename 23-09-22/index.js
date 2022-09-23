/*
    Dada una cadena de entrada, hay que devolver el 
    recuento de las vocales que hay en la misma. 
*/

const countVowels = (chain) => {
    const vowels = {
        a: 0,
        e:0,
        i:0,
        o:0,
        u:0
    } 

    for(let letter = 0; letter < chain.length; letter++) {
        if (chain[letter] === "a") {
            vowels.a ++
        } else if (chain[letter] === "e") {
            vowels.e ++
        } else if (chain[letter] === "i") {
            vowels.i ++
        } else if (chain[letter] === "o") {
            vowels.o ++
        } else if (chain[letter] === "u") {
            vowels.u ++
        }
    }

    return `El número de vocales es:\n ${JSON.stringify(vowels)}`
} 

// console.log(countVowels("Probando el contador de vocales"))

// ----------------------------------------------------------------------------------

/*
    Somos unos frikis, y nos gusta leer las frases al revés, como las veríamos en un
    espejo. En este caso, dada una frase, se pide escribirla como se vería reflejada
    en un espejo.

    Nota: no te olvides de dibujar un pequeño marco representando el mismo…
*/

const reversePhrase = ( phrase ) => phrase.split("").reverse().join("")

const  paintPhrase = ( phrase ) => {
    const size = phrase.length + 2
    let square = `${"-".repeat(size + 2)}\n`

    for(let i = 0; i < 7; i++) {
        if (i !== 0) {
            square += `|${" ".repeat(size)}|\n`
        }
        if (i === 3) {
            square += `| ${phrase} |\n`
        }
    }

    square += "-".repeat(size + 2)

    return square
}


// console.log(paintPhrase(reversePhrase("Hola Mundo")))

/*
    Máximo valor de la suma de valores de un rango 
    Casos de prueba:
        [1, -2, 3, 4, -5, -4, 3, 2, 1 ] --- [[1, 3, 10]] --- resultado: 17
        [1, -2, 3, 4, -5, -4, 3, 2, 1 ] --- [[1, 4, 6], [2,5,4]] --- resultado: 8 
*/

// const x = () =>  

const sumRange = (values, ranges) => {
    let allSum = []

    if(values.length < 5) {
        return "El vector de valores no puede ser menor a 5"
    }

    for (let i = 0; i < ranges.length; i++) {
        for (let j = 0; j < ranges[i].length; j++) {
            let sumRow = 0
            if (j === 0) {
                values[ranges[i][j]] = ranges[i][2]
            } else {
                for (let k = ranges[i][0]; k <= ranges[i][1]; k++ ) {
                    sumRow += values[k]
                }
                allSum.push(sumRow)
            }
        }
    }

    return allSum.sort((a,b) => a + b)[0]

}

console.log(sumRange([1, -2, 3, 4, -5, -4, 3, 2, 1 ],[[1, 3, 10]]))