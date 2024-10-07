import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function Header({ handleAddClick, weatherData }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });
  const cityName = weatherData.city || "Unknown Location";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">{currentDate}, {cityName}</p>
      <ToggleSwitch checked={currentTemperatureUnit === 'F'} onChange={handleToggleSwitchChange} />
      <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user">
        <Link to="/profile" className="header__link">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
