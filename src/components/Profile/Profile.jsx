import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ weatherData, handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection 
        weatherData={weatherData} 
        handleCardClick={handleCardClick} 
        clothingItems={clothingItems} 
      />
    </div>
  );
}

export default Profile;
