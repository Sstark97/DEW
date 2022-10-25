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
        res = operations[operator](first).toFixed(2)
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
        const [ elementText, n]= getCalculatorNumber(element, output)
        const memory0 = document.querySelector(".offcanvas-body .mt-5 p")
        const toFloat = memory0 !== null ? parseFloat(memory0.textContent) : n
        let res

        if(elementText === "MC") {
            memoryOptions["MC"](memoryOutput)
            pos = 0
        } 

        if(elementText === "M+" || elementText === "M-") {
            res = memoryOptions[elementText](n,0,true)
            memoryOptions["UPDATE_MEMORY"](res,0)
        }

        if(elementText === "MS") {
            memoryOptions["MS"](res ?? n)
            addNewElementInMemory(res ?? n, pos)
            pos++
        }
        
        if(memory0) {
            memory0.textContent = res ?? toFloat
        }

        changeButtonsState(memoryOutput.textContent === "",md,mc,mr)   
    }
})

memoryOutput.addEventListener("click", e => {
    const element = e.target
  
    if (element.nodeName === "BUTTON") {
        const elementText = element.textContent
        const { previousElementSibling: number } = element.parentElement
        const pos = memoryOptions["MEMORY_POS"](number.textContent)

        if(elementText === "MC") {
            element.parentElement.parentElement.remove()
            memoryOptions["REMOVE_MEMORY"](pos)
        }
        
        if(elementText === "M+" || elementText === "M-") {
            const toFloat = parseFloat(output.textContent)
            const res = memoryOptions[elementText](toFloat,pos,true)

            memoryOptions["UPDATE_MEMORY"](res,pos)

            number.textContent = res
        }

        changeButtonsState(memoryOutput.textContent.length === 17,md,mc,mr)   
    }
}) 
