import { getAllCharacters } from "./functions.js"

const main = document.querySelector("main")

window.addEventListener("load", async () => {
    const characters = await getAllCharacters()

    const charactersCards = characters.map(character => {
        const { name, image } = character
        const characterCard = document.createElement("div")
        const characterImg = document.createElement("img")
        const characterName = document.createElement("p")

        characterImg.src = image
        characterName.textContent = name

        characterCard.className = "w-[80%] sm:w-[45%] lg:[w-25%] xl:w-[15%] flex flex-col items-center m-3 p-3 border border-slate-200 shadow-lg rounded hover:cursor-pointer"
        characterImg.className = "opacity-75 hover:opacity-100"
        characterName.className = "font-semibold py-2"

        characterCard.append(characterImg, characterName)

        return characterCard
    })

    main.append(...charactersCards)
})
