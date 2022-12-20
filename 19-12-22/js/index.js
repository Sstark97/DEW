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

            createTable(values, container)
        }
        
    } else if (element.className.includes("delete")) {
        const pos = parseInt(element.id)

        values = values.filter((e, index) => index !== pos)
        document.cookie = `values=[${values}]`;

        createTable(values, container)
    }

})

