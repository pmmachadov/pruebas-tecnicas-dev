import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BookCard from '../components/BookCard'

describe('BookCard Component', () => {
  const mockBook = {
    book: {
      title: 'Test Book',
      pages: 300,
      genre: 'Fantasía',
      cover: 'https://example.com/cover.jpg',
      author: {
        name: 'Test Author',
        otherBooks: []
      },
      ISBN: '123456789'
    }
  }

  it('debería renderizar el título del libro', () => {
    render(
      <BookCard 
        book={mockBook}
        onAddToReading={() => {}}
        onRemoveFromReading={() => {}}
        isInReadingList={false}
      />
    )

    expect(screen.getByText('Test Book')).toBeInTheDocument()
  })

  it('debería renderizar el nombre del autor', () => {
    render(
      <BookCard 
        book={mockBook}
        onAddToReading={() => {}}
        onRemoveFromReading={() => {}}
        isInReadingList={false}
      />
    )

    expect(screen.getByText('Por Test Author')).toBeInTheDocument()
  })

  it('debería mostrar botón "Agregar" cuando no está en lista de lectura', () => {
    render(
      <BookCard 
        book={mockBook}
        onAddToReading={() => {}}
        onRemoveFromReading={() => {}}
        isInReadingList={false}
      />
    )

    expect(screen.getByText('➕ Agregar')).toBeInTheDocument()
  })

  it('debería mostrar botón "Quitar" cuando está en lista de lectura', () => {
    render(
      <BookCard 
        book={mockBook}
        onAddToReading={() => {}}
        onRemoveFromReading={() => {}}
        isInReadingList={true}
      />
    )

    expect(screen.getByText('❌ Quitar')).toBeInTheDocument()
  })

  it('debería mostrar el género y las páginas', () => {
    render(
      <BookCard 
        book={mockBook}
        onAddToReading={() => {}}
        onRemoveFromReading={() => {}}
        isInReadingList={false}
      />
    )

    expect(screen.getByText('Fantasía')).toBeInTheDocument()
    expect(screen.getByText('300 páginas')).toBeInTheDocument()
  })
})
