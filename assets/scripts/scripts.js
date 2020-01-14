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
  displayForecast();
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
    forecastMinTemp = [];
    forecastMaxTemp = [];
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
          displayForecast();
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
    $("#searchField").val("");
    currentCity = userSearch;
  }

  // FUNCTIONS TO DISPLAY EACH DAY'S FORECAST WEATHER. CALLED IN displayForecast();
  function displayDay1Weather() {
    let dayDate = moment()
      .add(1, "days")
      .format("MMMM Do");
    $("#day1").text(dayDate);
    $("#day1Date").text(dayDate);
    $("#day1High").text("High Temp: " + forecastMaxTemp[0] + "\u00B0");
    $("#day1Low").text("Low Temp: " + forecastMinTemp[0] + "\u00B0");
  }
  function displayDay2Weather() {
    let dayDate = moment()
      .add(2, "days")
      .format("MMMM Do");
    $("#day2").text(dayDate);
    $("#day2Date").text(dayDate);
    $("#day2High").text("High Temp: " + forecastMaxTemp[1] + "\u00B0");
    $("#day2Low").text("Low Temp: " + forecastMinTemp[1] + "\u00B0");
  }
  function displayDay3Weather() {
    let dayDate = moment()
      .add(3, "days")
      .format("MMMM Do");
    $("#day3").text(dayDate);
    $("#day3Date").text(dayDate);
    $("#day3High").text("High Temp: " + forecastMaxTemp[2] + "\u00B0");
    $("#day3Low").text("Low Temp: " + forecastMinTemp[2] + "\u00B0");
  }
  function displayDay4Weather() {
    let dayDate = moment()
      .add(4, "days")
      .format("MMMM Do");
    $("#day4").text(dayDate);
    $("#day4Date").text(dayDate);
    $("#day4High").text("High Temp: " + forecastMaxTemp[3] + "\u00B0");
    $("#day4Low").text("Low Temp: " + forecastMinTemp[3] + "\u00B0");
  }
  function displayDay5Weather() {
    let dayDate = moment()
      .add(5, "days")
      .format("MMMM Do");
    $("#day5").text(dayDate);
    $("#day5Date").text(dayDate);
    $("#day5High").text("High Temp: " + forecastMaxTemp[4] + "\u00B0");
    $("#day5Low").text("Low Temp: " + forecastMinTemp[4] + "\u00B0");
  }

  // CALLS EACH FORECAST DISPLAY FUNCTION. THIS FUNCTION IS CALLED WHEN THE FORECAST AJAX CALL IS SUCCESSFUL
  function displayForecast() {
    displayDay1Weather();
    displayDay2Weather();
    displayDay3Weather();
    displayDay4Weather();
    displayDay5Weather();
  }

  //   EVENT HANDLER FOR WHEN ENTER HAPPENS ON SEARCH
  $("#searchField").on("keydown", function(e) {
    if (e.which === 13) {
      getUserSearch();
      displayCity();
      getCurrentConditions();
      getForecast();
      displayForecast();
    }
  });

  //  EVENT HANDLER FOR CLICKING ON A BUTTON. IF THE USER CLICKS ON THE ICON, THE EVENT IS DELEGATED/BUBBLED(NOT SURE RE: TERMINOLOGY) UP TO THE BUTTON ITSELF
  $("a.button.button-icon-badge").on("click", function(e) {
   
    let btnTarget;
    if ($(e.target).text()) {
      btnTarget = $(e.target)
        .text()
        .trim();
      
    } else if (!$(e.target).text()) {
      btnTarget = $(e.delegateTarget)
        .text()
        .trim();
    }

    currentCity = btnTarget;
    displayCity();
    getCurrentConditions();
    getForecast();
    displayForecast();
  });
});
