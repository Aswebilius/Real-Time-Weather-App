//Establish API Key and Base URL.
var api = {
    key: "1e05fe3a438cffe5221efeafd2cf9863",
    base: "https://api.openweathermap.org/data/2.5/"
}

//Create User Search Capabilities.
const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

//Create Search Functions and Display Results.
function setQuery(evt){
    if (evt.keyCode == 13) {
    getSearch(searchBox.value);
    console.log(searchBox.value);
    }
}

//First Fetch.
function getSearch (query){
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displaySearch)
    //.then(getCurrentWeather)
}

function saveSearch (weather){
    localStorage.setItem(query, weather.name);
    console.log(localStorage);
}
//This second fetch does not work and I need a TA's help to understand why so no UV Index or 5 Day Forecast.
//Hi Ronnie, nothing I do to place the lat and lon from the First Fetch works. I worked with Cody but we couldn't figure out why.

//function getCurrentWeather (weather){
    //fetch(`${api.base}onecall?lat=&lon=&APPID=${api.key}`)
    //.then(current => {
        //return current.json();
    //}).then(displaySearch);
    //console.log("this function is running");
//}

//Generates the Search Results.
function displaySearch(weather) {
    console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    //Fetch and display the current Date.
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateStamp(now);
    
    //let cond = document.querySelector('.current .status');
    //cond.innerHTML = `${weather.weather.icon}`; 

    //Fetch and display the current Temperature.
    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    //Fetch and display the current Humidity.
    let hum = document.querySelector('.current .humidity');
    hum.innerHTML = `${Math.round(weather.main.humidity)}<span>% Humidity</span>`;

    //Fetch and display the current Weather.
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    //Fetch and display the current Wind Speed.
    let wind_el = document.querySelector('.current .wind-speed');
    wind_el.innerHTML = `${Math.round(weather.wind.speed)}<span> MPH</span>`;

    //Fetch and display the current Highs and Lows.
    let highLow = document.querySelector('.current .high-low');
    highLow.innerHTML = `${weather.main.temp_min}°F / ${weather.main.temp_max}°F`;
    //let uvIndex = document.querySelector('.current .uv-index');
    //uvIndex.innerHTML = `${current.uvi}`;
}

function pastSearches(){
    localStorage.getItem(query)

}

//Creating the Date.
function dateStamp(d) {
    let months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August",
    "September",
    "October",
    "November",
    "December"
];

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year =d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}