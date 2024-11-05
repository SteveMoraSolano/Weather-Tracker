import React, { useState } from 'react';
import axios from "axios";

function SearchCity({ onSearch , onClear}) {
  const [city, setCity] = useState('');
  const [lat] = useState('');
    const [lon] = useState('');
  const [suggestions, setSuggestions] = useState([]);
 

  const handleCityChange = async (event) => {
    setCity(event.target.value);
    onClear();
    if (event.target.value.length > 2) {
      const vMapsKey = process.env.REACT_APP_AZURE_MAPS_KEY;
      const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${vMapsKey}&query=${event.target.value}&typeahead=true&limit=5`;

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
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    if (suggestion.position) {
    onSearch(suggestion.position.lat, suggestion.position.lon);
}
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(lat, lon);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        id = "txtSearchCity"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter a city"
        required
    />
    </form>
   
    {suggestions.length > 0 && (
        <ul>
            {suggestions.map((suggestion, index) => (
                <li class="listCity" 
                key={index} onClick={() => handleSuggestionClick(suggestion)}>
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
