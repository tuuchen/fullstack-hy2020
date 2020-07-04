import React, { useState } from 'react';

const Search = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filterName} onChange={handleFilterChange} />
    </div>
  );
};

export default Search;
