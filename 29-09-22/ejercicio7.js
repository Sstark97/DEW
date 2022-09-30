/*
    Crea un programa que pida al usuario su nombre y apellidos y muestre:
    • El tamaño del nombre más los apellidos (sin contar espacios).
    • La cadena en minúsculas y en mayúsculas.
    • Que divida el nombre y los apellidos y los muestre en 3 líneas, donde ponga 
    Nombre: / Apellido 1: / Apellido 2:
    • Una propuesta de nombre de usuario, compuesto por la inicial del nombre, el 
    primer apellido y la inicial del segundo apellido: ej. Para Laura Folgado Galache 
    sería lfolgadog.
    • Una propuesta de nombre de usuario compuesto por las tres primeras letras 
    del nombre y de los dos apellidos: ej. laufolgal.
*/

const sizeName = userName => userName.split(" ").join("").length

const divisionName = userName => {
    const userNameArray = userName.split(" ")

    return `Nombre: ${userName[0]}\nApellido 1: ${userName[1]}\n${userNameArray[2]}`
}

const firstUsername = userName => {
    const firstLetter = userName[0]
    const userNameArray = userName.split(" ")
    const secondLetter = userNameArray[2][0]

    return `${firstLetter}${userNameArray[1]}${secondLetter}`.toLowerCase()
}

const secondUserName = userName => {
    const userNameArray = userName.split(" ")
    const name = userNameArray[0].substring(0,3)
    const firstSurname = userNameArray[1].substring(0,3)
    const secondSurName = userNameArray[2].substring(0,3)

    return `${name}${firstSurname}${secondSurName}`.toLowerCase()
 }

const userNamePrompt = () => {
    const userName = prompt("Diga su nombre y apellidos")
    const userNameLower = userName.toLowerCase()
    const userNameUpper = userName.toUpperCase()

    const response = `Tamaño: ${sizeName(userName)}\nMinuscula: ${userNameLower}\nMayuscula: ${userNameUpper}\nPrimer nombre de usuario: ${firstUsername(userName)}\nSegundo nombre de usuario: ${secondUserName(userName)}`

    alert(response)

}

userNamePrompt()