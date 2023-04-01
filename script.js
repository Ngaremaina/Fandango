let apiURL = "http://localhost:3000/films"

const fetchData = () =>{
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        listNames(data)
        fetchFirstData(data)
    })
}

const fetchFirstData = (value) => {
    let first = value[0]
    console.log(first)
    detailDescription(first)
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
    let runtime = document.createElement("p")
    let showtime=document.createElement("p")
    let availableTickets =document.createElement("p")
    let buyTickets = document.createElement("button")
    buyTickets.innerText = "Buy Ticket"
    image.src = value.poster
    title.innerText = value.title
    description.innerText = value.description
    runtime.innerText = `Duration: ${value.runtime} minutes`
    showtime.innerText = `Time: ${value.showtime}`

    let diff = parseInt(value.capacity) - parseInt(value.tickets_sold)
    availableTickets.innerText = `Available Tickets: ${diff}`

    
    card.appendChild(image)
    container.appendChild(title) 
    container.appendChild(description) 
    container.appendChild(runtime) 
    container.appendChild(showtime) 
    container.appendChild(availableTickets)
    container.appendChild(buyTickets) 
    
    buyTickets.addEventListener('click', buyingTickets)
}

const buyingTickets = () => {

}

document.addEventListener('DOMContentLoaded',fetchData)
