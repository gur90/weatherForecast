//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

//import fetch from "node-fetch";

const box = document.getElementById("weather-box");
const weathercodeElement = document.getElementById("weather-code");
const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const windElement = document.getElementById("wind");


function getWeatherByCode(code) {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
    case 2:
    case 3:
      return "Mainly clear, partly cloudy, and overcast";
    case 45, 48:
        return "Fog and depositing rime fog";
    case 51, 53, 55:
        return "Drizzle: Light, moderate, and dense intensity";
    case 56, 57:
        return "Freezing Drizzle: Light and dense intensity";
    case 61,63,65:
        return "Rain: Slight, moderate and heavy intensity";
    case 66,67:
        return "Freezing Rain: Light and heavy intensity";
    case 71,73,75:
        return "Snow fall: Slight, moderate, and heavy intensity";
    case 77:
        return "Snow grains";  
    case 80,81,82:
        return "Rain showers: Slight, moderate, and violent"; 
    case 85,86:
        return "Snow showers slight and heavy"; 
    case 95:
        return "Thunderstorm: Slight or moderate";
    case 96,99:
        return "Thunderstorm with slight and heavy hail";                                 
    default:
      return "-";
  }
}
async function f(){
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const obj = await response.json();
   // console.log(obj);  // посмотрели объект, узнали имена полей
    const {country, latitude, longitude} = obj; // с помощью деструктуризации разобрали объет и сохранили информацию в переменные
    //console.log(country +" "+ latitude+" "+ longitude);
    const weatherResponce=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
    const objWeather=await weatherResponce.json();
//console.log(objWeather);
    const {temperature, windspeed, weathercode}=objWeather.current_weather;
    console.log(temperature+" "+windspeed+" "+ weathercode);
    cityElement.innerText = country;
    cityElement.style.font="italic bold 40px arial,serif";
    cityElement.style.margin="20px";
    temperatureElement.innerText = temperature + "°";
    temperatureElement.style.font="italic bold 40px arial,serif";
    temperatureElement.style.margin="20px";
    weathercodeElement.innerText = getWeatherByCode(weathercode);
    weathercodeElement.style.font="italic bold 25px arial,serif";
    windElement.innerText = windspeed;
    windElement.style.font="italic bold 40px arial,serif";
    windElement.style.margin="30px";
}
  f();