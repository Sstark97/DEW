import {
  isNumber,
  isOneElementOperation,
  haveOperator,
  isOperator,
  resolveOperation,
  updateCalculatorState,
  updateOutput,
} from "./functions.js"

import { operations, deleteOps, memoryOptions, calculatorState } from "./const.js"

const calculatorDOM = document.querySelector("#calculator")
const output = document.querySelector("output")
const memory = document.querySelector("#memory")
const memoryOutput = document.querySelector("#memoryOutput")
const mc = document.querySelector("#mc")
const mr = document.querySelector("#mr")
const md = document.querySelector("#md")

calculatorDOM.addEventListener("click", (e) => {
  const element = e.target
  let { firstNumber, operator, secondNumber } = calculatorState
  let res = 0

  if (element.nodeName === "BUTTON") {
    const elementName = element.name
    const elementText = element.textContent
    if (operator === "" && isNumber(elementText, firstNumber)) {
        firstNumber += elementText
    }

    if (firstNumber !== "" && operator === "" && isOperator(elementText)) {
        operator = elementText
    }

    if (operator !== "" && isNumber(elementText, secondNumber)) {
        secondNumber += elementText
    }

    if (firstNumber !== "" && !haveOperator(output.textContent) && isOneElementOperation(operator)) {
        const firts = parseFloat(firstNumber)
        res = operations[operator](firts).toFixed(2)
    }

    if (resolveOperation(firstNumber, operator, secondNumber, elementText)) {
        const firts = parseFloat(firstNumber)
        const second = parseFloat(secondNumber)
        res = operations[operator](firts, second).toFixed(2)
    }

    if(res !== 0) {
        firstNumber = res
        secondNumber = ""
        operator = ""
        updateOutput(output, res)
    } else if(firstNumber) {
        updateOutput(output, `${firstNumber}${operator}${secondNumber}`)
    }

    updateCalculatorState(firstNumber, operator, secondNumber)

    if (deleteOps[elementName]) {
        elementName === "CE" ? deleteOps[elementName](output, firstNumber, operator) : deleteOps[elementName](output)
    }
  }
})

memory.addEventListener("click", e => {
    const element = e.target
    let res = 0
  
    if (element.nodeName === "BUTTON") {
        const elementText = element.textContent

        if(memoryOptions[elementText]) {
            const [ number ] = output.textContent.split(" ")
            console.log(number)

            memoryOptions[elementText](parseFloat(number))
            updateOutput(memoryOutput, memoryOptions["MR"]())
            md.disabled = undefined
            mc.disabled = undefined
            mr.disabled = undefined
        }

        if(elementText === "MR") {
            const number = memoryOptions["MR"]()
            updateOutput(output,number)
            updateCalculatorState(number,"","")
        }

        if(memoryOutput.textContent === "0") {
            md.disabled = true
            mc.disabled = true
            mr.disabled = true
        }   
    }
})
