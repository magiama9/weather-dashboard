/**************************************************
GLOBAL VARIABLES
***************************************************/

let currentDate;
let currentCity = "Washington DC";
let currentTemp;
let currentUV;
let currentHumidity;
let currentWindSpeed;
let currentLat = "";
let currentLon = "";

$(document).ready(function() {
  let weatherURL = "https://api.openweathermap.org/data/2.5/weather?";
  let uvURL = "https://api.openweathermap.org/data/2.5/uvi?";

  setTime();
  // AJAX CALL TO OPENWEATHERMAP

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
      currentHumidity = response.main.humidity;
      currentWindSpeed = response.wind.speed;
      currentLat = response.coord.lat;
      currentLon = response.coord.lon;
      console.log(currentLat);
      getUV();
    },
    error: function() {
      console.log("ERROR");
    }
  });


//   MAKES SEPARATE CALL TO OPENWEATHER API TO FETCH UV INDEX
  function getUV() {
    $.ajax({
      url: uvURL,
      method: "GET",
      data: {
        lat: currentLat,
        lon: currentLon,
        APPID: "968b7fae60d97ecc132a2221d027b935"
      }
    }).then(function(response) {
      currentUV = response.value;
      console.log(currentUV);
    });
  };
  

//   FETCHES CURRENT TIME AS A MOMENT OBJECT OF GIVEN FORMAT
  function setTime (){
    currentDate = moment().format("dddd, MMMM Do, YYYY");
    console.log(currentDate);
  }

});
