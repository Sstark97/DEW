/*
    Crea un programa que pida al usuario que elija una opción del siguiente menú:
    • 1) Potencia.
    • 2) Raíz.
    • 3) Redondeo.
    • 4) Trigonometría.
    • Si el usuario introduce 1, se le deberá pedir una base y un exponente y se mostrará el
    resultado en pantalla (La potencia de X elevado a Y es: )
    • Si el usuario introduce 2, se le pedirá un número (no negativo) y se mostrará el
    resultado en pantalla (La raíz de X es: )
    • Si el usuario introduce 3, se le pedirá un decimal por pantalla y se mostrará el redondeo
    al entero más próximo, al alta y a la baja.
    • Si el usuario introduce 4, se le pedirá un ángulo (entre 0 y 360) y se le mostrarán por
    pantalla los valores trigonométricos del seno, coseno y tangente.
*/

const pow = () => {
    const base = parseInt(prompt("Diga la base"))
    const exponent = parseInt(prompt("Diga el exponente"))

    alert(`El resultado de la Potencia es: ${base ** exponent}`)
}

const sqrt = () => {
    const number = parseInt(prompt("Diga un número positivo"))

    alert(number > 0 ? `El resultado de la raíz es: ${Math.sqrt(number)}` : `El ${number} es un número negativo`)
}

const rounded = () => {
    const number = parseFloat(prompt("Diga un número con decimales"))

    const numberHigh = Math.round(number)

    alert(`El número redondeado es: ${numberHigh}`)
}

const toAngle = parameter => parameter * (Math.PI / 180)

const trigonometry = () => {
    const angle = parseFloat(prompt("Diga un angulo entre 0 y 360"))

    if(angle >= 0 || angle < 361) {
        const sen = Math.sin(toAngle(angle))
        const cos = Math.cos(toAngle(angle))
        const tang = Math.tan(toAngle(angle))
    
        alert(`El seno es: ${sen}º\nEl coseno es: ${cos}º\n La tangente es: ${tang}º`)
        return
    }

    alert(`El ángulo ${angle} no está entre 0 y 360`)
    
}

const options = {
    1: () => pow(),
    2: () => sqrt(),
    3: () => rounded(),
    4: () => trigonometry()
}

const mathCalculator = () => {

    const option = parseInt(prompt("Seleccione una opción de Calculo: \n1) Potencia\n2)Raíz\n3)Redondeo\n4)Trigonometría\n"));

    if(option && options[option]) {
        options[option]()
        return
    }
    
    alert("Esa opción no existe")
}

mathCalculator()