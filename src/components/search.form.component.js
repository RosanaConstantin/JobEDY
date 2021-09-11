import React from "react";

const SearchForm = ({
  onSubmitHandler,
  searchTerm,
  onInputChange,
  error
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <label>
        <span>Search</span>
        <input
          type="search"
          placeholder="Java Developer, etc.,"
          value={searchTerm}
          onChange={onInputChange}
          required
        />
        <button type="submit">Search</button>
      </label>
      {error && (
        <div style={{ color: `red` }}>
          some error occurred, while fetching api
        </div>
      )}
    </form>
  );
};

export default SearchForm;
