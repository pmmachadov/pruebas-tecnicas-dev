import { useState, useEffect } from 'react'
import './App.css'
import BookCard from './components/BookCard'

function App() {
  const [books, setBooks] = useState([])
  const [readingList, setReadingList] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('Todos')

  // Cargar datos de libros al iniciar
  useEffect(() => {
    fetch('/books.json')
      .then(response => response.json())
      .then(data => {
        setBooks(data.library)
      })
      .catch(error => console.error('Error cargando libros:', error))
  }, [])

  // Cargar lista de lectura del localStorage
  useEffect(() => {
    const savedReadingList = localStorage.getItem('readingList')
    if (savedReadingList) {
      setReadingList(JSON.parse(savedReadingList))
    }
  }, [])

  // Guardar lista de lectura en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList))
  }, [readingList])

  // Sincronización entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'readingList' && e.newValue) {
        setReadingList(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Agregar libro a lista de lectura
  const addToReadingList = (book) => {
    setReadingList([...readingList, book])
  }

  // Quitar libro de lista de lectura
  const removeFromReadingList = (isbn) => {
    setReadingList(readingList.filter(book => book.book.ISBN !== isbn))
  }

  // Verificar si un libro está en la lista de lectura
  const isInReadingList = (isbn) => {
    return readingList.some(book => book.book.ISBN === isbn)
  }

  // Obtener libros disponibles (no en lista de lectura)
  const availableBooks = books.filter(book => !isInReadingList(book.book.ISBN))

  // Filtrar por género
  const filteredBooks = selectedGenre === 'Todos' 
    ? availableBooks
    : availableBooks.filter(book => book.book.genre === selectedGenre)

  // Obtener géneros únicos
  const genres = ['Todos', ...new Set(books.map(book => book.book.genre))]

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
        <div className="stats">
          <div className="stat-item">
            📖 {filteredBooks.length} disponibles
          </div>
          <div className="stat-item">
            ❤️ {readingList.length} en lista de lectura
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label htmlFor="genre-filter" style={{ color: 'white', marginRight: '10px' }}>
            Filtrar por género:
          </label>
          <select 
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="main-content">
        <section>
          <h2 style={{color: 'white', marginBottom: '20px'}}>Libros Disponibles</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px' 
          }}>
            {filteredBooks.map(book => (
              <BookCard
                key={book.book.ISBN}
                book={book}
                onAddToReading={addToReadingList}
                onRemoveFromReading={removeFromReadingList}
                isInReadingList={false}
              />
            ))}
          </div>
        </section>
        
        <aside>
          <h2 style={{color: 'white', marginBottom: '20px'}}>📚 Lista de Lectura</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {readingList.map(book => (
              <BookCard
                key={book.book.ISBN}
                book={book}
                onAddToReading={addToReadingList}
                onRemoveFromReading={removeFromReadingList}
                isInReadingList={true}
              />
            ))}
          </div>
          {readingList.length === 0 && (
            <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
              No hay libros en tu lista de lectura
            </p>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App