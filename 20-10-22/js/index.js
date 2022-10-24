import {
  isNumber,
  isFirstNumber,
  isOneElementOperation,
  haveOperator,
  isOperator,
  resolveOperation,
  updateCalculatorState,
  updateOutput,
  addNewElementInMemory,
  changeButtonsState,
  getCalculatorNumber
} from "./functions.js"

import { operations, deleteOps, memoryOptions, calculatorState } from "./const.js"

const calculatorDOM = document.querySelector("#calculator")
const output = document.querySelector("output")
const memory = document.querySelector("#memory")
const memoryOutput = document.querySelector(".offcanvas-body")
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
    if (operator === "" && isNumber(elementText, firstNumber) && !isFirstNumber(elementText,firstNumber)) {
        firstNumber += elementText
    }

    if (firstNumber !== "" && operator === "" && isOperator(elementText)) {
        operator = elementText
    }

    if (operator !== "" && isNumber(elementText, secondNumber)) {
        secondNumber += elementText
    }

    if (firstNumber !== "" && !haveOperator(output.textContent) && isOneElementOperation(operator)) {
        const first = parseFloat(firstNumber)
        res = operator !== "2√x" ? operations[operator](first).toFixed(2) : first
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

let pos = 0
memory.addEventListener("click", e => {
    const element = e.target
  
    if (element.nodeName === "BUTTON") {
        const [elementText, toFloat]= getCalculatorNumber(element, output)
        let res

        if(elementText === "MC") {
            memoryOptions["MC"](memoryOutput)
            pos = 0
        } else if(memoryOptions[elementText]) {
            res = elementText !== "MS" ? memoryOptions[elementText](toFloat,0) : memoryOptions[elementText](toFloat)
        } else if(elementText === "MR") {
            res = memoryOptions["MR"](0)
        }

        if(elementText === "MS") {
            addNewElementInMemory(res, pos)
            pos++
        }

        updateOutput(output,res ?? toFloat)
        updateCalculatorState(res ?? toFloat,"","")
        changeButtonsState(memoryOutput.textContent === "",md,mc,mr)   
    }
})

memoryOutput.addEventListener("click", e => {
    const element = e.target
  
    if (element.nodeName === "BUTTON") {
        const [elementText, toFloat]= getCalculatorNumber(element, output)
        const { previousElementSibling: pos } = element.parentElement

        if(elementText === "MC") {
            element.parentElement.parentElement.remove()
        }
        
        if(elementText === "M+" || elementText === "M-") {
            const res = memoryOptions[elementText](toFloat,parseInt(pos.id))

            updateOutput(output, res)
            updateCalculatorState(res === 0 ? "" : res, "", "")
        }

        changeButtonsState(memoryOutput.textContent.length === 17,md,mc,mr)   
    }
}) 
