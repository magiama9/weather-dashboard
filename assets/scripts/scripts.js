/**************************************************
GLOBAL VARIABLES
***************************************************/

let currentDate;
let currentCity = "Washington DC";
let currentTemp;
let currentMaxTemp;
let currentUV;
let currentHumidity;
let currentWindSpeed;
let currentDescription;
let currentLat = "";
let currentLon = "";
let forecastMaxTemp = [];
let forecastMinTemp = [];

$(document).ready(function() {
  let weatherURL = "https://api.openweathermap.org/data/2.5/weather?";
  let uvURL = "https://api.openweathermap.org/data/2.5/uvi?";
  let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?";

  timeUpdates();
  displayCity();
  getCurrentConditions();
  // AJAX CALL TO OPENWEATHERMAP

  function getCurrentConditions() {
    $.ajax({
      url: weatherURL,
      method: "GET",
      data: {
        q: currentCity,
        APPID: "968b7fae60d97ecc132a2221d027b935",
        units: "imperial"
      },
      success: function(response) {
        console.log(response);
        currentTemp = response.main.temp;
        currentMaxTemp = response.main.temp_max;
        currentHumidity = response.main.humidity;
        currentWindSpeed = response.wind.speed;
        currentDescription = response.weather[0].main;
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;
        getUV();
        displayCurrentConditions();
        getForecast();
      },
      error: function() {
        console.log("ERROR CURRENT WEATHER");
      }
    });
  }

  //   MAKES SEPARATE CALL TO OPENWEATHER API TO FETCH UV INDEX
  function getUV() {
    $.ajax({
      url: uvURL,
      method: "GET",
      data: {
        lat: currentLat,
        lon: currentLon,
        APPID: "968b7fae60d97ecc132a2221d027b935"
      },
      success: function(response) {
        currentUV = response.value;
        console.log(currentUV);
        displayUV();
      },
      error: function() {
        console.log("ERROR UV");
      }
    });
  }

  //   MAKES SEPARATE CALL TO OPENWEATHER API TO FETCH 5 DAY FORECAST
  //   PUSHES THOSE VALUES TO THE ARRAY
  function getForecast() {
    $.ajax({
      url: forecastURL,
      method: "GET",
      data: {
        q: currentCity,
        APPID: "968b7fae60d97ecc132a2221d027b935",
        cnt: "5",
        units: "imperial"
      },
      success: function(response) {
        $.each(response.list, function(idx, val) {
          forecastMaxTemp.push(val.main.temp_max);
          forecastMinTemp.push(val.main.temp_min);
        });
      },
      error: function() {
        console.log("ERROR FORECAST");
      }
    });
  }

  function timeUpdates() {
    setTime();
    displayTime();
  }
  //   FETCHES CURRENT TIME AS A MOMENT OBJECT OF GIVEN FORMAT
  function setTime() {
    currentDate = moment().format("dddd, MMMM Do, YYYY");
    console.log(currentDate);
  }

  //   UPDATES CURRENT TIME DISPLAY
  function displayTime() {
    $("#date").text(currentDate.toUpperCase());
  }

  //   CALLS ALL THE DISPLAY FUNCTIONS FOR CURRENT CONDITIONS
  function displayCurrentConditions() {
    displayUV();
    displayCurrentTemp();
    displayWindSpeed();
    displayCurrentHigh();
    displayHumidity();
    displayCurrentDescription();
  }

  //   DISPLAYS CURRENT CITY IN UPPERCASE
  function displayCity() {
    uppercaseCity = currentCity.toUpperCase();
    $("#city").text(uppercaseCity);
  }

  // DISPLAYS CURRENT DESCRIPTOR OF CONDITIONS
  function displayCurrentDescription() {
    let uppercase = currentDescription.toUpperCase();
    $("#currentDescription").text("CURRENT CONDITIONS: " + uppercase);
  }

  //   DISPLAYS CURRENT UV
  function displayUV() {
    $("#uvIndex").text("UV INDEX: " + currentUV);
  }

  //   DISPLAYS CURRENT HIGH
  function displayCurrentHigh() {
    $("#highTemp").text("TODAY'S HIGH: " + currentMaxTemp + "\u00B0");
  }

  //   DISPLAYS CURRENT TEMP
  function displayCurrentTemp() {
    $("#currentTemp").text("CURRENT TEMP: " + currentTemp + "\u00B0");
  }

  // DISPLAYS CURRENT WIND SPEED
  function displayWindSpeed() {
    $("#wind").text("WIND SPEED: " + currentWindSpeed + " MPH");
  }

  // DISPLAYS CURRENT HUMIDITY
  function displayHumidity() {
    $("#humidity").text("HUMIDITY: " + currentHumidity + "%");
  }

  // Fetches the user search value, updates current city, and clears out the search field.
  function getUserSearch() {
    let userSearch = $("#searchField").val();
    $("#searchField").text("");
    currentCity = userSearch;
  }

  //   EVENT HANDLER FOR WHEN ENTER HAPPENS ON SEARCH
  $("#searchField").on("keydown", function(event) {
    if (event.which === 13) {
      getUserSearch();
      displayCity();
      getCurrentConditions();
    }
  });
});
