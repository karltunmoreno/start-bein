// Import useEffect from React.
import React, { useState, useEffect } from "react";

function Thermostat() {
  // Change the default state of temp to 75 degrees.
  const [temp, setTemp] = useState(75);

  // Use useEffect hook to set the document.title to the current temp, add here the API
  useEffect(() => {
    document.title = `${temp}° Fahrenheit`;
  });

  // Handler for increasing the temp by 1
  const increaseTemp = () => {
    setTemp(temp + 1);
  };

  // Handler for decreasing the temp by 1
  const decreaseTemp = () => {
    setTemp(temp - 1);
  };

  return (
    <div className="card text-center">
      <div className="card-header bg-warning text-white">
        CARBON IMPROVEMENT
      </div>
      <div className="card-body">
        <p className="card-text">
          Current temperature: {temp} degrees Fahrenheit
        </p>
        <button type="button" className="btn btn-danger" onClick={increaseTemp}>
          LOWER CARBON
        </button>{" "}
        <button
          type="button"
          className="btn btn-primary"
          onClick={decreaseTemp}
        >
          HIGHER CARBON
        </button>
      </div>
    </div>
  );
}

export default Thermostat;
