import React from 'react';

const NavButtons = ({ currentView, setCurrentView, favoritesCount }) => {
  return (
    <div className="nav-buttons">
      <button
        onClick={() => setCurrentView('search')}
        className={`nav-button ${currentView === 'search' ? 'active' : 'inactive'}`}
      >
        Search
      </button>
      <button
        onClick={() => setCurrentView('favorites')}
        className={`nav-button ${currentView === 'favorites' ? 'active' : 'inactive'}`}
      >
        My Favorites
        {favoritesCount > 0 && (
          <span className="favorite-count">{favoritesCount}</span>
        )}
      </button>
    </div>
  );
};

export default NavButtons;