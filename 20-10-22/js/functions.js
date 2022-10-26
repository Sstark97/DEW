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
    if(output) {
        output.textContent = output.textContent.length < 12 ? value : output.textContent
    }
}

const formatRes = res => res.toString().includes(".00") ? Math.round(res) : res

const getCalculatorNumber = (element, output) => {
    const [ number ] = output.textContent.split(" ")
    const toFloat = parseFloat(number)

    return [element.textContent, toFloat]
}

const firstElementInMemory = outputNumber => {
    const memory0 = document.querySelector(".offcanvas-body .mt-2 p")
    const toFloat = memory0 !== null ? parseFloat(memory0.textContent) : outputNumber

    return [memory0, toFloat]
}

const changeButtonsState = (cond,md,mc,mr) => {
    md.disabled = undefined
    mc.disabled = undefined
    mr.disabled = undefined

    if(cond) {
        md.disabled = true
        mc.disabled = true
        mr.disabled = true
    } 
}

const createBtnContainer = () => {
    const btnContainers = document.createElement("div")
    const mc = document.createElement("button")
    const mPlus = document.createElement("button")
    const mMinus = document.createElement("button")

    mc.classList = "memoryButton w-25 h-100 me-1"
    mc.textContent = "MC"
    mPlus.classList = "memoryButton w-25 h-100 me-1"
    mPlus.textContent = "M+"
    mMinus.classList = "memoryButton w-25 h-100"
    mMinus.textContent = "M-"
    btnContainers.classList = "d-flex w-75"

    btnContainers.append(mc,mPlus,mMinus)

    return btnContainers
}

const addNewElementInMemory = (number, pos) => {
    const memory = document.querySelector(".offcanvas-body")
    const newMemory = document.createElement("div")
    const memoryValue = document.createElement("p")
    const btnContainers = createBtnContainer()

    newMemory.classList = "mt-2"

    memoryValue.textContent = number
    memoryValue.classList = "fs-4 fw-bold"
    memoryValue.id = pos

    newMemory.append(memoryValue,btnContainers)
    memory.append(newMemory)

    return memoryValue
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

const deleteOperation = (output, operator) => {
    if(output.textContent !== 0) {
        const deleteStr = output.textContent.slice(0, - 1)
        const [first, second] = deleteStr.split(operator)
        const isOperator = deleteStr.includes(operator)

        updateOutput(output,deleteStr === "" ? "0" : deleteStr)
        updateCalculatorState(first ?? "", !isOperator ? "" : operator, second ?? "")
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
    addNewElementInMemory,
    changeButtonsState,
    getCalculatorNumber,
    firstElementInMemory,
    formatRes
}