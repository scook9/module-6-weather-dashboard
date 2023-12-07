var geoRequestURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=eaac46d313d2d3a242b8a4c157387c36";



let lat, lon;

function geoAPI(requestURL) {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log([data[0].lat, data[0].lon]);
      lat = data[0].lat;
      lon = data[0].lon;
      getApi(lat, lon);
    });
}

var cardEls = document.querySelectorAll(".five-forecast");
var cardP = document.querySelectorAll(".card-text");


function getApi() {

  var requestUrl =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=eaac46d313d2d3a242b8a4c157387c36";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[0].main.temp);
      for (var i = 0; i < 5; i++) {
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");
        temp.textContent = data.list[i].main.temp - 273.15;
        wind.textContent = data.list[i].main.humidity + "%";
        humidity.textContent = data.list[i].wind.speed + "km/h";
        console.log(temp);
        cardEls[i].appendChild(temp);
        cardEls[i].appendChild(wind);
        cardEls[i].appendChild(humidity);

        // cardEls.forEach(function () {

        //   //function here, set text content method, etc.
        //   });
        // cardEls.forEach((customTextArea) >= {

        // })
        // for (i = 0; i < cardEls.length; i++) {
        //   console.log("loops round" + i)
        // }

      }
    });
}

geoAPI(geoRequestURL);
