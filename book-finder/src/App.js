import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import BookCard from './components/BookCard';
import SearchForm from './components/SearchForm';
import NavButtons from './components/NavButtons';
import EmptyState from './components/EmptyState';

// Main App component
const App = () => {
  // State variables for managing the application's data and UI
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New state variables for favorites and theme
  const [favorites, setFavorites] = useLocalStorage('book-finder-favorites', []);
  const [currentView, setCurrentView] = useState('search');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Apply the theme class to the body on mount and theme change
  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  // --- DATA FETCHING & API CALLS ---
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBooks([]);

    if (query.trim() === '') {
      setLoading(false);
      return;
    }

    try {
      const encodedQuery = encodeURIComponent(query);
      let url = '';
      
      switch (searchType) {
        case 'title':
          url = `https://openlibrary.org/search.json?title=${encodedQuery}`;
          break;
        case 'subject':
          url = `https://openlibrary.org/search.json?subject=${encodedQuery}`;
          break;
        case 'author':
          url = `https://openlibrary.org/search.json?author=${encodedQuery}`;
          break;
        case 'language':
          url = `https://openlibrary.org/search.json?language=${encodedQuery}`;
          break;
        default:
          url = `https://openlibrary.org/search.json?title=${encodedQuery}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        const foundBooks = data.docs.slice(0, 10).map(book => ({
          key: book.key,
          id: book.key.replace(/\//g, '_'), 
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          coverId: book.cover_i,
          first_publish_year: book.first_publish_year,
          subjects: book.subject ? book.subject.slice(0, 3).join(', ') : 'N/A',
          languages: book.language ? book.language.join(', ').toUpperCase() : 'N/A'
        }));
        setBooks(foundBooks);
      } else {
        setBooks([]);
        setError(`No books found for "${query}". Try a different search.`);
      }
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError('Failed to fetch books. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setBooks([]);
    setError(null);
  };

  const handleToggleFavorite = (book) => {
    const isFavorite = favorites.some(favBook => favBook.id === book.id);
    if (isFavorite) {
      setFavorites(favorites.filter(favBook => favBook.id !== book.id));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  const booksToDisplay = currentView === 'search' ? books : favorites;

  const renderBookCard = (book) => (
    <BookCard
      key={book.id}
      book={book}
      isFavorite={favorites.some(favBook => favBook.id === book.id)}
      onToggleFavorite={handleToggleFavorite}
    />
  );

  return (
    <div className="app-container">
      <div className="main-content-wrapper">
        <header className="header">
          <h1>📚 Book Finder</h1>
          <p>Find your next great read by title, genre, or author.</p>
          <button 
            onClick={() => setIsDarkTheme(!isDarkTheme)} 
            className="theme-toggle-button"
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m4.93 19.07 1.41-1.41"></path>
                <path d="m17.66 6.34 1.41-1.41"></path>
              </svg>
            )}
          </button>
        </header>

        <main>
          <NavButtons
            currentView={currentView}
            setCurrentView={setCurrentView}
            favoritesCount={favorites.length}
          />

          {currentView === 'search' && (
            <SearchForm
              query={query}
              setQuery={setQuery}
              searchType={searchType}
              setSearchType={setSearchType}
              onSubmit={handleSearch}
              loading={loading}
              onClear={handleClear}
            />
          )}

          {loading && (
            <div className="empty-state">
              <div className="spinner"></div>
            </div>
          )}
          
          {error && (
            <div className="empty-state">
              <p className="empty-state-emoji">😔</p>
              <p className="empty-state-title">{error}</p>
            </div>
          )}

          {booksToDisplay.length > 0 && !loading && !error && (
            <div className="book-grid">
              {booksToDisplay.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  isFavorite={favorites.some(favBook => favBook.id === book.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}

          {booksToDisplay.length === 0 && !loading && !error && (
            <EmptyState
              emoji={currentView === 'search' ? '🔍' : '⭐'}
              title={
                currentView === 'search'
                  ? 'Start your search to find books.'
                  : 'No favorites yet!'
              }
              description={
                currentView === 'search'
                  ? 'Enter a title, genre, author, or language above.'
                  : 'Click the heart icon on a book to add it to your favorites.'
              }
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;