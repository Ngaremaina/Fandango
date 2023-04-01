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
        names.innerHTML = element.title
        titleContainer.appendChild(names)
        
        let posId = element.id
        names.addEventListener("click", () => {listEachMovie(posId)}, {once:true})
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
    let deletemovie = document.createElement("button")

    image.src = value.poster
    title.innerText = value.title
    description.innerText = value.description
    runtime.innerText = `Duration: ${value.runtime} minutes`
    showtime.innerText = `Time: ${value.showtime}`
    deletemovie.innerText = "Delete Movie"

    let diff = parseInt(value.capacity) - parseInt(value.tickets_sold)
    availableTickets.innerText = `Available Tickets: ${diff}`

    if (diff <= 0){
        buyTickets.innerText = "SOLD OUT"
        buyTickets.disabled = true
    }
    else{
        buyTickets.innerText = "Buy Ticket"
    }

    card.appendChild(image)
    container.appendChild(title) 
    container.appendChild(description) 
    container.appendChild(runtime) 
    container.appendChild(showtime) 
    container.appendChild(availableTickets)
    container.appendChild(buyTickets) 
    container.appendChild(deletemovie)
    
    buyTickets.addEventListener('click', () => {
        value.tickets_sold ++
        let tickets_sold = value.tickets_sold
        let posId = value.id
        console.log(tickets_sold, posId)
        updateTicketNum(posId, {tickets_sold})      
       
        
    })

    deletemovie.addEventListener("click", () => {
        let posId = value.id
        deleteMovie(posId)
    })
}

const listEachMovie = (id) => {
    fetch(`${apiURL}/${id}`)
    .then(res => res.json())
    .then(data => detailDescription(data))
}

const updateTicketNum = (id, value) =>{
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(value)
    }
    fetch(`${apiURL}/${id}`, options)
    .then(res => res.json)
}

const deleteMovie = (id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        
    }
    fetch(`${apiURL}/${id}`, options)
    .then(res => res.json)
}

document.addEventListener('DOMContentLoaded',fetchData)
