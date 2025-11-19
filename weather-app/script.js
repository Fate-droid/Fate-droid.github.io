function getWeather() {
	const apiKey = "48db294f31c65a0d0de2e66d68de45fb";
	const city = document.getElementById('city').value;

	if(!city){
		alert('Please enter a city');
		return;
	}
	
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
	
	fetch(currentWeatherUrl)
		.then(response => response.json())
		.then(data => {displayWeather(data)})
		.catch(error => {
			console.error('Error fetching new weather data:', error);
			alert("Error recuperando datos de clima. Por favor intente de nuevo.");
		});
	fetch(forecastUrl)
		.then(response => response.json())
		.then(data => {displayHourlyForecast(data.list);
		})
		.catch(error => {
			console.error('Error fetching hourly forecast data:', error);
			alert("Error recuperando datos de clima por hora. Por favor intente de nuevo.");
		});
}

function displayWeather(data){
	const tempDivInfo = document.getElementById('temp-div');
	const weatherInfoDiv = document.getElementById('weather-info');
	const weatherIcon = document.getElementById('weather-icon');
	const hourlyForecastDiv = document.getElementById('hourly-forecast');
	
	// Limpia contenido previo
	weatherInfoDiv.innerHTML = '';
	hourlyForecastDiv.innerHTML = '';
	tempDivInfo.innerHTML = '';
	
	if(data.cod === '404') {
		weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
	} else {
		const cityName = data.name;
		const temperature = Math.round(data.main.temp - 273.15);
		const description = data.weather[0].description;
		const iconCode = data.weather[0].icon;
		const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;	
	
		const temperatureHTML = `
			<p>${temperature}"C</p>
		`;
		
		const weatherHTML = `
			<p>${cityName}</p>
			<p>${description}</p>
		`;
		tempDivInfo.innerHTML = temperatureHTML;
		weatherInfoDiv.innerHTML = weatherHTML;
		weatherIcon.src = iconUrl;
		weatherIcon.alt = description;
		
		showImage();
	}
}

function displayHourlyForecast(hourlyData){
	const hourlyForecastDiv = document.getElementById('hourly-forecast');
	const next24Hours = hourlyData.slice(0,8);
	
	next24Hours.forEach(item => {
		const dateTime = new Date(item.dt * 1000); // Convierte a milisegundos
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); //Convierte a Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
	});
	
}

function showImage(){
	const weatherIcon = document.getElementById('weather-icon');
	weatherIcon.style.display = 'block'; //Hace que la imagen sea visible
}