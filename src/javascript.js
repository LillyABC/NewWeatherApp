function formatDate(timestamp) {
  let dateElement = new Date(timestamp);
  let hours = dateElement.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateElement.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateElement.getDay()];
  return `${day}, ${hours}:${minutes}.`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "e18f3eef8f69e4c6f8550807956494a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
     <div class="forecast-days">${formatDay(forecastDay.dt)}</div>
       <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          width="50"
          alt="">
       <div class="forecast-temp">
       <span class="forecast-temp-max">${Math.round(
         forecastDay.temp.max
       )}° </span>
       <span class="forecast-temp-min">${Math.round(
         forecastDay.temp.min
       )}° </span></div>
    </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  // console.log(response.data);
  let temp = document.querySelector("#current-temperature");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#weather-humidity");
  let wind = document.querySelector("#weather-wind");
  let rain = document.querySelector("#weather-rain");
  let date = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temp.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  rain.innerHTML = Math.round(response.data.clouds.all);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

// city
function search(newCity) {
  let apiKey = "e18f3eef8f69e4c6f8550807956494a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  search(searchBar.value);
}

// temp
function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temperature");
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let searchForm = document.querySelector(".topButton");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitClick = document.querySelector("#bigF");
fahrenheitClick.addEventListener("click", showFahrenheit);

let celsiusClick = document.querySelector("#bigC");
celsiusClick.addEventListener("click", showCelsius);

search("Seoul");
//displayForecast();
