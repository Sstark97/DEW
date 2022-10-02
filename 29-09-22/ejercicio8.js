/*
    Crea un programa que pida al usuario una propuesta de contraseña y compruebe si cumple con 
    los siguientes requisitos.
    • Tiene entre 8 y 16 caracteres.
    • Tiene una letra mayúscula.
    • Tiene una letra minúscula.
    • Tiene un número.
    • Tiene uno de los siguientes valores: guión alto, guión bajo, arroba, almohadilla, 
    dólar, tanto por ciento o ampersand.
    • Si cumple con todos los requisitos se considera una contraseña segura, de lo contrario 
    mostrará que es una contraseña no segura
*/

const firstCase =  pass => pass.length >= 8 && pass.length <= 16

const secondCase = pass => /[A-Z]+/.test(pass)

const thirdCase = pass => /[a-z]+/.test(pass)

const fourthCase = pass => /[0-9]+/.test(pass)

const fiveCase = pass => /[-_$@#%&]+/.test(pass)

const comprobeAllCases = pass => firstCase(pass) && secondCase(pass) && thirdCase(pass) && fourthCase(pass) && fiveCase(pass) ? "La contraseña es segura" : "La constraseña es insegura"

const userNamePassword = () => {
    const password = prompt("Diga su contraseña")

    alert(comprobeAllCases(password))
}

userNamePassword()