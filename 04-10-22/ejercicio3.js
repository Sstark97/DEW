/*
    Realiza una función Javascript que genere un array entre dos enteros dados,
    siendo sus elementos las raíces cuadradas de los números entre los índices.
*/

const generateSqrtArray = (num1,num2) => {
    const sqrtArray = []
    
    for(let i = num1 + 1; i < num2; i++) {
        sqrtArray.push(Math.sqrt(i))
    }

    return sqrtArray
}

console.log(generateSqrtArray(5,20))