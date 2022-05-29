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

function currentDay(timestamp) {
  let date= new Date(timestamp * 1000);
  let day= date.getDay();
  let days= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  return days[day];
}

function displayForecast(response) {
  let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <6 ){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${currentDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min">  ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "654e7c2b1cb01736424b3824e69350d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayCurrentWeather(response) {
let newLocation= document.querySelector("#new-location");
let temprature=document.querySelector("#temprature");
let description=document.querySelector("#description");
let humidity= document.querySelector("#humidity");
let wind= document.querySelector("#wind");
let iconElement= document.querySelector("#icon");
let bodyElement= document.querySelector("bTemp");
let bTemp = {
'bTemp_1' : 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/035/691/original/10.jpg?1653852586',
'bTemp_2' : 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/035/690/original/sunny.jpg?1653852236',
'bTemp_3' : 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/035/716/original/danny-jongerius-wJjAbEt_ZAw-unsplash.jpg?1653861259',
'bTemp_4' : 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/035/693/original/cloudy-sky.jpg?1653853034',
'bTemp_5' : 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/035/694/original/cloud.jpg?1653855724'
};
let tempBg = response.data.main.temp;
let bTempImg = "";

if(tempBg > 100){
    bTempImg = "bTemp_1";
}else if(tempBg <= 25) {
  bTempImg="bTemp_4";
}else if(tempBg<= 30){
  bTempImg= "bTemp_5";
}else if(tempBg<= 40){
  bTempImg= "bTemp_2";
}else {
  bTempImg= "bTemp_3"
}



newLocation.innerHTML=response.data.name;
temprature .innerHTML= Math.round(response.data.main.temp);
description.innerHTML = response.data.weather[0].main;
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = response.data.wind.speed;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].main);
bodyElement.style.backgroundImage = "url('"+ bTemp[bTempImg] +"')";
getForecast(response.data.coord);
}

function search(city) {
   let apiKey= "654e7c2b1cb01736424b3824e69350d2";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrentWeather); 
}

function handleSubmit(event)  {
    event.preventDefault();
    let city=document.querySelector("#city-input").value
   search(city); 
}

let searchForm= document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);

function searchLocation(position){
  let apiKey= "654e7c2b1cb01736424b3824e69350d2";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
axios.get(apiUrl).then(displayCurrentWeather); 
}

function locationButton(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation= document.querySelector("#current-icon");
currentLocation.addEventListener("click", locationButton);

let city="Paris";
let apiKey= "654e7c2b1cb01736424b3824e69350d2";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrentWeather); 




search("Okitipupa");