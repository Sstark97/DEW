/*
    Realiza un programa que calcule cuántos números son a la vez primos y
    palíndromos desde el 1 hasta 100000.
    Debe guardar todos ellos en un array y al finalizar el proceso imprimir dicho array.
*/

const isPrime = num => {
    let result = num > 1 && num % 1 === 0 && num % num === 0

    for(let i = num - 1; i > 1; i-- ){
        if(num % i === 0 ) {
            result = false
        }
    }

    return result
}

const isPalyndrome = num => {
    const reverseNum = num.toString().split("").reverse().join("")

    return num.toString() === reverseNum
}

const palyndromeNumbers = () =>{
    const result = []

    for(let number = 0; number <= 10000; number++) {
        if(isPrime(number) && isPalyndrome(number)) {
            result.push(number)
        }
    }

    return result
}

console.log(palyndromeNumbers())

