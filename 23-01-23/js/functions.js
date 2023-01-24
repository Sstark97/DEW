import { API_URI } from "./const.js"

const getAllCharacters = async () => {
    const response = await fetch(API_URI)
    const allCharacters = await response.json()

    return allCharacters
}

export {
    getAllCharacters
}