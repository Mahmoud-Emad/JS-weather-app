const container = document.querySelector(".container");
const searchBox = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

searchBox.addEventListener("click", () => {
  const APIKey = "a3dc77ba7cb4196deb62054ff1408616";
  const city = document.querySelector(".search-box input").value;

  if ("city" == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      const error404 = document.querySelector(".not-found");

      if (jsonResponse.cod == "404") {
        errorMessage =
          "Failed to load country resource, Please enter a valid country name.";
        document.querySelector(".error-message").innerHTML = errorMessage;
        container.style.height = "470px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      document.querySelector(".error-message").innerHTML = "";
      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      switch (jsonResponse.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/cloud.png";
      }
      temperature.innerHTML = `${parseInt(
        jsonResponse.main.temp
      )}<span>°C</span>`;
      description.innerHTML = `${jsonResponse.weather[0].description}`;
      humidity.innerHTML = `${jsonResponse.main.humidity}%`;
      wind.innerHTML = `${parseInt(jsonResponse.wind.speed)}Km/h`;
    })
    .catch((e) => {
      console.log(e);
    });
});
