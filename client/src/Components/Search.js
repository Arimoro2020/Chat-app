import React from 'react';

function Search({search, handleSearch}){

    return (
        <div className="searchbar" style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
          <label htmlFor="search">Search App Users:</label>
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            placeholder="Type a  name to search..."
            onChange={(e)=>handleSearch(e)}
            />
        </div>
      );
}

export default Search;