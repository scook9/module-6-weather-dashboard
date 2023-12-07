var geoRequestURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=eaac46d313d2d3a242b8a4c157387c36";

var userContainer = document.getElementById("users");

function geoAPI(requestURL) {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0]);
      console.log([data[0].lat, data[0].lon]);
      return [data[0].lat, data[0].lon];
    });
}

geoAPI(geoRequestURL);

function getApi() {
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=eaac46d313d2d3a242b8a4c157387c36";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.list[0].main.temp);
      for (var i = 0; i < 5; i++) {
        var temp = document.createElement("h3");
        var wind = document.createElement("h3");
        var humidity = document.createElement("h3");
        temp.textContent = data.list[i].main.temp - 273.15;
        wind.textContent = data.list[i].main.humidity + "%";
        humidity.textContent = data.list[i].wind.speed + "km/h";
        userContainer.append(temp);
        userContainer.append(wind);
        userContainer.append(humidity);
      }
    });
}

getApi();
