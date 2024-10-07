// Main.js
import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} °{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul id="clothing-cards-list" className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
