
console.log('Client side javascript file is loaded!')
//fetch runs only in client side. If we try to run this with nodejs it won't work.
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) =>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // Doesn't refresh the browser on submit
    const location = searchElement.value
    console.log('testing!' + location)
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => { // for local run
    fetch('/weather?address=' + location).then((response) => { // for heroku
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            console.log(data.error)
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})