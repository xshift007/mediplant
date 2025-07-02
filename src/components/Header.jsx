import React from 'react';
import SearchBoxWithSuggestions from './SearchBoxWithSuggestions';


const Header = ({ onSimbologiaClick }) => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="title">Mediplant 🌿</h1>
        <div className="header-center">
          <div className="search-container">
            <SearchBoxWithSuggestions />
          </div>
        </div>
        <button className="info-button" onClick={onSimbologiaClick}>
          Simbología
        </button>
      </div>
    </header>
  );
};

export default Header;
