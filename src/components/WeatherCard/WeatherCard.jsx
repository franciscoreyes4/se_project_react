import React, { useContext } from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData.temp[currentTemperatureUnit];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp !== undefined ? `${temp} °${currentTemperatureUnit}` : "Loading..."}
      </p>
      <img src={sunny} alt="Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
