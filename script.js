const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIkey = "ead074d1a713f3f6ad58232b8a7f894d";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        cityHide.textContent = city;
        container.style.height = "450px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(
        ".weather-details .wind span"
      );

      if (cityHide.textContent === city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = "600px";
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "./images/sun.png";
            break;
          case "Rain":
            image.src = "./images/rainy-day.png";
            break;
          case "Snow":
            image.src = "./images/snowy.png";
            break;
          case "Cloud":
            image.src = "./images/sun-cloudy.png";
            break;
          case "Mist":
            image.src = "./images/haze.png";
            break;
          case "Haze":
            image.src = "./images/haze.png";
            break;
          default:
            image.src = "./images/sun-cloudy.png";
            break;
        }
        temperature.innerHTML = `${parseInt(
          json.main.temp
        )}<span>&#8451;</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      }
    });
});
