export const getWeather = async ({ latitude, longitude }, APIkey) => {
  try {
    // Fetch weather data
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // Fetch city name using reverse geocoding (Geocoding API)
    const cityUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;
    const cityResponse = await fetch(cityUrl);
    const cityData = await cityResponse.json();

    // Attach city name to weather data
    return {
      ...weatherData,
      city: cityData.name,  // Add the city name
    };
  } catch (err) {
    console.error('Error fetching weather data:', err);
    return Promise.reject(err);
  }
};

export const filterWeatherData = (data) => {
  const result = {};
  
  // Get the city name from the data
  result.city = data.city || 'Unknown Location';

  // Directly use the temp in Fahrenheit since we used `units=imperial`
  result.temp = {
      F: data.current.temp,
  };

  result.type = getWeatherType(result.temp.F); // Determine the weather type based on the temperature in Fahrenheit
  
  return result;
};

export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
      return 'hot';
  } else if (temperature >= 66 && temperature < 86) {
      return 'warm';
  } else {
      return 'cold';
  }
};
