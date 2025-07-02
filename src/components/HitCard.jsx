import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

const HitCard = ({ hit, onShowPlant }) => (
  <div className="hit-item" onClick={() => onShowPlant(hit)} style={{ cursor: 'pointer' }}>
    {hit.image_url && (
      <img src={hit.image_url} alt={hit.common_name || hit.title} className="hit-image" />
    )}
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
      <button
        className="details-btn"
        onClick={e => {
          e.stopPropagation();
          onShowPlant(hit);
        }}
      >
        Ver detalles
      </button>
    </div>
  </div>
);

export default HitCard;
