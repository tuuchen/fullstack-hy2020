import React from 'react';

const Weather = ({ weather }) => {
  return (
    <>
      <h3>Weather in {weather.name}</h3>
      <p>Temperature {weather.main.temp}c</p>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt='icon'
      />
      <p>
        Wind speed {weather.wind.speed}m/s, direction {weather.wind.deg} deg
      </p>
    </>
  );
};

export default Weather;
