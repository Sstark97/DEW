import { validators } from "./const.js"
import { validateRegex } from "./functions.js"

const btnSubmit = document.querySelector('button')
const regexSelect = document.querySelector('select')
const result = document.querySelector('#result')
const regexUsed = document.querySelector('#regex_used')
const textInput = document.querySelector('input')

window.addEventListener('load', () => {
    const regexSpan = document.createElement('span')
    regexSpan.id = "regex_span"
    regexSpan.textContent = validators[regexSelect.value]
    regexSpan.className = 'font-bold'

    regexUsed.append(regexSpan)
})

btnSubmit.addEventListener('click', () => {
    const regex = validators[regexSelect.value]
    const text = textInput.value
    const regexSpan = document.querySelector('#regex_span')
    regexSpan.textContent = regex

    result.textContent = validateRegex(text, regex)
})