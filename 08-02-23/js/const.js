import { users, foro} from "./functions.js"

const API_EDWIN = "http://10.11.100.9:4000/asaderos"
const API_MIGUE = "http://10.11.100.8:4000/clientes"
const API_SARA = "http://10.11.100.14:4000/posts"

const actions = {
    migue: () => users(),
    sara: () => foro()
}

export {
    API_MIGUE,
    API_EDWIN,
    API_SARA,
    actions
}
