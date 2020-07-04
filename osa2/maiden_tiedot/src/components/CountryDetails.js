import React from 'react';

const CountryDetails = ({ country, weather }) => {
  if (country.length === 1) {
    return (
      <>
        <h2>{country[0].name}</h2>
        <div>capital {country[0].capital}</div>
        <div>population {country[0].population}</div>
        <h3>languages</h3>
        <img src={country[0].flag} width="200" height="150" />
        <p>Temp: {weather.main.temp}</p>
      </>
    );
  }
  return null;
};

export default CountryDetails;
