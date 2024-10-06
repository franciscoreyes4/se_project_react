import React, { useState } from "react"; ;
import './ToggleSwitch.css'

const ToggleSwitch = () => {
const [currentTempertureUnit, handleToggleSwitchChange] = useState("C");

    const handleChange = (e) => {
        if( currentTempertureUnit === 'C') handleToggleSwitchChange('F');
        if( currentTempertureUnit === 'F') handleToggleSwitchChange('C');

    }
    return (
        <label className="switch">
            <input type="checkbox" className="switch__box" onChange={handleChange}/>
            <span className={currentTempertureUnit === 'F' ? "switch__slider switch__slider-F": "switch__slider switch__slider-C"}></span>
            <p className={`switch__temp-F ${currentTempertureUnit === 'F' && 'switch__active'}`}>F</p>
            <p className={`switch__temp-C ${currentTempertureUnit === 'C' && 'switch__active'}`}>C</p>
        </label>
    )
}

export default ToggleSwitch;