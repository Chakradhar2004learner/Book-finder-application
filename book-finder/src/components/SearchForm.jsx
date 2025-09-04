import React from 'react';

const SearchForm = ({ query, setQuery, searchType, setSearchType, onSubmit, loading, onClear }) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-options">
        <label className="search-label">
          <input
            type="radio"
            name="search-type"
            value="title"
            checked={searchType === 'title'}
            onChange={(e) => setQuery('') || setSearchType(e.target.value)}
            className="search-radio"
          />
          <span>Title</span>
        </label>
        <label className="search-label">
          <input
            type="radio"
            name="search-type"
            value="subject"
            checked={searchType === 'subject'}
            onChange={(e) => setQuery('') || setSearchType(e.target.value)}
            className="search-radio"
          />
          <span>Genre</span>
        </label>
        <label className="search-label">
          <input
            type="radio"
            name="search-type"
            value="author"
            checked={searchType === 'author'}
            onChange={(e) => setQuery('') || setSearchType(e.target.value)}
            className="search-radio"
          />
          <span>Author</span>
        </label>
        <label className="search-label">
          <input
            type="radio"
            name="search-type"
            value="language"
            checked={searchType === 'language'}
            onChange={(e) => setQuery('') || setSearchType(e.target.value)}
            className="search-radio"
          />
          <span>Language</span>
        </label>
      </div>
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ${searchType}...`}
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {query && (
          <button
            type="button"
            className="clear-button"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;