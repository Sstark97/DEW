const validators = {
    numbers: /^\d+$/,
    letters: /^[A-Za-z\p{Ll}\p{Lu}]+$/,
    spaces: /^[A-Za-z\p{Ll}\p{Lu}\s]+$/,
    name_surname: /^[A-Za-z\p{Ll}\p{Lu}\s']+$/,
    price: /^\d+[.]\d{2}$/,
    int_and_dec: /^(\d)+([.]{0,1}\d)*$/,
    pos_and_neg: /^[-]{0,1}\d+$/,
    miles_and_dec: /^(\d[_]){1}(\d{3}){1}([_]\d{3})*([.]{0,1}\d)*$/,
    date: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
    hour_12: /^([0][1-9]|[1][1-2])[:]([0][1-9]|[1-5][0-9])$/,
    hour_24: /^([0]\d|[1]\d|[2][0-3])[:]([0]\d|[1-5][0-9])$/
}

export {
    validators
}