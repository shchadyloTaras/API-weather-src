function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let res = xhr.responseText;
        callback(JSON.parse(res));
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}

let weather;
let input = document.getElementById("city");
let api = "https://api.openweathermap.org/data/2.5/find?q=";
let units = "&units=metric";
let apiKey = "&APPID=68fd7cea66f7e82809cdf13613ac7ee1";

function setup() {
  let button = document.querySelector("#search-city");

  button.addEventListener("click", () => {
    let nameCity = input.value;

    let url = api + nameCity + apiKey + units;

    getJSON(url, gotData);
  });
}

setup();

function gotData(data) {
  // console.log(data);
  weather = data;
  // draw();
  outputInputData();
}

function outputInputData() {
  if (weather) {
    let tempOut = document.querySelector("#temp");
    let humOut = document.querySelector("#hum");

    let temp = weather.list[0].main.temp;
    let humidity = weather.list[0].main.humidity;

    tempOut.innerHTML = Math.floor(temp);
    humOut.innerHTML = Math.floor(humidity);
  }
}
