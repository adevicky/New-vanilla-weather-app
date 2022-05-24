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