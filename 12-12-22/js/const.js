const validators = {
    numbers: /^\d+$/,
    letters: /^[A-Za-z\p{Ll}\p{Lu}]+$/,
    spaces: /^[A-Za-z\p{Ll}\p{Lu}\s]+$/,
    name_surname: /^[A-Za-z\p{Ll}\p{Lu}\s']+$/,
    price: /^\d+[.]\d{2}$/,
    int_and_dec: /^(\d)+([.]{0,1}\d)*$/,
    pos_and_neg: /^[-]{0,1}\d+$/,
    miles_and_dec: /^(\d{1,3}[,]){1}(\d{3}){1}([,]\d{3})*([.]{0,1}\d)*$/,
    date: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
    hour_12: /^([0][1-9]|[1][1-2])[:]([0][1-9]|[1-5][0-9])$/,
    hour_24: /^([0]\d|[1]\d|[2][0-3])[:]([0]\d|[1-5][0-9])$/,
    users: /^([a-z]|\d|[_]|[-]){3,16}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~@#_^*%\/.+:;=])[A-Za-z\d~@#_^*%\/.+:;=]{10,}$/,
    email: /^([a-z]|\d|[_]|[-])+[@][a-zA-Z]+[.](com|es|org)$/,
    url: /^http[s]?:\/{2}(www.)?([a-z]|\d)+[.][a-z]{2,3}\/?$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    colors: /^#[a-fA-F\d]{3,6}$/
}

const colors = {
    okey: 'bg-green-400 text-green-900',
    error: 'bg-red-400 text-red-900'
}

/**
 * 
 * Contraseña de usuario (fuerte): una letra minúscula, 
 * una letra mayúscula, un número, un carácter especial 
 * y mínimo 10 caracteres. 
 */

export {
    validators, 
    colors
}