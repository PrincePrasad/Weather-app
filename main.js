const api={
    key: "42460c195df1e6f7eb8d0e01f0ca0254",
    baseURL: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById("input-box");

// event listener function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display="block";
    }
});


// get weather Report
function getWeatherReport(city){
    fetch(`${api.baseURL}?q=${city}&appid=${api.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// show weather Report
function showWeatherReport(weather){
    console.log(weather)

    let city=document.getElementById("city");
    city.innerHTML=  `${weather.name}, ${weather.sys.country}`;

    let temp = document.getElementById('temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`; 

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min) / ${ Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType=document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('img/clear.jpg')"
    } else if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundImage = "url('img/mist.jpg')"
    } else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('img/rain.jpg')"
    } else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('img/snow.jpg')"
    } else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('img/thunder.jpg')"
    } else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('img/haze.jpg')"
    } else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('img/clouds.jpg')"
    } 
}
// date manage

function dateManage(dateArg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year} `;
}