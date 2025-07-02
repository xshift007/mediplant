import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { InstantSearch, Hits, Pagination, Configure, Highlight, connectSearchBox, connectRefinementList } from 'react-instantsearch-dom';
import Modal from 'react-modal';
import 'instantsearch.css/themes/algolia-min.css';
import '../styles/index.css';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

import Header from '../components/Header';
import FiltersSidebar from '../components/FiltersSidebar';
import HitCard from '../components/HitCard';
import InfoModal from '../components/InfoModal';
import Footer from '../components/Footer';
import PlantModal from '../components/PlantModal';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz',
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
  },
  additionalSearchParameters: {
    queryBy: 'title,common_name,scientific_name,traditional_use,plant_parts',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Hit = ({ hit }) => {
  return (
    <div className="hit-item">
      <img src={hit.image_url} alt={hit.title} className="hit-image" />
      <div className="hit-content">
        <div className="hit-name">
          <Highlight attribute="common_name" hit={hit} />
        </div>
        <div className="hit-scientific">
          <em><Highlight attribute="scientific_name" hit={hit} /></em>
        </div>
        <div className="hit-traditional-use">
          Usos tradicionales: <Highlight attribute="traditional_use" hit={hit} />
        </div>
        <div className="hit-plant-parts">
          Partes usadas: <Highlight attribute="plant_parts" hit={hit} />
        </div>
        <a href={hit.references} target="_blank" rel="noopener noreferrer" className="hit-url">
          Ver referencias
        </a>
      </div>
    </div>
  );
};

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

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={toggleOpen}>
        <span>{title}</span>
        <span className="collapsible-icon">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      {isOpen && <div className="collapsible-content general-refinement-list">{children}</div>}
    </div>
  );
};

const CustomRefinementList = ({ items, refine }) => {
  const sortedItems = items.sort((a, b) => b.label - a.label);

  return (
    <ul className="custom-refinement-list">
      {sortedItems.map(item => (
        <li key={item.label} className="custom-refinement-item">
          <label className="custom-refinement-label">
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
              className="custom-refinement-checkbox"
            />
            <span className="custom-refinement-label-text">{item.label}</span>
            <span className="custom-refinement-count">{item.count}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

const ConnectedRefinementList = connectRefinementList(CustomRefinementList);

const ReferencesModal = ({ isOpen, onRequestClose, references }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay active" onClick={onRequestClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Referencias</h2>
          <button className="close-modal" onClick={onRequestClose}>×</button>
        </div>
        <div className="modal-body">
          {references
            ? references.split(';').map((ref, i) => (
                <div key={i}>
                  <a href={ref.trim()} target="_blank" rel="noopener noreferrer">{ref.trim()}</a>
                </div>
              ))
            : <span>No hay referencias</span>
          }
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Para InfoModal
  const [activePlant, setActivePlant] = useState(null); // Para la ficha de la planta

  // Cuando se quiera abrir la ficha
  const handleShowPlant = (plant) => setActivePlant(plant);
  const handleClosePlantModal = () => setActivePlant(null);

  return (
    <div className="app-container">
      <InstantSearch indexName="plantas_medicinales" searchClient={searchClient}>
        <Header onSimbologiaClick={() => setModalIsOpen(true)} />
        <main>
          <FiltersSidebar />
          <div className="results">
            <Hits hitComponent={props => (
              <HitCard {...props} onShowPlant={handleShowPlant} />
            )} />
            <div className="pagination-container">
              <Pagination />
            </div>
          </div>
          <Configure hitsPerPage={8} />
        </main>
      </InstantSearch>
      <Footer />
      <InfoModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
      {/* El modal de ficha de planta */}
      <PlantModal plant={activePlant} isOpen={!!activePlant} onClose={handleClosePlantModal} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));