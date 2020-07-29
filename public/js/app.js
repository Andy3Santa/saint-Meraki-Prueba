//const e = require("express")

console.log('CLient SIde')

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)

    })

})



const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#messageOne')
const messageTwo=document.querySelector('#messageTwo')

//messageOne.textContent='FRom Russia'


weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value

    messageOne.textContent='Loading'
    messageTwo.textContent=''



    //fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            messageOne.textContent=data.error

            console.log(data.error)
        }
        else{

            messageOne.textContent=data.Location
            messageTwo.textContent=data.forecast

            console.log(data.Location)
            console.log(data.forecast)
        }
    })

})






   // console.log(location)
})

