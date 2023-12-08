// variable declorations

var searchButton = document.querySelector("#btn-search");
var searchField = document.querySelector(".form-control");
var cityList = document.querySelector(".list-group");
var cardEls = document.querySelectorAll(".five-forecast");
var cardTitle = document.querySelectorAll(".card-title");
var searchBar = document.querySelector("#keyD");
var displayedCityEl = document.querySelector(".main-forecast");

let lat, lon;

// function to fetch latitude and longitude from geocodeAPI

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

// function which plugs geocodeAPI data into openweatherAPI to fetch weather data for a given location. Then dynamically creates elements to display weather data.

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

// uses the dayJs library to give the forecast cards proper date titles.

function addDate() {
  for (var i = 0; i < 5; i++) {
    const a = dayjs();
    const b = a.add(i, "day");
    cardTitle[i].innerText = b.format("MMM D, YYYY");
  }
}

function addCities() {
  cityList.innerHTML = "";
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
      "deletable",
      "cityBtn"
    );
    cityButton.textContent = cities[i];
    //need to get parent element to append to
    cityList.appendChild(cityButton);
    cityButton.addEventListener("click", function (event) {
      event.preventDefault();
      var cityName = event.target.textContent;
      var geoRequestURL =
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
        cityName +
        "&limit=1&appid=eaac46d313d2d3a242b8a4c157387c36";
      $(".deletable").remove();
      displayedCityEl.textContent = cityName;
      addCities();
      geoAPI(geoRequestURL);
    });
  }
  cityBtns = $(".cityBtn");
}

//event listener for city search button, additem to local storage
//need to add second event listener for pressing enter
searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  var cityText = searchField.value; //set this variable to local storage
  var geoRequestURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityText +
    "&limit=1&appid=eaac46d313d2d3a242b8a4c157387c36";
  displayedCityEl.textContent = cityText;
  localStorage.setItem(cityText, "");

  //remove all elements with "deletable" class
  $(".deletable").remove();

  addCities();
  geoAPI(geoRequestURL); //change URL to string concatinate with city later
});

searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-search").click();
  }
});

addCities();
addDate();
