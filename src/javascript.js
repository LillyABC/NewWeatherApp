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
  return `${day}, ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
  let temp = document.querySelector("#current-temperature");
  let city = document.querySelector("#current-city");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#weather-humidity");
  let wind = document.querySelector("#weather-wind");
  let rain = document.querySelector("#weather-rain");
  let date = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");
  temp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  rain.innerHTML = Math.round(response.data.clouds.all);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

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

search("Seoul");

let searchForm = document.querySelector(".topButton");
searchForm.addEventListener("submit", handleSubmit);
