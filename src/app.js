function timeNow(Date) {
let days= ["Sunday","Monday", "Tuesday","Wedneday","Thursday","Friday","Saturday"];
let day= days[now.getDay()];
let hours= now.getHours();
if (hours < 10){
    hours= `0${hours}`
}
let minutes= now.getMinutes();
if (minutes < 10) {
    minutes= `0${minutes}`;
}

return `${day}, ${hours}:${minutes}`;
}
let now= new Date();
let realTme= document.querySelector("#current-time");
realTme.innerHTML=timeNow(now)

function displayCurrentWeather(response) {
let newLocation= document.querySelector("#new-location");
let temprature=document.querySelector("#temprature");
let description=document.querySelector("#description");
let humidity= document.querySelector("#humidity");
let wind= document.querySelector("#wind");
let iconElement= document.querySelector("#icon");


newLocation.innerHTML=response.data.name;
temprature .innerHTML= Math.round(response.data.main.temp);
description.innerHTML = response.data.weather[0].main;
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = response.data.wind.speed;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].main);
}

function search(city) {
   let apiKey= "654e7c2b1cb01736424b3824e69350d2";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrentWeather); 
}



let city= "Okitipupa";
let apiKey= "654e7c2b1cb01736424b3824e69350d2";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrentWeather); 