import React, { useState, useEffect } from 'react';
import axios from "axios";
import { debounce } from 'lodash'; 

function SearchCity({ onSearch, onClear }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    const debouncedSearch = debounce(async (city) => {
      if (city.length > 2) {
        const vMapsKey = process.env.REACT_APP_AZURE_MAPS_KEY;
        const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${vMapsKey}&query=${city}&typeahead=true&limit=5`;
        try {
          const response = await axios.get(url);
          setSuggestions(response.data.results);
        } catch (error) {
          console.error('Error fetching city suggestions', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    if (city) debouncedSearch(city);
    return () => debouncedSearch.cancel();
  }, [city]);

  const handleCityChange = event => {
    setCity(event.target.value);
    onClear();
  };

  const handleSuggestionClick = suggestion => {
    setSuggestions([]);
    if (suggestion.position) {
      onSearch(suggestion.position.lat, suggestion.position.lon);
    }
  };

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          id="txtSearchCity"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter a city"
          required
        />
      </form>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li className="listCity" key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <div>
                <p>
                  <span style={{ fontWeight: 'bold' }}>
                    {suggestion.address.municipality}
                  </span>
                  <br />
                  {suggestion.address.countrySubdivisionName}, {suggestion.address.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchCity;
