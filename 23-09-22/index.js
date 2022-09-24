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

const sumRange = (values, ranges) => {
    let allSum = []

    if(values.length < 5) {
        return "El vector de valores no puede ser menor a 5"
    }

    for (let i = 0; i < ranges.length; i++) {
        values[ranges[i][0]] = ranges[i][2]

        const subVector = values.slice(ranges[i][0],ranges[i][1] + 1)

        const sumRow = subVector.reduce((prevValue,accumulator) => prevValue + accumulator,0)
        allSum.push(sumRow)
    }

    return `${JSON.stringify(values)} --- ${JSON.stringify(ranges)} --- resultado: ${allSum.sort((a,b) => a + b)[0]}`

}

// console.log(sumRange([1, -2, 3, 4, -5, -4, 3, 2, 1 ],[[1, 4, 6], [2,5,4]]))

/*
    Dado un mensaje de entrada (solicitado al usuario), vamos a encriptarlo
    siguiendo las siguientes reglas:
        1. Mover las consonantes 9 lugares hacia adelante a través del alfabeto. Si
        pasan de la ‘z’, se vuelve a comenzar en ‘a’
        2. Las vocales se mueven 5 lugares hacia atrás a través del alfabeto
        Excepciones:
            Si el carácter es 'c' o 'o', muévalo 1 lugar hacia atrás.
            Para 'd' muévelo hacia atrás 3 lugares.
            Para 'e', muévelo hacia atrás 4.
        3. Si una letra movida se convierte en 'c', 'o', 'd' o 'e', revertirla a su valor
        original.
    Finalmente tener en cuenta que la cadena que proporcionamos para encriptar
    ha de estar en minúsculas, no debe tener caracteres especiales y no puede ser
    vacía.
*/

const alphabet = "abcdefghijklmnñopqrstuvwxyz"

const comprobePhrase = (phrase) => !/^[a-z]+$/.test(phrase)

const comprobeEspecialCase = (letter, letterPos) => {

    const especialCase = {
        c: 1,
        o: 1,
        d: 3,
        e: 4
    }

    return  especialCase[letter] ? letterPos - especialCase[letter] : -1
}

const consonant = (letterPos, alphabetLetter) => {
    const thirdCase = "code"
    let letter = ""

    if(letterPos + 9 > alphabet.length - 1) {
        const newPos = 9 - (alphabet.length - letterPos)
        letter += !thirdCase.includes(alphabet[newPos]) ? alphabet[newPos] : alphabetLetter
    } else {
        letter += !thirdCase.includes(alphabet[letterPos]) ? alphabet[letterPos + 9] : alphabetLetter
    } 

    return letter
}

const encryptPhrase = () => {
    const vowels = "aeiou"
    const phrase = prompt("Introduce la frase: ")
    let encrypt = ""

    if(comprobePhrase(phrase)) {
        alert("La cadena no puede contener mayúsculas, caracteres especiales y no puede ser vacío")
        return
    }

    for(let letter = 0; letter < phrase.length; letter++) {
        const letterPos = alphabet.indexOf(phrase[letter])
        const alphabetLetter = alphabet[letterPos]
        const especial = comprobeEspecialCase(alphabetLetter,letterPos)

        if (parseInt(especial) !== -1){
            encrypt += alphabet[especial]
        } else if(!vowels.includes(alphabetLetter)) {
            encrypt += consonant(letterPos, alphabetLetter)
        } else {
            const newPos = letterPos - 5 < 0 ? (alphabet.length - letterPos) - 5 : letterPos
            encrypt += alphabet[newPos]
        }

    }

    alert(`El código cifrado es: ${encrypt}`)
}

// encryptPhrase()