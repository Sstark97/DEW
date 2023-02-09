import { toggleJustyfy } from "./functions.js"
import { actions } from "./const.js"

const $ = document

const root = $.querySelector("#root")
const action = $.querySelector("#action")

action.addEventListener("click", async e => {
    const element = e.target

    if(actions[element.id]) {
        const res = await actions[element.id]()

        toggleJustyfy()
        root.innerHTML = ""
        root.append(...res)
    }
})
