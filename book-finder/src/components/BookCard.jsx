import React from 'react';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  return (
    <div className="book-card">
      <div className="book-cover-container">
        {book.coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
            alt={`Cover of ${book.title}`}
            className="book-cover-image"
          />
        ) : (
          <svg className="book-cover-placeholder" viewBox="0 0 150 200" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="var(--card-bg)" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="placeholder-text"
              dy="-0.5em"
              fill="var(--main-text)"
            >
              No Cover
            </text>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="placeholder-text"
              dy="0.5em"
              fill="var(--main-text)"
            >
              Available
            </text>
          </svg>
        )}
      </div>
      <div className="book-info">
        <div className="book-details">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-author">by {book.author}</p>
        </div>
        <div className="book-meta">
          {book.first_publish_year && <p>Published: {book.first_publish_year}</p>}
          {book.subjects && <p className="italic">Genres: {book.subjects}</p>}
          {book.languages && <p>Languages: {book.languages}</p>}
        </div>
      </div>
      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        onClick={() => onToggleFavorite(book)}
      >
        <svg className="favorite-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09A5.5 5.5 0 0 1 16.5 3c3.03 0 5.5 2.47 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
    </div>
  );
};

export default BookCard;