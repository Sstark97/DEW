import { API_MIGUE, API_EDWIN, API_SARA } from "./const.js"
import { fetchData, users} from "./functions.js"

const $ = document

const root = $.querySelector("#root")

const migueData = await fetchData(API_MIGUE)
const edwinData = await fetchData(API_EDWIN)
const saraData = await fetchData(API_SARA)

root.append(...users(migueData))