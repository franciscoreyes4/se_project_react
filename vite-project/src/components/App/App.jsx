import "../../vendor/normalize.css";
import { useState, useEffect } from "react";
import './App.css';
import { coordinates, APIkey } from "../../utils/constants";
import Header from '../Header/Header';
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApp";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: null }, city: "" }); // Initialize temp as null
  const [activeModal, setActiveModal] = useState(""); // Track which modal is active
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment"); // This will show the "add-garment" modal
  };

  const closeActiveModal = () => {
    setActiveModal(""); // Close the modal when called
  };

  useEffect(() => {
    console.log("API Key in App.jsx: ", APIkey);  // Add this line to log the API key
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>

      {/* Modal for adding a garment */}
      {activeModal === "add-garment" && (
        <ModalWithForm
          title="New Garment"
          buttonText="Add garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input type="text" className="modal__input" id="name" placeholder="Name" />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image{" "}
            <input type="url" className="modal__input" id="imageURL" placeholder="Image URL" />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" className="modal__label modal__label_type_radio">
              <input id="hot" type="radio" className="modal__radio-input" /> Hot
            </label>
            <label htmlFor="warm" className="modal__label modal__label_type_radio">
              <input id="warm" type="radio" className="modal__radio-input" /> Warm
            </label>
            <label htmlFor="cold" className="modal__label modal__label_type_radio">
              <input id="cold" type="radio" className="modal__radio-input" /> Cold
            </label>
          </fieldset>
        </ModalWithForm>
      )}

      {/* Item preview modal */}
      {activeModal === "preview" && (
        <ItemModal activeModal={activeModal} card={selectedCard} handleCloseClick={closeActiveModal} />
      )}
    </div>
  );
}

export default App;
