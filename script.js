let apiURL = "http://localhost:3000/films"

const fetchData = () =>{
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        listNames(data)
        fetchFirstData(data)
    })
}
const listNames = (value)=>{
    value.forEach(element => {
        let titleContainer = document.querySelector(".side-bar")    
        let names=document.createElement("a")
        names.innerText = element.title
        titleContainer.appendChild(names)
    })
}

const detailDescription = (value) => {
    let card = document.querySelector(".card")
    let container = document.querySelector(".card-details")
    let image = document.createElement("img")
    let title= document.createElement("h4")
    let description = document.createElement("p")
    let runtime =document.createElement("p")
    let showtime=document.createElement("p")
    let availableTickets=document.createElement("p")
    image.src = value.poster
    title.innerText = value.title
    description.innerText = value.description
    runtime.innerText = value.runtime
    showtime.innerText = `Time: ${value.showtime}`
    availableTickets.innerText = value.capacity
    card.appendChild(image)
    container.appendChild(title) 
    container.appendChild(description) 
    container.appendChild(runtime) 
    container.appendChild(showtime) 
    container.appendChild(availableTickets) 
}
const fetchFirstData = (value) => {
    let first = value[0]
    console.log(first)
    detailDescription(first)
}

document.addEventListener('DOMContentLoaded',fetchData)
