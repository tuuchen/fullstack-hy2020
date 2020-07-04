import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(countries);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState('');

  const api_key = '9f4d67fc449f30b9c2a33a138be6b54e';

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value) {
      setCountryToShow(
        countries.filter((country) =>
          country.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      if (countryToShow[0]) {
        getWeather(countryToShow[0]);
      }
    } else {
      setCountryToShow([]);
    }
  };

  const handleShow = (country) => (e) => {
    getWeather(country.capital);
    setCountryToShow([country]);
  };

  const getWeather = (city) => {
    if (weather.name !== city.capital) {
      axios
        .get(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            city.capital +
            '&appid=' +
            api_key
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  };

  return (
    <div>
      <Search filterName={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countryToShow} handleShow={handleShow} />
      <CountryDetails country={countryToShow} weather={weather} />
    </div>
  );
};

export default App;
