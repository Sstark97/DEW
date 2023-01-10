const preferencesForm = document.querySelector("#preferences")
const deletePreferencesForm = document.querySelector("#delete_preferences")
const greetings = document.querySelector("h2")
const body = document.querySelector("body")

const initializeFormsWith = preferencesName => {
    preferencesForm.classList.add("hidden")
    deletePreferencesForm.classList.remove("hidden")
    deletePreferencesForm.classList.add("flex")
    greetings.textContent = `Bienvenido ${preferencesName}`
}

window.addEventListener("load", () => {
    const preferences = JSON.parse(localStorage.getItem("preferences"))

    if(preferences) {
        body.style.color = preferences.font_color
        body.style.background = preferences.background_color
        initializeFormsWith(preferences.name)
    }
})

preferencesForm.addEventListener("click", e => {
    const element = e.target

    if(element.nodeName === "BUTTON") {
        const fields = [...document.querySelectorAll("input")]

        // Mapeo los datos de los Inputs
        const fieldsMapValues = fields.map(fieldInput => {
            const { name, value } = fieldInput
            return [
                name, 
                value
            ]
        })

        // Convierto a objeto
        const preferences = Object.fromEntries(fieldsMapValues)
        const isAnyUndefined = fieldsMapValues.some(field => field[1] === "")

        if(!isAnyUndefined) {
            localStorage.setItem("preferences", JSON.stringify(preferences))
            initializeFormsWith(preferences.name)
        }
    }
})

deletePreferencesForm.addEventListener("click", e => {
    const element = e.target

    if(element.nodeName === "BUTTON") {
        localStorage.clear()
    }
})