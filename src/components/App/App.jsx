import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "../../vendor/normalize.css";
import "./App.css";
import { coordinates, APIkey, defaultClothingItems } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApp";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: null, C: null }, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLocal = window.location.hostname === "localhost";

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(prevUnit => (prevUnit === "C" ? "F" : "C"));
  };

  const handleCardClick = card => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    if (selectedCard && (selectedCard._id || selectedCard._id === 0)) {
      setIsConfirmationModalOpen(true);
    } else {
      console.error("Selected card ID is undefined or invalid. Selected card:", selectedCard);
    }
  };

  const confirmDelete = () => {
    if (!selectedCard || (selectedCard._id !== 0 && !selectedCard._id)) {
      console.error("Cannot delete item: selectedCard ID is undefined or invalid.", selectedCard);
      return;
    }

    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(prevItems => prevItems.filter(item => item._id !== selectedCard._id));
        setIsConfirmationModalOpen(false); 
        closeActiveModal();
      })
      .catch(error => {
        console.error("Failed to delete item:", error);
      });
  };

  const onAddItem = values => {
    setIsLoading(true);
    addItem(values.name, values.url, values.weather)
      .then(newItem => {
        setClothingItems(prevItems => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(error => {
        console.error("Failed to add item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then(data => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    if (isLocal) {
      getItems()
        .then(data => setClothingItems(data))
        .catch(error => console.error("Error fetching items:", error));
    } else {
      setClothingItems(defaultClothingItems);
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = e => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <Router>
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={<Main weatherData={weatherData} clothingItems={clothingItems} handleCardClick={handleCardClick} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        {activeModal === "add-garment" && (
          <AddItemModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
        )}

        {activeModal === "preview" && selectedCard && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            onDeleteItem={handleDeleteClick}
          />
        )}

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          handleConfirmDelete={confirmDelete}
          handleCloseClick={() => setIsConfirmationModalOpen(false)}
        />
      </Router>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
