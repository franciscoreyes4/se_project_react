import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ weatherData, handleCardClick, clothingItems, handleAddClick, showAllItems }) {
  if (!clothingItems) {
    return <p>Loading clothes...</p>;
  }

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__button" type="button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul id="clothing-cards-list" className="cards__list">
        {clothingItems
          .filter(item => showAllItems || item.weather === weatherData?.type)
          .map(item => (
            <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
