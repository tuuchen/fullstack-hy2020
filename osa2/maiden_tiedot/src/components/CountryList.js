import React from 'react';

const CountryList = ({ countries, handleShow }) => {
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <>
        {countries.map((country) => {
          return (
            <div key={country.name}>
              {country.name}{' '}
              <button key={country.name} onClick={handleShow([country])}>
                show
              </button>
            </div>
          );
        })}
      </>
    );
  } else if (countries.length > 10) {
    return <div>Too many results!</div>;
  }
  return null;
};

export default CountryList;
