import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import CollapsibleSection from './CollapsibleSection';

const FiltersSidebar = () => {
  return (
    <aside className="filters">
      <h2 className="filters-title">Filtros</h2>
      <hr />
      <CollapsibleSection title="Parte de la Planta">
        <RefinementList attribute="plant_parts" />
      </CollapsibleSection>
      <CollapsibleSection title="Usos Tradicionales">
        <RefinementList attribute="traditional_use" />
      </CollapsibleSection>
      <CollapsibleSection title="Nombre Científico">
        <RefinementList attribute="scientific_name" />
      </CollapsibleSection>
    </aside>
  );
};

export default FiltersSidebar;
