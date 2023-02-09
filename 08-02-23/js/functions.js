import { API_MIGUE, API_SARA } from "./const.js"

const $ = document

const fetchData = async apiUrl => {
    const response = await fetch(apiUrl)
    const data = await response.json()

    return data
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

        userContainer.className = "w-[90%] lg:w-[16%] flex flex-col items-center border border-slate-200 rounded-xl mb-4"
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
        const { content, numViews, publicationDate, theme, title } = foro

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

        foroContainer.className = "w-[55%] flex flex-col items-center border border-slate-200 rounded-xl mb-4"
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

export {
    fetchData,
    users,
    foro
}
