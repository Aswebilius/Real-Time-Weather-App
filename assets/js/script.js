var api = {
    key: "1e05fe3a438cffe5221efeafd2cf9863",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if (evt.keyCode == 13) {
    getSearch(searchBox.value);
    console.log(searchBox.value);
    }
}

function getSearch (query){
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displaySearch);
}

function displaySearch(weather) {
    console.log(weather);
}