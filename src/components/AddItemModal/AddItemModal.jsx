// AddItemModal.js
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseClick, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && url && weather) {
      onAddItem({ name, url, weather });
      handleCloseClick();
    }
  };

  const isFormValid = name && url && weather;

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      isButtonDisabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label htmlFor="imageURL" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          value={url}
          onChange={handleUrlChange}
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
