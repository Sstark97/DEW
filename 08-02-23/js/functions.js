const $ = document

const fetchData = async apiUrl => {
    const response = await fetch(apiUrl)
    const data = await response.json()

    return data
}

const users = usersData => {
    const title = $.createElement("h2")
    const users = usersData.map(user => {
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

        userContainer.className = "w-1/2 flex flex-col items-center border border-slate-200 rounded-xl mb-4"
        userData.className = "w-full flex flex-col items-start p-4"
        nameElement.className = "text-lg font-semibold"
        addressElement.className = "text-slate-500"

        userData.append(nameElement, emailElement, addressElement)
        userContainer.append(imageElement, userData)

        return userContainer
    })
    
    title.textContent = "Usuarios (Miguel)"
    title.className = "text-[1.4rem] text-center font-bold my-5"

    return [title, ...users]
}

export {
    fetchData,
    users
}
