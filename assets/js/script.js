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
function getSearch(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(function (weather) {        
        getCurrentWeather(weather);
      })
  }

//Second Fetch.
function getCurrentWeather(weather) {
    console.log({ weather });
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&APPID=${api.key}`)
      .then(current => {
        return current.json();
      }).then(function(currentWeather) {
        console.log( { currentWeather });
        displaySearch(weather, currentWeather);
        //uvWarning();

      });
  }

  //var weatherSearchResults = [{}];
  //var currentWeatherSearchResults = [{}];
  //function saveSearch (weather){
    //localStorage.setItem(query, weather.name);
    //localStorage.setItem(query, currentWeather)
    //console.log(localStorage);
//}

//Generates the Search Results.
function displaySearch(weather, currentWeather) {

    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    //Fetch and display the current Date.
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateStamp(now);
    
    //Fetch and display the current Weather Icon.
    //for(var i = 1; i <= 5; i++){
    const cond = document.querySelector('.current #status');
    var iconCode = `${weather.weather[0].icon}`;
    let icon = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    cond.classList.remove('hide');
    cond.src = icon;
    console.log(icon)
    //}

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
    highLow.innerHTML = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
    
    //Fetch and display the UV Index
    let uvIndex = document.querySelector('.current #uv-index');
    var index = `${currentWeather.current.uvi}`
    uvIndex.innerHTML = '<span>UV Index: </span>' + index;
    if (index <= 2){
        uvIndex.classList.remove('mild');
        uvIndex.classList.remove('severe');
        uvIndex.classList.remove('extreme');
        uvIndex.classList.add('favorable');
    } if (index >= 2 &&  index <= 5){
        uvIndex.classList.remove('severe');
        uvIndex.classList.remove('extreme');
        uvIndex.classList.remove('favorable');
        uvIndex.classList.add('mild');
    } if (index >= 5 && index <= 8) {
        uvIndex.classList.remove('mild');
        uvIndex.classList.remove('extreme');
        uvIndex.classList.remove('favorable');
        uvIndex.classList.add('severe');
    } if (index >= 8 && index <= 10){
        uvIndex.classList.remove('mild');
        uvIndex.classList.remove('severe');
        uvIndex.classList.remove('favorable');
        uvIndex.classList.add('extreme');
    }

    //uvIndex.innerHTML.remove('.hide');
    //uvIndex.innerHTML.add(uvi) = `UV Index: ${currentWeather.current.uvi}`;
}



function pastSearches(){
    localStorage.getItem(query);
    console.log(getSearch)

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