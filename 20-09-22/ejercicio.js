// Ejercicio
const isBinary = (number) => !number.includes(23456789) || parseInt(number) !== NaN

const binaryComprobe = (pattern, patterns) => {
    if (pattern.length > 32 || pattern.length <= 0) {
        alert("El número no tiene 32 carácteres")
        return
    } else if (!isBinary(pattern)){
        alert("El número debe ser binario")
        return
    } else if (!isBinary(patterns[0])){
        alert("El patrón no es binario")
        return
    } else if (patterns[0].length > pattern.length) {
        alert("El patrón es mayor que la cadena introducida")
        return
    }
}

const binaryPattern = () => {
    const patterns = [prompt("Introduce el patrón")]
    const pattern = prompt("Introduzca un número binario de 12 carácteres")

    binaryComprobe(pattern, patterns[0])

    let counter = 0
    let patternAux = ""
    
    for (let i = 0; i < pattern.length; i++) {
        patternAux += pattern[i]

        if(patterns.includes(patternAux)) {
            counter++
            patternAux = patternAux[patternAux.length -1]
        } else if (patternAux.length === 2 && patternAux[0] === "0" || patternAux.length === 3) {
            patternAux = patternAux[patternAux.length -1]
        } 

    }

    alert(`El número de patrones es: ${counter}`)
}

binaryPattern()
// 000000000000
// 000101100111