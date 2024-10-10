import { checkResponse } from "./api"; 

export const getWeather = async ({ latitude, longitude }, APIkey) => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
    const weatherResponse = await fetch(weatherUrl);
    
    const weatherData = await checkResponse(weatherResponse);

    // Process the fetched data
    const parsedWeather = parseWeatherData(weatherData);

    return {
      ...parsedWeather,
      city: weatherData.name,
      weather: weatherData.weather[0].description,
    };
  } catch (err) {
    console.error('Error fetching weather data:', err);
    return Promise.reject(err);
  }
};

// Function to parse the temperature data from the API and convert it to both Fahrenheit and Celsius
export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;

  const weather = {
    temperature: {
      F: Math.round(temperature), 
      C: Math.round((temperature - 32) * 5/9), 
    },
  };

  return weather;
};

// Function to filter and structure the weather data with city, temperature, and weather type
export const filterWeatherData = (data) => {
  const result = {};

  // Get the city name from the data
  result.city = data.city || 'Unknown Location';

  // Use the parsed temperatures (F and C)
  result.temp = {
    F: data.temperature.F,
    C: data.temperature.C,
  };

  // Determine the weather type based on the temperature in Fahrenheit
  result.type = getWeatherType(result.temp.F);

  return result;
};

// Function to get the weather type based on the temperature
export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66 && temperature < 86) {
    return 'warm';
  } else {
    return 'cold';
  }
};
