import React from 'react';

const PlantModal = ({ plant, isOpen, onClose }) => {
  if (!isOpen || !plant) return null;

  // Si algún campo puede tener saltos de línea, reemplazamos con <br />
  const renderText = (text) =>
    text ? text.split('\n').map((str, i) => <span key={i}>{str}<br /></span>) : null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{plant.common_name}</h2>
            <p className="modal-subtitle">{plant.scientific_name}</p>
          </div>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="plant-gallery">
            <img src={plant.image_url} alt={plant.common_name} />
          </div>
          <div className="modal-section">
            <h3>Partes de la Planta</h3>
            <p>{renderText(plant.plant_parts)}</p>
          </div>
          <div className="modal-section">
            <h3>Uso Tradicional</h3>
            <p>{renderText(plant.traditional_use)}</p>
          </div>
          {plant.herbal_preparations && (
            <div className="modal-section">
              <h3>Preparaciones Herbales</h3>
              <p>{renderText(plant.herbal_preparations)}</p>
            </div>
          )}
          {plant.posology && (
            <div className="modal-section">
              <h3>Posología</h3>
              <div className="dosage-info">{renderText(plant.posology)}</div>
            </div>
          )}
          {plant.contraindications && (
            <div className="modal-section">
              <h3>Contraindicaciones</h3>
              <div className="precautions">{renderText(plant.contraindications)}</div>
            </div>
          )}
          {plant.interactions && (
            <div className="modal-section">
              <h3>Interacciones</h3>
              <p>{renderText(plant.interactions)}</p>
            </div>
          )}
          <div className="modal-section">
            <h3>Condición de Venta</h3>
            <p>{plant.sale_condition}</p>
          </div>
          <div className="modal-section">
            <h3>Referencias</h3>
            <p>{plant.references}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="print-btn" onClick={() => window.print()}>Imprimir</button>
          <button className="save-btn" onClick={() => alert('Planta guardada en favoritos')}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default PlantModal;
