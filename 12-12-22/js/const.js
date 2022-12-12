const validators = {
    numbers: /^\d+$/,
    letters: /^[A-Za-z\p{Ll}\p{Lu}]+$/,
    spaces: /^[A-Za-z\p{Ll}\p{Lu}\s]+$/,
    name_surname: /^[A-Za-z\p{Ll}\p{Lu}\s']+$/,
    price: /^\d+[.]\d{2}$/
}

export {
    validators
}