var geoRequestURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=eaac46d313d2d3a242b8a4c157387c36";

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
