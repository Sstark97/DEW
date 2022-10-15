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

    message += rows.classList.value.includes("bg-danger") ? "Errores:\nLas filas deben ser números del 1-12\n" : ""
    message += cols.classList.value.includes("bg-danger") ? "Las columnas deben ser números del 1-12\n" : ""
    message += color.classList.value.includes("bg-danger") ? "El color es inválido\n" : ""
    message += font.classList.value.includes("bg-danger") ? "La fuente es inválida\n" : ""
    message += fontSize.classList.value.includes("bg-danger") ? "El tamaño de la fuente debe ser un número del 10-14\n" : ""

    return message
}

const comprobeErrors = () => {
    const [ rowsValue, colsValue, colorValue, fontValue, fontSizeValue ] = getInputValue()

    rows.classList = typeof rowsValue !== "number" || !maxRowsCols.includes(rowsValue) ? "form-control bg-danger" : "form-control"
    cols.classList = typeof colsValue !== "number" || !maxRowsCols.includes(colsValue) ? "form-control bg-danger" : "form-control"
    color.classList = !colors.includes(colorValue) ? " form-control bg-danger" : "form-control"
    font.classList = !fonts.includes(fontValue) ? "form-control bg-danger" : "form-control"
    fontSize.classList = typeof fontSizeValue !== "number" || !maxFonts.includes(fontSizeValue) ? "form-control bg-danger" : "form-control"

    return getAlertMsg()
}

const removePrevHtml = () => {
    generate.innerHTML = ""
    const beforeH2 = document.querySelector("h2")
    if(beforeH2 !== null) beforeH2.remove()
}

const generateTable = e => {
    e.preventDefault()

    // Control de Errores
    const message = comprobeErrors()
    
    if(message !== "") {
        console.log(message)
        alert(message)
        return
    }

    // Traigo los valores de cada input y elimino el HTML Previo
    const [ rowsValue, colsValue, colorValue, fontValue, fontSizeValue ] = getInputValue()
    removePrevHtml()

    // Genero la Tabla
    const trs = []

    for(let row = 0; row < rowsValue; row ++) {
        const tr = document.createElement("tr")
        tr.style.background = row % 2 !== 0 && colorValue
        const tds = []

        for(let col = 0; col < colsValue; col ++) {
            const td = document.createElement("td")
            td.textContent = `F${row}, C${col}`
            td.style.color = row % 2 !== 0 && "#fff"
            tds.push(td)
        }
        tr.append(...tds)
        trs.push(tr)
    }

    // Creo un H2 con el tamaño de la tabla
    const h2 = document.createElement("h2")
    h2.textContent = `Tabla de ${rowsValue} x ${colsValue}`
    h2.classList = "text-center"

    // Inserto el H2 antes de la Tabla
    generate.insertAdjacentElement("beforebegin",h2);

    // Agrego los trs a la tabla y le añado la fuente y su tamaño
    generate.append(...trs)
    generate.style.fontSize = `${fontSizeValue}px`
    generate.style.fontFamily = fontValue

}

form.addEventListener("submit", e => generateTable(e))
final.addEventListener("click", () => window.close())
