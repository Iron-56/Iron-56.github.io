const welcome = document.getElementById("welcome");
const place = document.getElementById("place");
const temp = document.getElementById("temperature");
const weather = document.getElementById("weather");
const err = document.getElementById("error");
const container = document.getElementById("container");

err.hidden = true;

if (new Date().getHours() > 12) {
	welcome.innerHTML = "Good Evening";
	welcome.style.color = "white";
	container.style.backgroundSize = "950px";
	container.style.backgroundColor = "black";
	container.style.backgroundImage = "url(night.jpg)";
}

var api = "6627818a39615f4905e439f0284f724e";

function update(input)
{
	if (input === "") {
		err.hidden = false;
		err.innerHTML = "Please enter a location";
		return;
	}

	var pos = "http://api.openweathermap.org/geo/1.0/direct?q="+input+"&limit=5&appid="+api;

	fetch(pos).then((response) => {
		return response.json();
	}).then((places) => {
		if (places.length === 0) {
			err.hidden = false;
			err.innerHTML = "Please enter a valid location";
			return;
		}

		let longitude = places[0]['lon'];
		let latitude = places[0]['lat'];

		fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` + `lon=${longitude}&appid=${api}`).then((response) => {
			return response.json();
		}).then((data) => {
			place.innerHTML = data.name;
			temp.innerHTML = Math.floor(data.main.temp - 273.15).toString()+" ℃";
			description = data.weather[0].description;
			weather.innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
			err.hidden = true;
		});
	});
}

document.getElementById("button").addEventListener("click", () => update(document.getElementById('searchbar').value));
document.getElementById("searchbar").addEventListener("keypress", function(e) {
	if (e.key === "Enter") {
		update(document.getElementById('searchbar').value);
	}
});

window.addEventListener("load", () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			let longitude = position.coords.longitude;
			let latitude = position.coords.latitude;

			fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` + `lon=${longitude}&appid=${api}`).then((response) => {
				return response.json();
			}).then((data) => {
				console.log(data.name);
				place.innerHTML = data.name;
				temp.innerHTML = Math.floor(data.main.temp - 273.15).toString()+" ℃";
				description = data.weather[0].description;
				weather.innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
				err.hidden = true;
			});
		});

	} else {
		update("New York");
	}
});