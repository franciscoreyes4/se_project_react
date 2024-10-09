import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick, clothingItems, handleAddClick }) { 
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection 
        handleCardClick={handleCardClick} 
        clothingItems={clothingItems} 
        showAllItems={true}  
        handleAddClick={handleAddClick} 
      />
    </div>
  );
}

export default Profile;
