$(document).ready(function() {
  /**************************************************
GLOBAL VARIABLES
***************************************************/

  let currentDate;
  let currentCity = "Washington";
  let currentTemp;
  let currentUv;
  let currentHumidity;
  let currentWindSpeed;

  let queryURL = "https://api.openweathermap.org/data/2.5/weather?";

  // AJAX CALL TO OPENWEATHERMAP

  $.ajax({
    url: queryURL,
    method: "GET",
    data: {
      q: currentCity,
      APPID: "968b7fae60d97ecc132a2221d027b935"
    }
  }).then(function(response) {
    console.log(response);
  });
});
