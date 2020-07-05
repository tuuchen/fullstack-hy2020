import React from 'react';
import Weather from './Weather';
import Country from './Country';

const CountryDetails = ({ country, weather }) => {
  if (country.length === 1 && weather) {
    return (
      <>
        <Country country={country} />
        <Weather weather={weather} />
      </>
    );
  }
  return null;
};

export default CountryDetails;