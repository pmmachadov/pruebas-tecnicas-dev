import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [readingList, setReadingList] = useState([])

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

  // Guardar lista de lectura en localStorage
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList))
  }, [readingList])

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
        <div className="stats">
          <div className="stat-item">
            📖 Disponibles: {books.length}
          </div>
          <div className="stat-item">
            ❤️ En lista de lectura: {readingList.length}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div>
          <h2 style={{color: 'white'}}>Libros Disponibles</h2>
          {/* Aquí irán los libros */}
        </div>
        
        <div>
          <h2 style={{color: 'white'}}>Lista de Lectura</h2>
          {/* Aquí irá la lista de lectura */}
        </div>
      </main>
    </div>
  )
}

export default App