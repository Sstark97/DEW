import {
  isNumber,
  isFirstNumber,
  isOneElementOperation,
  haveOperator,
  isOperator,
  resolveOperation,
  updateCalculatorState,
  updateOutput,
  addNewElementInMemory
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

let memoryPos = 0
memory.addEventListener("click", e => {
    const element = e.target
  
    if (element.nodeName === "BUTTON") {
        const elementText = element.textContent

        if(elementText === "MS") {
            const [ number ] = output.textContent.split(" ")
            const toFloat = parseFloat(number)
            memoryOptions["MS"](toFloat)

            addNewElementInMemory(toFloat, memoryPos)
            memoryPos ++
            md.disabled = undefined
            mc.disabled = undefined
            mr.disabled = undefined
        } else if(elementText === "MC") {
            memoryOptions["MC"](memoryOutput)
            const [ number ] = output.textContent.split(" ")
            updateOutput(output,number)
            updateCalculatorState(number,"","")
        } else if(memoryOptions[elementText]) {
            const [ number ] = output.textContent.split(" ")

            const res = memoryOptions[elementText](0,parseFloat(number))
            updateOutput(output, res)
            md.disabled = undefined
            mc.disabled = undefined
            mr.disabled = undefined

        }else if(elementText === "MR") {
            const number = memoryOptions["MR"](0)
            updateOutput(output,number)
            updateCalculatorState(number,"","")
        }

        if(memoryOutput.textContent === "") {
            md.disabled = true
            mc.disabled = true
            mr.disabled = true
        }   
        
    }
})

memoryOutput.addEventListener("click", e => {
    const element = e.target
  
    if (element.nodeName === "BUTTON") {
        const elementText = element.textContent
        const pos = element.parentElement.previousElementSibling

        if(elementText === "MC") {
            element.parentElement.parentElement.remove()
            console.log(memoryOutput.innerHTML.length)
            console.log(memoryOutput)
        }
        
        if(elementText === "M+" || elementText === "M-") {
            const [ number ] = output.textContent.split(" ")

            const res = memoryOptions[elementText](parseInt(pos.id),parseFloat(number))
            updateOutput(output, res)
        }

        if(memoryOutput.textContent.length === 17) {
            md.disabled = true
            mc.disabled = true
            mr.disabled = true
        } 

    }
}) 
