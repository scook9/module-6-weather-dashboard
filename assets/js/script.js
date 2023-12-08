var searchButton = document.querySelector("#btn-search");
var searchField = document.querySelector(".form-control"); //.value to get text
var weatherButton = document.querySelector("#btn-main");

let lat, lon;

function geoAPI(requestURL) {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      getApi(lat, lon);
    });
}

var cardEls = document.querySelectorAll(".five-forecast");
var cardP = document.querySelectorAll(".card-text");
var cardTitle = document.querySelectorAll(".card-title");

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
      for (var i = 0; i < 5; i++) {
        var iconLink =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
        var icon = document.createElement("img");
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");
        var temperature = data.list[i].main.temp - 273.15; //keeps 2 decimal points
        icon.src = iconLink;
        icon.classList.add("card-img-top");
        icon.classList.add("deletable");
        temp.textContent = "Temperature: " + temperature.toFixed(0) + " °C";
        temp.classList.add("deletable");
        wind.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        wind.classList.add("deletable");
        humidity.textContent =
          "Wind speed: " + data.list[i].wind.speed + "km/h";
        humidity.classList.add("deletable");
        cardEls[i].appendChild(icon);
        cardEls[i].appendChild(temp);
        cardEls[i].appendChild(wind);
        cardEls[i].appendChild(humidity);
      }
    });
}

function addDate() {
  for (var i = 0; i < 5; i++) {
    const a = dayjs();
    const b = a.add(i, "day");
    cardTitle[i].innerText = b.format("MMM D, YYYY");
  }
}

addDate();

//pull local storage cities and create elements with each city text
//event listener to get weather of a specific city

//event listener for city search button, additem to local storage
//need to add second event listener for pressing enter
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("clicked search button");
  var cityText = searchField.value; //set this variable to local storage
  var geoRequestURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityText +
    "&limit=1&appid=eaac46d313d2d3a242b8a4c157387c36";
  localStorage.setItem(cityText, "");

  //remove all elements with "deletable" class
  $(".deletable").remove();

  geoAPI(geoRequestURL); //change URL to string concatinate with city later
  //call function at the end of this to populate city card from local storage
});

weatherButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("clicked weather button");
});
