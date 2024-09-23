import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) { 
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });
  const cityName = weatherData.city || "Unknown Location";

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">{currentDate}, {cityName}</p>
      <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
