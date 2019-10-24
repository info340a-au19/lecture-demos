'use strict';

function renderCookie() {
    let cookieImageElement = document.createElement('img');
    cookieImageElement.src = "img/cookie.png";
    cookieImageElement.alt = "a yummy cookie"

    let jar = document.querySelector('#cookie-jar')
    jar.appendChild(cookieImageElement);
}

function renderCookieJar(numCookies) {
    let jar = document.querySelector('#cookie-jar')
    jar.innerHTML = '';

    //create only this number of cookies
    for(let i=0; i<numCookies; i++){
        renderCookie();
    }
}

let state = {
    numCookies: 0
}

let button = document.querySelector('#button1')
button.addEventListener('click', function() {
    state.numCookies++; //increment cookies
    renderCookieJar(state.numCookies)
})

let button2 = document.querySelector('#button2')
button2.addEventListener('click', function() {
    state.numCookies += 3; //increment cookies
    renderCookieJar(state.numCookies)
})


