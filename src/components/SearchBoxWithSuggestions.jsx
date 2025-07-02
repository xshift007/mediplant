import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FaSearch } from 'react-icons/fa';

const CustomSearchBox = ({ currentRefinement, refine }) => {
  const handleInputChange = (event) => {
    const validChars = /^[a-zA-Z0-9 '|" ñ]*$/;
    const input = event.currentTarget.value;
    if (validChars.test(input)) {
      refine(input);
    }
  };

  return (
    <div className="custom-search-box-container">
      <input
        type="text"
        placeholder="¿Qué planta medicinal deseas buscar?"
        value={currentRefinement}
        onChange={handleInputChange}
        className="custom-search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

const SearchBoxWithSuggestions = connectSearchBox(({ currentRefinement, refine }) => {
  const handleSuggestionClick = (suggestion) => {
    refine(suggestion);
  };

  return (
    <div>
      <CustomSearchBox currentRefinement={currentRefinement} refine={refine} />
      <div className="search-suggestions">
        <span>Prueba: </span>
        {['Ajo', 'Manzanilla', 'Antiinflamatorio', 'Digestivo', 'Cicatrizante', 'Hipertensión'].map((suggestion, index) => (
          <a key={index} href="#" onClick={(e) => { e.preventDefault(); handleSuggestionClick(suggestion); }}>
            {suggestion}
          </a>
        ))}
      </div>
    </div>
  );
});

export default SearchBoxWithSuggestions;
