/*
    Crea un programa que muestre la hora actual en diferentes formatos, según el valor que meta
    el usuario por parámetro:
    • 1) 14:35:07 (hora detallada con minutos y segundos)
    • 2) 02:35 PM o 02:35:07 AM (hora con minutos y AM o PM según sea antes o
    después del medio día).
*/

const options = {
    1: undefined,
    2: "en-US"
}

const getTimeFormat = format => [1,2].includes(format) ? new Date().toLocaleTimeString(options[format]) : "Ese formato no es correcto"

console.log(getTimeFormat(1))