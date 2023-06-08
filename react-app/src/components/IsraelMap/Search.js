import React, { useState } from "react";

import './Search.css';

function Search(props) {
  const { onSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="side-menu-search">
      <div>
        <input
          type="text"
          className="search"
          placeholder="הקלד שם חניון"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
