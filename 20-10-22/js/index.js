import Calculator from "./Calculator.js";

const calculator = new Calculator()
const calculatorState = {
    firstNumber: undefined,
    operator: undefined,
    secondNumber: undefined
}

const calculatorDOM = document.querySelector("main div")
const output = document.querySelector("output")

calculatorDOM.addEventListener("click", e => {
    const element = e.target

    if(element.nodeName === "BUTTON" && output.textContent.length < 12) {
        const [firstNumber, operator, secondNumber] = calculatorState

        if((/[0-9]$/.test(element.textContent) || element.textContent === ",") ) {
            firstNumber += element.textContent
        }
    }
})