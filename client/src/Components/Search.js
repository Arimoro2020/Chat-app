import React from 'react';

function Search({search, handleSearch}){

    return (
        <div className="searchbar">
          <label htmlFor="search">Search App Users:</label>
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            placeholder="Type a  name to search..."
            onChange={handleSearch}
            />
        </div>
      );
}

export default Search;