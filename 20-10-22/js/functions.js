import { calculatorState } from "./const.js"

const isNumber = (elementText, number) => elementText.length === 1 && /^[0-9]/.test(elementText) || elementText === "." && !number.includes(".")

const isFirstNumber = (elementText, number) => elementText === "0" && number.length === 0

const isOneElementOperation = operator => ["%", "x2", "2√x", "1/x", "+/-"].includes(operator)

const haveOperator = textContent => {
    const operator = textContent.split("")[1]

    return ["+","-","/","*","^","%"].includes(operator)
}

const isOperator = operator => /[\+\-\/\*\^\%]/g.test(operator) || isOneElementOperation(operator)

const resolveOperation = (firstNumber, operator, secondNumber, elementText) => firstNumber !== "" && operator !== "" && secondNumber !== "" && elementText === "=" 

const updateCalculatorState = (first = "",operator = "",second = "") => {
    calculatorState.firstNumber = first
    calculatorState.operator = operator
    calculatorState.secondNumber = second
}

const updateOutput = (output, value) => {
    output.textContent = output.textContent.length < 12 ? value : output.textContent
}

const createBtnContainer = () => {
    const btnContainers = document.createElement("div")
    const mc = document.createElement("button")
    const mPlus = document.createElement("button")
    const mMinus = document.createElement("button")

    mc.classList = "memoryButton w-100 h-100"
    mc.textContent = "MC"
    mPlus.classList = "memoryButton w-100 h-100"
    mPlus.textContent = "M+"
    mMinus.classList = "memoryButton w-100 h-100"
    mMinus.textContent = "M-"
    btnContainers.classList = "d-flex w-50"

    btnContainers.append(mc,mPlus,mMinus)

    return btnContainers
}

const addNewElementInMemory = (number, pos) => {
    const memory = document.querySelector(".offcanvas-body")
    const newMemory = document.createElement("div")
    const memoryValue = document.createElement("p")
    const btnContainers = createBtnContainer()

    newMemory.classList = "mt-5"

    memoryValue.textContent = number
    memoryValue.classList = "fs-4 fw-bold"
    memoryValue.id = pos

    newMemory.append(memoryValue,btnContainers)
    memory.append(newMemory)
}

const cOperation = output => {
    output.textContent = "0"
    updateCalculatorState("", "", "")
}

const ceOperation = (output, firstNumber, operator) => {
    if(operator !== "") {
        updateCalculatorState(firstNumber, operator, "")
        updateOutput(output, `${firstNumber}${operator}`)
    } else {
        cOperation(output)
        updateCalculatorState("","", "")
    }
}

const deleteOperation = output => {
    if(output.textContent !== 0) {
        const deleteStr = output.textContent.substring(0, output.textContent.length - 1)
        const [first, operator, second] = deleteStr.split(" ")

        updateOutput(output,deleteStr !== "" ? deleteStr : "0")
        updateCalculatorState(first, operator ?? "", second ?? "")
    }
}

export {
    isNumber,
    isFirstNumber,
    isOneElementOperation,
    haveOperator,
    isOperator,
    resolveOperation,
    updateCalculatorState,
    updateOutput,
    ceOperation,
    cOperation,
    deleteOperation,
    addNewElementInMemory
}