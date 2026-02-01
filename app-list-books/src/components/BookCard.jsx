import './BookCard.css'

function BookCard({ book, onAddToReading, onRemoveFromReading, isInReadingList }) {
  const { title, pages, genre, cover, author } = book.book

  const handleClick = () => {
    if (isInReadingList) {
      onRemoveFromReading(book.book.ISBN)
    } else {
      onAddToReading(book)
    }
  }

  return (
    <article className="book-card">
      <img 
        src={cover} 
        alt={`Portada de ${title}`}
        className="book-cover"
      />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">Por {author.name}</p>
        <div className="book-details">
          <span className="book-genre">{genre}</span>
          <span className="book-pages">{pages} páginas</span>
        </div>
        <button 
          className={`btn-action ${isInReadingList ? 'btn-remove' : 'btn-add'}`}
          onClick={handleClick}
        >
          {isInReadingList ? '❌ Quitar' : '➕ Agregar'}
        </button>
      </div>
    </article>
  )
}

export default BookCard