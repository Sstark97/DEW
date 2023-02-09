import { API_MIGUE, API_SARA, API_EDWIN } from "./const.js"

const $ = document

const fetchData = async apiUrl => {
    const response = await fetch(apiUrl)
    const data = await response.json()

    return data
}

const toggleJustyfy = () => {
    const root = $.querySelector("#root")
    const evenly = root.className.includes("justify-evenly")
    const currentClass = evenly ? "justify-evenly" : "justify-center"
    const classJusity = evenly ? "justify-center" : "justify-evenly"

    root.classList.remove(currentClass)
    root.classList.add(classJusity)
}

const users = async () => {
    const usersData = await fetchData(API_MIGUE)

    const title = $.querySelector("h2")
    const usersMap = usersData.map(user => {
        const { name, lastname, email, address, image } = user

        const userContainer = $.createElement("div")
        const userData = $.createElement("div")
        const nameElement = $.createElement("p")
        const emailElement = $.createElement("p")
        const addressElement = $.createElement("p")
        const imageElement =  $.createElement("img")

        nameElement.textContent = `${name} ${lastname}`
        emailElement.textContent = email
        addressElement.textContent = address

        imageElement.src = image
        imageElement.alt = name

        userContainer.className = "w-[90%] lg:w-[30%] flex flex-col items-center border border-slate-200 rounded-xl mb-4 mr-2"
        userData.className = "w-full flex flex-col items-start p-4"
        nameElement.className = "text-lg font-semibold"
        addressElement.className = "text-slate-500"

        userData.append(nameElement, emailElement, addressElement)
        userContainer.append(imageElement, userData)

        return userContainer
    })
    
    title.textContent = "Usuarios (Miguel)"

    return usersMap
}

const foro = async () => {
    const foroData = await fetchData(API_SARA)

    const title = $.querySelector("h2")
    const foroMap = foroData.map(foro => {
        const { content, publicationDate, theme, title } = foro

        const foroContainer = $.createElement("div")
        const foroData = $.createElement("div")
        const titleElement = $.createElement("h3")
        const themeElement = $.createElement("p")
        const contentElement = $.createElement("p")
        const publicationDateElement =  $.createElement("p")

        titleElement.textContent = title
        themeElement.textContent = theme
        contentElement.textContent = content

        publicationDateElement.textContent = publicationDate

        foroContainer.className = "w-full lg:w-[70%] flex flex-col items-center border border-slate-200 rounded-xl mb-4"
        foroData.className = "w-full flex flex-col items-start p-4"
        titleElement.className = "text-lg font-semibold"
        contentElement.className = "text-slate-500"

        foroData.append(titleElement, contentElement, themeElement, publicationDateElement)
        foroContainer.append(foroData)

        return foroContainer
    })
    
    title.textContent = "Foro (Sara)"

    return foroMap
}

const oven = async () => {
    const ovenData = await fetchData(API_EDWIN)

    const title = $.querySelector("h2")
    const ovenMap = ovenData.map(oven => {
        const { nombre, descripcion, lugar, fecha, precio} = oven

        const ovenContainer = $.createElement("div")
        const ovenData = $.createElement("div")
        const fechaElement = $.createElement("p")
        const lugarElement = $.createElement("p")
        const nombreElement = $.createElement("h3")
        const descripcionElement =  $.createElement("p")
        const precioElement = $.createElement("p")

        fechaElement.textContent = fecha
        lugarElement.textContent = lugar
        nombreElement.textContent = nombre
        descripcionElement.textContent = descripcion
        precioElement.textContent = `Precio: ${precio}€`

        ovenContainer.className = "w-[90%] lg:w-[12%] flex flex-col items-center border border-slate-200 rounded-xl mb-4 mr-4"
        ovenData.className = "w-full flex flex-col items-start p-4"
        nombreElement.className = "w-full text-lg font-semibold border-b-2"
        fechaElement.className = "text-slate-500"

        ovenData.append(nombreElement, fechaElement, lugarElement, descripcionElement, precioElement)
        ovenContainer.append(ovenData)

        return ovenContainer
    })
    
    title.textContent = "Asadero (Edwin)"

    return ovenMap
}

export {
    fetchData,
    toggleJustyfy,
    users,
    foro,
    oven
}
