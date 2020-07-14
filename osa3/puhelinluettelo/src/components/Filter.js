import React from 'react';

const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter by name <input value={filterName} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
