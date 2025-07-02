import React from 'react';

const InfoModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onRequestClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Simbología / Info</h2>
          <button className="close-modal" onClick={onRequestClose}>×</button>
        </div>
        <div className="modal-body">
          <ul>
            <li>Fuente: INVIMA (Colombia)</li>
            <li>Plantas con usos tradicionales validados</li>
            <li>Datos estructurados por nombre común, científico y parte utilizada</li>
            {/* Agrega aquí los puntos de tu maqueta */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
