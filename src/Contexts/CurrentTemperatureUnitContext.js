import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
    currentTemperatureUnit: "F",
    handleToggleSwitchChanges: () => {}
})

export { CurrentTemperatureUnitContext }; 
