export const getWeather = ({ latitude, longitude }, APIkey) => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
};
export const filterWeatherData = (data) => {
  const result = {};
  
  // Log the raw data received from the API
  console.log("Raw weather data: ", data);

  result.city = data.name;
  
  // Log the temperature details
  console.log("Temperature in Fahrenheit: ", data.current.temp);

  // Directly use the temp in Fahrenheit since we used `units=imperial`
  result.temp = {
      F: data.current.temp
  };

  result.type = getWeatherType(result.temp.F); // Determine the weather type based on the temperature in Fahrenheit
  
  // Log the final filtered weather data
  console.log("Filtered weather data: ", result);

  return result;
};

export const getWeatherType = (temperature) => {
  console.log("Determining weather type for temperature: ", temperature); // Debugging

  if (temperature >= 86) {
      return 'hot';
  } else if (temperature >= 66 && temperature < 86) {
      return 'warm';
  } else {
      return 'cold';
  
    }
  };
  