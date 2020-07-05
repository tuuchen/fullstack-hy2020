import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CountryList from './components/CountryList';
import Results from './components/Results';
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
      const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      getWeather(filteredCountries);
      setCountryToShow(filteredCountries);
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
      <CountryList countries={countryToShow} handleShow={handleShow} />
      <Results country={countryToShow} weather={weather} />
    </div>
  );
};

export default App;
