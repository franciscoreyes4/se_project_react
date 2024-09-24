export const getWeather = async ({ latitude, longitude }, APIkey) => {
  try {
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
    const weatherResponse = await fetch(weatherUrl);

    // Check if the response is successful
    if (!weatherResponse.ok) {
      throw new Error(`Error ${weatherResponse.status}: Failed to fetch weather data`);
    }

    const weatherData = await weatherResponse.json();

    // Extract the city name and other weather data
    const city = weatherData.name;  
    const currentTemp = weatherData.main.temp;  
    
    return {
      temp: currentTemp,
      city,  // City name extracted directly
      weather: weatherData.weather[0].description, 
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

  // Directly use the temp in Fahrenheit
  result.temp = {
    F: data.temp, 
  };

  result.type = getWeatherType(result.temp.F);  // Determine the weather type based on the temperature in Fahrenheit
  
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
