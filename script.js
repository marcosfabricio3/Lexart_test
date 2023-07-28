// Elementsours
const chatInput = document.querySelector('.chat-box')
const sendMesage = document.querySelector('#send-mesage')
const chatV = document.querySelector('.chat-container')
const spaceNone = /^(?=\D*$)(?=\S{0,7}$).*\S.*$/;

var interactionCounter = 0
var username = ''
var password = ''

// Hours 
function setTime() {
    var currentDate = new Date()
    var hours = currentDate.getHours()
    var minutes = currentDate.getMinutes()
    var period = hours >= 12? 'PM' : 'AM'
    if (hours > 12) {
        hours = hours - 12
    }
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var currentTime = hours + ':' + minutes + ' ' + period;
    
    return currentTime
}

// clear input and show end
function descendToFinal() {
    window.scrollTo(0, document.body.scrollHeight);
    // borrar input text 
    chatInput.value = ''
}

// create user message
function createUserMessage() {
    // create div time
    var newElementDivTime = document.createElement('div')
    newElementDivTime.classList.add('conversation-time')
    newElementDivTime.textContent = setTime()
    chatV.appendChild(newElementDivTime)
    // create div 
    var newElementDiv = document.createElement('div')
    newElementDiv.classList.add('container-mesage-user')
    // create p 
    var newElementP = document.createElement('p')
    newElementP.classList.add('text-user')
    newElementP.textContent = chatInput.value
    // final message
    newElementDiv.appendChild(newElementP)
    chatV.appendChild(newElementDiv)
}


// create bot message
function createMessageBot(mesage) {
    // create div 
    var newElementDiv = document.createElement('div')
    newElementDiv.classList.add('container-mesage-bot')
    // create p 
    var newElementP = document.createElement('p')
    newElementP.classList.add('text-bot')
    newElementP.textContent = mesage
    // final message
    newElementDiv.appendChild(newElementP)
    chatV.appendChild(newElementDiv)
}

// create message in response to loan
function createLoanMessage(mesage, url) {
    // create div 
    var newElementDiv = document.createElement('div')
    newElementDiv.classList.add('container-mesage-bot')
    // create p 
    var newElementA = document.createElement('a')
    newElementA.classList.add('text-bot')
    newElementA.href = url
    newElementA.textContent = mesage
    // final message
    newElementDiv.appendChild(newElementA)
    chatV.appendChild(newElementDiv)
}

// create first reply
function firstresponse() {
    if(interactionCounter == 0){
        createMessageBot('Hello! 👋 I am the virtual assistant who will assist you in this conversation. To proceed, I need you to enter your username and password. Thank you! 😊')
        createMessageBot('Please enter your username:')
        interactionCounter = 1

    }
}

// require username
function requestUsername() {
    if(interactionCounter == 1) {
        if(spaceNone.test(chatInput.value)) {
            createMessageBot('The username provided is not valid. Please try again and make sure to provide a valid username without any spaces, with at least 1 number:')
        }else {
            createMessageBot('Please enter your password:')

            interactionCounter = 2
            username = chatInput.value
        }
    }
}

// require password
function requestPassword() {
    if(interactionCounter == 2) {
        if(spaceNone.test(chatInput.value)) {
            createMessageBot('The password provided is not valid. Please try again and make sure to provide a valid password without any spaces, with at least 1 number:')
        }else {
            createMessageBot('Sign up successful')
            createMessageBot(`Hello ${username}! 👋 Welcome. How can I assist you today?`)

            interactionCounter = 3
            password = chatInput.value
        }
    }
}

// create answer
function answers() {
    var inputLowercase = chatInput.value.toLowerCase()

    if(!password == '') {
        if (inputLowercase.includes('hello')) {
            createMessageBot("Hello! I'm here to help you with anything you need. How can I assist you today?")
        } else if (inputLowercase.includes('goodbye')) {
            createMessageBot('Goodbye! If you need anything else in the future, feel free to come back. Have a great day!')
        } else if (inputLowercase.includes('good')) {
            createMessageBot('Can help You with any other think?')
        } else if (inputLowercase.includes('i want')){
            createMessageBot("Hello! I'm here to help you with anything you need. How can I assist you today?")
        } else if (inputLowercase.includes('loan')){
            createMessageBot('suggested options:')
            createLoanMessage('Do you want to apply for a loan?', './Site-under-development.html')
            createLoanMessage('Loan conditions', './Site-under-development.html')
            createLoanMessage('Help', './Site-under-development.html')
        } else {
            createMessageBot("I'm sorry, I don't have an answer for that question right now. Could you try asking me about another topic or pose a different query? I'm here to assist you to the best of my ability")
        }
    }

}

// post and message reply
function postMesage(){

    if (chatInput.value == ''){
    } else {
        // create user message
        createUserMessage()
        if (password == '') {
            // require password
            requestPassword()
        } else {
            answers()
        }
        // require username
        requestUsername()
        // create first reply
        firstresponse()
        // clear input and show end
        descendToFinal()
    }
}

// send message
sendMesage.addEventListener('click', postMesage)
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        postMesage();
    }
  });