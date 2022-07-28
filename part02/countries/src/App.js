import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCounty, setSelectedCountry] = useState('');
  console.log('🚀 ~ countries', countries);

  const handleClick = (countryName) => {
    setSelectedCountry(countryName);
  };

  const filtredCountries = useMemo(() => {
    const returnedCountries = countries.filter((country) =>
      country?.name?.common.toLowerCase().includes(search.toLowerCase())
    );
    if (!search) {
      return [];
    }

    if (returnedCountries.length > 10) {
      return <p> Too many matches, specify another filter </p>;
    }
    if (returnedCountries.length <= 10 && returnedCountries.length > 1) {
      return returnedCountries.map((country) => (
        <div key={country?.name?.common}>
          <h2>
            {country?.name?.common}{' '}
            <button onClick={() => handleClick(country?.name?.common)}>
              show
            </button>
          </h2>
          {selectedCounty === country?.name?.common && (
            <div key={country?.name?.common}>
              <p>
                Capital: {country?.capital[0]}
                <br />
                area: {country?.area}
              </p>
              Languages :
              <ul>
                {Object.entries(country?.languages).map((lang) => (
                  <li key={lang[0]}>{lang[1]}</li>
                ))}
              </ul>
              <img
                width={300}
                height={300}
                src={country?.flags['svg']}
                alt={country?.name?.common}
              />
            </div>
          )}
        </div>
      ));
    }
    if (returnedCountries.length === 1) {
      return returnedCountries.map((country) => (
        <div key={country?.name?.common}>
          <h2>{country?.name?.common}</h2>
          <p>
            Capital: {country?.capital[0]}
            <br />
            area: {country?.area}
          </p>
          Languages :
          <ul>
            {Object.entries(country?.languages).map((lang) => (
              <li key={lang[0]}>{lang[1]}</li>
            ))}
          </ul>
          <img
            width={300}
            height={300}
            src={country?.flags['svg']}
            alt={country?.name?.common}
          />
        </div>
      ));
    }
  }, [countries, search, selectedCounty]);
  console.log('🚀 ~ filtredCountries', filtredCountries);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Find countries</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>{filtredCountries}</div>
    </div>
  );
}

export default App;
