import { cookieToArray, createTable } from "./functions.js";

const main = document.querySelector("main");
const input = document.querySelector("input");
const container =document.querySelector("#container");

let values = cookieToArray() ?? [];

window.addEventListener("load", () => {
    if(values.length !== 0) {
        createTable(values, container)
    }
})

main.addEventListener("click", e => {
    const element = e.target;

    if (element.className.includes("add")){
        if (input.value !== ""){
            values.push(input.value);
            document.cookie = `values=[${values}]`;

            input.value = ""
            createTable(values, container)
        }
        
    } else if (element.className.includes("delete")) {
        const pos = parseInt(element.id)

        values = values.filter((e, index) => index !== pos)
        document.cookie = values.length !== 0 ? `values=[${values}]` : 'values= ;max-age=0';
        container.className = values.length !== 0 ? container.className : container.className.replace("border border-slate-200", "");

        createTable(values, container)
    }
})

