import {
  isNumber,
  isOneElementOperation,
  isOperator,
  resolveOperation,
  updateCalculatorState,
  updateOutput,
} from "./functions.js"

import { operations, deleteOps, calculatorState } from "./const.js"

const calculatorDOM = document.querySelector("main div")
const output = document.querySelector("output")

calculatorDOM.addEventListener("click", (e) => {
  const element = e.target
  let { firstNumber, operator, secondNumber } = calculatorState

  if (element.nodeName === "BUTTON") {
    const elementName = element.name
    const elementText = element.textContent
    if (operator === "" && isNumber(elementText, firstNumber)) {
        firstNumber += elementText
    }

    if (firstNumber !== "" && isOperator(elementText)) {
        operator = elementText
    }

    if (operator !== "" && isNumber(elementText, secondNumber)) {
        secondNumber += elementText
    }

    if (firstNumber !== "" && isOneElementOperation(operator)) {
        const firts = parseFloat(firstNumber)
        const res = operations[operator](firts).toFixed(2)

        updateOutput(output, res)
        firstNumber = res
        secondNumber = ""
        operator = ""
    }

    if (resolveOperation(firstNumber, operator, secondNumber, elementText)) {
        const firts = parseFloat(firstNumber)
        const second = parseFloat(secondNumber)
        const res = operations[operator](firts, second).toFixed(2)

        updateOutput(output, res)
        firstNumber = res
        secondNumber = ""
        operator = ""
    }

    updateOutput(output, `${firstNumber}${operator}${secondNumber}`)
    updateCalculatorState(firstNumber, operator, secondNumber)

    if (deleteOps[elementName]) {
        elementName === "CE" ? deleteOps[elementName](output, firstNumber, operator) : deleteOps[elementName](output)
    }
  }
});
