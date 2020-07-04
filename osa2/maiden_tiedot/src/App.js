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

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value) {
      const countryArr = countries.filter((country) =>
        country.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      getWeather(countryArr);
      setCountryToShow(countryArr);
    } else {
      setCountryToShow([]);
    }
  };

  const handleShow = (country) => (e) => {
    getWeather(country);
    setCountryToShow(country);
  };

  const getWeather = (city) => {
    if (city.length === 1 && weather.name !== city[0].capital) {
      setWeather('');
      axios
        .get(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            city[0].capital +
            '&appid=' +
            api_key +
            '&units=metric'
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
