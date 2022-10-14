import { maxRowsCols, colors, fonts, maxFonts } from "./consts.js"

const form = document.querySelector("#table_form")
const rows = document.querySelector("#rows")
const cols = document.querySelector("#cols")
const color = document.querySelector("#colors")
const font = document.querySelector("#fonts")
const fontSize = document.querySelector("#font_size")

const generate = document.querySelector("#generate_table")
const final = document.querySelector("#final")

const getInputValue = () => {
    const rowsValue = parseInt(rows.value)
    const colsValue = parseInt(cols.value)
    const colorValue = color.value.toUpperCase()
    const fontValue = font.value
    const fontSizeValue = parseInt(fontSize.value)

    return [rowsValue, colsValue, colorValue, fontValue, fontSizeValue]
}

const getAlertMsg = () => {
    let message = ""

    message += rows.classList.value === "error" ? "Errores:\nLas filas deben ser números del 1-12\n" : ""
    message += cols.classList.value === "error" ? "Las columnas deben ser números del 1-12\n" : ""
    message += color.classList.value === "error" ? "El color es inválido\n" : ""
    message += font.classList.value === "error" ? "La fuente es inválida\n" : ""
    message += fontSize.classList.value === "error" ? "El tamaño de la fuente debe ser un número del 10-14\n" : ""

    return message
}

const comprobeErrors = () => {
    const [ rowsValue, colsValue, colorValue, fontValue, fontSizeValue ] = getInputValue()

    rows.classList = typeof rowsValue !== "number" || !maxRowsCols.includes(rowsValue) ? "error" : ""
    cols.classList = typeof colsValue !== "number" || !maxRowsCols.includes(colsValue) ? cols.classList = "error" : ""
    color.classList = !colors.includes(colorValue) ? "error" : ""
    font.classList = !fonts.includes(fontValue) ? "error" : ""
    fontSize.classList = typeof fontSizeValue !== "number" || !maxFonts.includes(fontSizeValue) ? "error" : ""
    
    const message = getAlertMsg()

    return message
}

const generateTable = e => {
    e.preventDefault()
    const message = comprobeErrors()
    
    if(message !== "") {
        alert(message)
        return
    }

    const [ rowsValue, colsValue, colorValue, fontValue, fontSizeValue ] = getInputValue()
    generate.innerHTML = ""

    const trs = []

    for(let row = 0; row < rowsValue; row ++) {
        const tr = document.createElement("tr")
        tr.style.background = row % 2 !== 0 && colorValue
        let tds = []

        for(let col = 0; col < colsValue; col ++) {
            const td = document.createElement("td")
            td.textContent = `F${row}, C${col}`
            tds.push(td)
        }
        tr.append(...tds)
        trs.push(tr)
    }

    generate.append(...trs)
    generate.style.fontSize = `${fontSizeValue}px`
    generate.style.fontFamily = fontValue

}

form.addEventListener("submit", e => generateTable(e))
final.addEventListener("click", () => window.close())
