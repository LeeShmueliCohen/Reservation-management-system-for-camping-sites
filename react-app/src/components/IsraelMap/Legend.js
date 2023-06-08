import React, { useState } from 'react';

import './Legend.css';
import Zone from './Zone';
import Search from './Search';

function Legend(props) {
  const { sites, onClick, isLoading } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredList = sites.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="background">
      <h5 className="top-legend"> מצאו את חניון הלילה עבורכם </h5>
      <Search sites={sites} onSearch={handleSearch} />
      <Zone
        filteredList={filteredList}
        onClick={onClick}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Legend;
