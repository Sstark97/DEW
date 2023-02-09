import { actions} from "./const.js"

const $ = document

const root = $.querySelector("#root")
const action = $.querySelector("#action")

action.addEventListener("click", async e => {
    const element = e.target

    if(actions[element.id]) {
        const res = await actions[element.id]()
        root.append(...res)
    }
})

// const edwinData = await fetchData(API_EDWIN)
// const saraData = await fetchData(API_SARA)
