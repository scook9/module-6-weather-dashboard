var searchButton = document.querySelector("#btn-search");
var searchField = document.querySelector(".form-control");
var cityList = document.querySelector(".list-group");

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
        var temperature = (data.list[i].main.temp - 273.15) * 1.8 + 32; //K to °F
        icon.src = iconLink;
        icon.classList.add("card-img-top");
        icon.classList.add("deletable");
        icon.classList.add("card-image");
        temp.textContent = "Temperature: " + temperature.toFixed(0) + " °F";
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

function addCities() {
  //get stored keys/cities
  var cities = Object.keys(localStorage);
  //create button elements
  for (i = 0; i < cities.length; i++) {
    var cityButton = document.createElement("button");
    cityButton.classList.add(
      "btn",
      "btn-primary",
      "me-md-2",
      "m-1",
      "deletable"
    );
    cityButton.textContent = cities[i];
    //need to get parent element to append to
    cityList.appendChild(cityButton);
  }
  //set button text to each key
  //append each key to the cities card
}

addCities();

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

  addCities();
  geoAPI(geoRequestURL); //change URL to string concatinate with city later
  //call function at the end of this to populate city card from local storage
});

// weatherButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   console.log("clicked weather button");
// });
