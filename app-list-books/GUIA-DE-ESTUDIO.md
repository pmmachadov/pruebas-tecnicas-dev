# 📚 Guía de Estudio - App Lista de Libros

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [⭐ ORDEN DE CREACIÓN PASO A PASO](#⭐-orden-de-creación-paso-a-paso)
5. [Conceptos Clave de React](#conceptos-clave-de-react)
6. [Componentes](#componentes)
7. [Funcionalidades Principales](#funcionalidades-principales)
8. [Flujo de Datos](#flujo-de-datos)
9. [Tips para el Examen](#tips-para-el-examen)

---

## 🎯 Descripción General

Esta es una aplicación de biblioteca que permite:

- Ver libros disponibles
- Filtrar libros por género
- Agregar libros a una lista de lectura
- Quitar libros de la lista de lectura
- Persistir datos usando localStorage
- Sincronizar entre pestañas del navegador

---

## 🛠️ Tecnologías Utilizadas

### React 19.2.0

- Librería para construir interfaces de usuario
- Basada en componentes reutilizables
- Usa JSX (JavaScript + XML)

### Vite 7.2.4

- Herramienta de desarrollo rápida
- Hot Module Replacement (HMR) - cambios en vivo
- Comandos:
  - `npm run dev` - iniciar servidor de desarrollo
  - `npm run build` - crear versión de producción
  - `npm run preview` - ver versión de producción

### Vitest

- Framework de testing para React
- Compatible con Vite

---

## 📁 Estructura del Proyecto

```
app-list-books/
│
├── public/
│   └── books.json          # Base de datos de libros
│
├── src/
│   ├── App.jsx            # Componente principal (lógica del negocio)
│   ├── App.css            # Estilos del App
│   ├── main.jsx           # Punto de entrada (renderiza App)
│   ├── index.css          # Estilos globales
│   │
│   └── components/
│       ├── BookCard.jsx   # Componente de tarjeta de libro
│       └── BookCard.css   # Estilos de la tarjeta
│
├── index.html             # HTML principal
├── package.json           # Dependencias y scripts
└── vite.config.js         # Configuración de Vite
```

---

## ⭐ ORDEN DE CREACIÓN PASO A PASO

Esta sección te muestra **exactamente en qué orden** debes crear cada parte de la aplicación. Es el orden más lógico y eficiente para construir la app desde cero.

---

### 🏁 FASE 1: Configuración Inicial (5 minutos)

#### **Paso 1.1: Crear el proyecto con Vite**

```bash
npm create vite@latest app-list-books -- --template react
cd app-list-books
npm install
```

**¿Por qué primero?** Necesitas el proyecto base antes de hacer cualquier cosa.

#### **Paso 1.2: Probar que funciona**

```bash
npm run dev
```

Abre `http://localhost:5173` y verifica que ves la plantilla de Vite.

#### **Paso 1.3: Limpiar archivos innecesarios**

Elimina o vacía el contenido de:

- `src/App.css` (lo vamos a reescribir)
- El contenido del `return` en `src/App.jsx`
- El logo y assets que no uses

---

### 📊 FASE 2: Datos (10 minutos)

#### **Paso 2.1: Crear el archivo de datos**

📁 **Crear:** `public/books.json`

```json
{
  "library": [
    {
      "book": {
        "title": "El Señor de los Anillos",
        "pages": 1200,
        "genre": "Fantasía",
        "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
        "synopsis": "...",
        "year": 1954,
        "ISBN": "978-0618640157",
        "author": {
          "name": "J.R.R. Tolkien",
          "otherBooks": ["El Hobbit", "El Silmarillion"]
        }
      }
    }
  ]
}
```

**¿Por qué ahora?** Necesitas datos antes de poder mostrar nada.

**⚠️ Importante:** El archivo DEBE estar en `public/` para que Vite lo sirva correctamente.

---

### 🎨 FASE 3: Estructura Básica del App (15 minutos)

#### **Paso 3.1: Crear el App básico con estados**

📁 **Editar:** `src/App.jsx`

```javascript
import { useState } from "react";
import "./App.css";

function App() {
  // Estados básicos
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
      </header>

      <main className="main-content">
        <p>Hola Mundo</p>
      </main>
    </div>
  );
}

export default App;
```

**¿Por qué en este orden?**

1. Primero los imports
2. Luego los estados (siempre al inicio del componente)
3. Finalmente el return (JSX)

**🧪 Probar:** Verifica que se muestra "Hola Mundo"

---

### 📥 FASE 4: Cargar Datos (10 minutos)

#### **Paso 4.1: Agregar useEffect para fetch**

📁 **Editar:** `src/App.jsx`

```javascript
import { useState, useEffect } from "react"; // ⬅️ Agregar useEffect
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  // 🆕 Cargar libros al iniciar
  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Libros cargados:", data.library); // Para debug
        setBooks(data.library);
      })
      .catch((error) => console.error("Error:", error));
  }, []); // Array vacío = solo una vez

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
        <p>Total de libros: {books.length}</p> {/* ⬅️ Para verificar */}
      </header>

      <main className="main-content">
        <p>Libros cargados correctamente</p>
      </main>
    </div>
  );
}

export default App;
```

**🧪 Probar:**

1. Abre DevTools (F12)
2. Ve a Console
3. Deberías ver "Libros cargados: Array(13)"
4. En la página deberías ver "Total de libros: 13"

**¿Por qué ahora?** Antes de mostrar libros, necesitas cargarlos.

---

### 🃏 FASE 5: Componente BookCard (20 minutos)

#### **Paso 5.1: Crear el componente básico**

📁 **Crear:** `src/components/BookCard.jsx`

```javascript
function BookCard({ book }) {
  const { title, pages, genre, cover, author } = book.book;

  return (
    <article className="book-card">
      <img src={cover} alt={`Portada de ${title}`} className="book-cover" />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">Por {author.name}</p>
        <div className="book-details">
          <span className="book-genre">{genre}</span>
          <span className="book-pages">{pages} páginas</span>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
```

**¿Por qué esta estructura?**

1. Solo recibe `book` por ahora (simple)
2. Destructuring para acceder a los datos fácilmente
3. HTML semántico (`article`, `h3`, `p`)

#### **Paso 5.2: Usar BookCard en App**

📁 **Editar:** `src/App.jsx`

```javascript
import { useState, useEffect } from "react";
import "./App.css";
import BookCard from "./components/BookCard"; // ⬅️ Importar

function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.library))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
      </header>

      <main className="main-content">
        <section>
          <h2>Libros Disponibles</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {books.map((book) => (
              <BookCard
                key={book.book.ISBN} // ⬅️ key único
                book={book}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
```

**🧪 Probar:** Deberías ver todas las tarjetas de libros (sin estilos aún)

**¿Por qué `key`?** React necesita un identificador único para cada elemento en un array.

---

### 🎨 FASE 6: Estilos Básicos (15 minutos)

#### **Paso 6.1: Estilos del BookCard**

📁 **Crear:** `src/components/BookCard.css`

```css
.book-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.book-info {
  padding: 16px;
}

.book-title {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #333;
}

.book-author {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.book-details {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}
```

No olvides importarlo en `BookCard.jsx`:

```javascript
import "./BookCard.css"; // ⬅️ Al inicio del archivo
```

**🧪 Probar:** Ahora las tarjetas deberían verse bonitas

---

### ➕ FASE 7: Funcionalidad de Agregar/Quitar (25 minutos)

#### **Paso 7.1: Agregar funciones en App.jsx**

📁 **Editar:** `src/App.jsx`

```javascript
function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  // ... useEffect de fetch ...

  // 🆕 Funciones para manejar la lista de lectura
  const addToReadingList = (book) => {
    setReadingList([...readingList, book]);
  };

  const removeFromReadingList = (isbn) => {
    setReadingList(readingList.filter((book) => book.book.ISBN !== isbn));
  };

  const isInReadingList = (isbn) => {
    return readingList.some((book) => book.book.ISBN === isbn);
  };

  // 🆕 Filtrar libros disponibles
  const availableBooks = books.filter(
    (book) => !isInReadingList(book.book.ISBN),
  );

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
        <div className="stats">
          <div>📖 {availableBooks.length} disponibles</div>
          <div>❤️ {readingList.length} en lista</div>
        </div>
      </header>

      <main className="main-content">
        {/* Libros disponibles */}
        <section>
          <h2>Libros Disponibles</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {availableBooks.map((book) => (
              <BookCard
                key={book.book.ISBN}
                book={book}
                onAddToReading={addToReadingList} // ⬅️ Pasar función
                onRemoveFromReading={removeFromReadingList}
                isInReadingList={false} // ⬅️ No está en lista
              />
            ))}
          </div>
        </section>

        {/* Lista de lectura */}
        <aside>
          <h2>📚 Mi Lista de Lectura</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {readingList.map((book) => (
              <BookCard
                key={book.book.ISBN}
                book={book}
                onAddToReading={addToReadingList}
                onRemoveFromReading={removeFromReadingList}
                isInReadingList={true} // ⬅️ Sí está en lista
              />
            ))}
          </div>
          {readingList.length === 0 && (
            <p
              style={{ color: "#666", textAlign: "center", marginTop: "20px" }}
            >
              No hay libros en tu lista de lectura
            </p>
          )}
        </aside>
      </main>
    </div>
  );
}
```

#### **Paso 7.2: Actualizar BookCard para manejar clicks**

📁 **Editar:** `src/components/BookCard.jsx`

```javascript
import "./BookCard.css";

function BookCard({
  book,
  onAddToReading,
  onRemoveFromReading,
  isInReadingList,
}) {
  // ⬅️ Nuevas props
  const { title, pages, genre, cover, author } = book.book;

  // 🆕 Función para manejar el click
  const handleClick = () => {
    if (isInReadingList) {
      onRemoveFromReading(book.book.ISBN);
    } else {
      onAddToReading(book);
    }
  };

  return (
    <article className="book-card">
      <img src={cover} alt={`Portada de ${title}`} className="book-cover" />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">Por {author.name}</p>
        <div className="book-details">
          <span className="book-genre">{genre}</span>
          <span className="book-pages">{pages} páginas</span>
        </div>

        {/* 🆕 Botón para agregar/quitar */}
        <button
          className={`btn-action ${isInReadingList ? "btn-remove" : "btn-add"}`}
          onClick={handleClick}
        >
          {isInReadingList ? "❌ Quitar" : "➕ Agregar"}
        </button>
      </div>
    </article>
  );
}

export default BookCard;
```

#### **Paso 7.3: Estilos del botón**

📁 **Editar:** `src/components/BookCard.css`

Añade al final:

```css
.btn-action {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-add {
  background-color: #4caf50;
  color: white;
}

.btn-add:hover {
  background-color: #45a049;
}

.btn-remove {
  background-color: #f44336;
  color: white;
}

.btn-remove:hover {
  background-color: #da190b;
}
```

**🧪 Probar:**

1. Haz click en "Agregar" en un libro
2. Debería aparecer en "Mi Lista de Lectura"
3. Haz click en "Quitar"
4. Debería volver a los disponibles

---

### 🔍 FASE 8: Filtro por Género (15 minutos)

#### **Paso 8.1: Agregar estado y lógica de filtrado**

📁 **Editar:** `src/App.jsx`

```javascript
function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos"); // 🆕 Estado del filtro

  // ... useEffect y funciones existentes ...

  const availableBooks = books.filter(
    (book) => !isInReadingList(book.book.ISBN),
  );

  // 🆕 Filtrar por género
  const filteredBooks =
    selectedGenre === "Todos"
      ? availableBooks
      : availableBooks.filter((book) => book.book.genre === selectedGenre);

  // 🆕 Obtener géneros únicos
  const genres = ["Todos", ...new Set(books.map((book) => book.book.genre))];

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Mi Biblioteca</h1>
        <div className="stats">
          <div>📖 {filteredBooks.length} disponibles</div> {/* ⬅️ Cambiado */}
          <div>❤️ {readingList.length} en lista</div>
        </div>

        {/* 🆕 Selector de género */}
        <div className="filter-section">
          <label htmlFor="genre-filter">🔍 Filtrar por género:</label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="main-content">
        <section>
          <h2>Libros Disponibles</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredBooks.map(
              (book /* ⬅️ Cambiado de availableBooks a filteredBooks */) => (
                <BookCard
                  key={book.book.ISBN}
                  book={book}
                  onAddToReading={addToReadingList}
                  onRemoveFromReading={removeFromReadingList}
                  isInReadingList={false}
                />
              ),
            )}
          </div>
        </section>

        {/* ... aside con lista de lectura ... */}
      </main>
    </div>
  );
}
```

**🧪 Probar:**

1. Selecciona un género del dropdown
2. Solo deberían mostrarse libros de ese género

---

### 💾 FASE 9: Persistencia con localStorage (20 minutos)

#### **Paso 9.1: Cargar desde localStorage al iniciar**

📁 **Editar:** `src/App.jsx`

```javascript
function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  // useEffect para fetch (ya existe)
  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.library))
      .catch((error) => console.error("Error:", error));
  }, []);

  // 🆕 Cargar lista de lectura del localStorage
  useEffect(() => {
    const savedReadingList = localStorage.getItem("readingList");
    if (savedReadingList) {
      setReadingList(JSON.parse(savedReadingList));
    }
  }, []); // Solo al montar

  // 🆕 Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]); // Cada vez que cambia readingList

  // ... resto del código ...
}
```

**🧪 Probar:**

1. Agrega libros a tu lista
2. Recarga la página (F5)
3. Los libros deberían seguir en tu lista

---

### 🔄 FASE 10: Sincronización entre Pestañas (10 minutos)

#### **Paso 10.1: Agregar listener de storage**

📁 **Editar:** `src/App.jsx`

```javascript
function App() {
  // ... estados y otros useEffect ...

  // 🆕 Sincronización entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "readingList" && e.newValue) {
        setReadingList(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup: remover el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Solo al montar

  // ... resto del código ...
}
```

**🧪 Probar:**

1. Abre la app en dos pestañas
2. Agrega un libro en la pestaña 1
3. Ve a la pestaña 2
4. El libro debería aparecer automáticamente

---

### 🎨 FASE 11: Estilos Finales (15 minutos)

#### **Paso 11.1: Estilos de App**

📁 **Editar:** `src/App.css`

```css
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.header {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0 0 16px 0;
  color: #333;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.stat-item {
  background: #f0f0f0;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-section select {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.main-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.section-title {
  color: white;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
```

#### **Paso 11.2: Estilos globales**

📁 **Editar:** `src/index.css`

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**🧪 Probar:** Tu app debería verse profesional y completa

---

## 📊 RESUMEN DEL ORDEN

```
1. Configuración (Vite) → Proyecto base
2. Datos (books.json) → Información a mostrar
3. App básico + estados → Estructura y variables
4. Fetch datos → Llenar los estados
5. BookCard básico → Componente de visualización
6. Estilos BookCard → Hacer bonito
7. Funciones agregar/quitar → Interactividad
8. Filtro por género → Funcionalidad adicional
9. localStorage → Persistencia
10. Sync pestañas → Funcionalidad avanzada
11. Estilos finales → Pulir la UI
```

---

## 🎯 ¿Por Qué Este Orden?

### **Principio: De lo Simple a lo Complejo**

1. **Configuración primero** - Sin proyecto no hay nada
2. **Datos segundo** - Sin datos no hay qué mostrar
3. **UI básica tercero** - Ver algo en pantalla motiva
4. **Interactividad cuarto** - Hacer que funcione
5. **Features avanzados quinto** - Añadir mejoras
6. **Estilos al final** - Pulir la presentación

### **Ventajas de este orden:**

✅ **Testeable en cada paso** - Puedes probar después de cada fase
✅ **Incremental** - Cada paso construye sobre el anterior
✅ **Motivacional** - Ves progreso rápidamente
✅ **Debugging más fácil** - Si algo falla, sabes dónde
✅ **Funciona sin estilos** - La app funciona incluso sin CSS

---

## 🧠 Conceptos Clave de React

### 1. **useState** - Manejar Estado Local

```javascript
const [books, setBooks] = useState([]);
```

- `books`: valor actual del estado
- `setBooks`: función para actualizar el estado
- `[]`: valor inicial (array vacío)

**¿Cuándo se actualiza el componente?**

- Cuando llamas a `setBooks()` con un nuevo valor
- React re-renderiza el componente automáticamente

### 2. **useEffect** - Efectos Secundarios

```javascript
useEffect(() => {
  // Código que se ejecuta
}, [dependencies]);
```

**Array de dependencias:**

- `[]` vacío = ejecuta UNA vez al montar el componente
- `[variable]` = ejecuta cuando `variable` cambia
- Sin array = ejecuta en cada render (¡cuidado!)

### 3. **Props** - Pasar Datos Entre Componentes

```javascript
<BookCard
  book={book} // Props
  onAddToReading={addToReadingList} // Funciones como props
  isInReadingList={true} // Booleanos como props
/>
```

---

## 🧩 Componentes

### App.jsx - Componente Principal

#### **Estados (useState)**

```javascript
const [books, setBooks] = useState([]); // Todos los libros
const [readingList, setReadingList] = useState([]); // Lista de lectura
const [selectedGenre, setSelectedGenre] = useState("Todos"); // Filtro activo
```

#### **Efectos (useEffect)**

**1. Cargar libros al iniciar**

```javascript
useEffect(() => {
  fetch("/books.json")
    .then((response) => response.json())
    .then((data) => setBooks(data.library));
}, []); // [] = solo al montar
```

**2. Cargar lista de lectura desde localStorage**

```javascript
useEffect(() => {
  const saved = localStorage.getItem("readingList");
  if (saved) {
    setReadingList(JSON.parse(saved));
  }
}, []); // Solo al iniciar
```

**3. Guardar lista de lectura en localStorage**

```javascript
useEffect(() => {
  localStorage.setItem("readingList", JSON.stringify(readingList));
}, [readingList]); // Cuando readingList cambia
```

**4. Sincronización entre pestañas**

```javascript
useEffect(() => {
  const handleStorageChange = (e) => {
    if (e.key === "readingList" && e.newValue) {
      setReadingList(JSON.parse(e.newValue));
    }
  };
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);
```

⚠️ **Cleanup function**: retornar una función para limpiar el evento

#### **Funciones Principales**

**1. Agregar libro a lista de lectura**

```javascript
const addToReadingList = (book) => {
  setReadingList([...readingList, book]); // Spread operator
};
```

**2. Quitar libro de lista de lectura**

```javascript
const removeFromReadingList = (isbn) => {
  setReadingList(readingList.filter((book) => book.book.ISBN !== isbn));
};
```

**3. Verificar si libro está en lista**

```javascript
const isInReadingList = (isbn) => {
  return readingList.some((book) => book.book.ISBN === isbn);
};
```

**4. Filtrar libros disponibles**

```javascript
const availableBooks = books.filter((book) => !isInReadingList(book.book.ISBN));
```

**5. Filtrar por género**

```javascript
const filteredBooks =
  selectedGenre === "Todos"
    ? availableBooks
    : availableBooks.filter((book) => book.book.genre === selectedGenre);
```

**6. Obtener géneros únicos**

```javascript
const genres = ["Todos", ...new Set(books.map((book) => book.book.genre))];
```

- `new Set()` elimina duplicados
- `...` spread operator convierte Set a Array

---

### BookCard.jsx - Componente de Tarjeta

#### **Props que recibe:**

```javascript
function BookCard({ book, onAddToReading, onRemoveFromReading, isInReadingList })
```

#### **Destructuring:**

```javascript
const { title, pages, genre, cover, author } = book.book;
```

#### **Función handleClick:**

```javascript
const handleClick = () => {
  if (isInReadingList) {
    onRemoveFromReading(book.book.ISBN);
  } else {
    onAddToReading(book);
  }
};
```

---

## ⚙️ Funcionalidades Principales

### 1. **Carga de Datos**

- Fetch API obtiene datos desde `/books.json`
- `.then()` para manejar promesas
- Se almacena en estado `books`

### 2. **Persistencia con localStorage**

```javascript
// Guardar
localStorage.setItem("key", JSON.stringify(data));

// Leer
const data = JSON.parse(localStorage.getItem("key"));
```

### 3. **Filtrado por Género**

- Select dropdown con géneros únicos
- onChange actualiza `selectedGenre`
- Array filtrado reactivamente

### 4. **Sincronización entre Pestañas**

- Event listener `storage` detecta cambios en localStorage
- Solo se dispara en otras pestañas (no en la actual)

---

## 🔄 Flujo de Datos

```
1. Usuario abre app
   ↓
2. useEffect carga books.json → setBooks()
   ↓
3. useEffect carga readingList desde localStorage
   ↓
4. Usuario filtra por género
   ↓
5. onChange → setSelectedGenre() → re-render con filtro
   ↓
6. Usuario hace clic en "Agregar"
   ↓
7. handleClick → addToReadingList() → setReadingList()
   ↓
8. useEffect detecta cambio en readingList
   ↓
9. Guarda en localStorage
   ↓
10. Otras pestañas detectan cambio y actualizan
```

---

## 🎓 Tips para el Examen

### **Conceptos que DEBES saber:**

#### 1. **Diferencia entre Estado y Props**

- **Estado (useState)**: datos que maneja el componente, pueden cambiar
- **Props**: datos que recibe de su padre, son INMUTABLES

#### 2. **¿Cuándo usar useEffect?**

- Cargar datos (fetch)
- Sincronizar con localStorage
- Suscribirse a eventos
- Cleanup (limpiar efectos)

#### 3. **Array methods importantes:**

```javascript
.map()      // Transformar array
.filter()   // Filtrar elementos
.some()     // ¿Existe alguno que cumpla condición?
.find()     // Encontrar primer elemento
```

#### 4. **Spread Operator (`...`)**

```javascript
[...array, newItem]              // Agregar al final
{ ...object, newProp: value }    // Agregar propiedad
```

#### 5. **Conditional Rendering**

```javascript
{
  condition && <Component />;
} // Si condition es true
{
  condition ? <A /> : <B />;
} // If-else
```

#### 6. **Event Handling**

```javascript
onClick={handleClick}           // ✅ Correcto
onClick={() => handleClick()}   // ✅ Con función anónima
onClick={handleClick()}         // ❌ Se ejecuta inmediatamente
```

---

## 📝 Checklist para Replicar la App

- [ ] Crear proyecto con Vite: `npm create vite@latest`
- [ ] Instalar dependencias: `npm install`
- [ ] Crear estructura de carpetas
- [ ] Crear `books.json` en public/
- [ ] Crear componente `App.jsx` con:
  - [ ] Estados: books, readingList, selectedGenre
  - [ ] useEffect para cargar datos
  - [ ] useEffect para localStorage (cargar y guardar)
  - [ ] useEffect para sincronización
  - [ ] Funciones: add, remove, isInReadingList
  - [ ] Lógica de filtrado
- [ ] Crear componente `BookCard.jsx` con:
  - [ ] Props correctamente desestructuradas
  - [ ] handleClick con lógica condicional
  - [ ] Render del libro
- [ ] Añadir estilos CSS
- [ ] Probar funcionalidad

---

## 🧪 Preguntas de Práctica

### Pregunta 1: ¿Qué hace este código?

```javascript
useEffect(() => {
  fetch("/books.json")
    .then((response) => response.json())
    .then((data) => setBooks(data.library));
}, []);
```

**Respuesta:** Carga los libros desde `books.json` UNA vez cuando el componente se monta (por el array vacío `[]`).

### Pregunta 2: ¿Por qué necesitamos useEffect para localStorage?

**Respuesta:** Para sincronizar el estado de React con localStorage. Cada vez que `readingList` cambia, guardamos en localStorage automáticamente.

### Pregunta 3: ¿Qué hace el spread operator aquí?

```javascript
setReadingList([...readingList, book]);
```

**Respuesta:** Crea un NUEVO array con todos los elementos de `readingList` más el nuevo `book`. Es importante crear un nuevo array para que React detecte el cambio.

### Pregunta 4: ¿Qué hace `new Set()`?

```javascript
const genres = ["Todos", ...new Set(books.map((book) => book.book.genre))];
```

**Respuesta:** Elimina géneros duplicados. `Set` solo guarda valores únicos, luego se convierte a array con spread operator.

---

## 🎯 Errores Comunes a Evitar

1. **No incluir dependencias en useEffect**

   ```javascript
   // ❌ Mal
   useEffect(() => {
     console.log(books);
   }, []); // books no está en dependencias

   // ✅ Bien
   useEffect(() => {
     console.log(books);
   }, [books]);
   ```

2. **Mutar el estado directamente**

   ```javascript
   // ❌ Mal
   readingList.push(book);
   setReadingList(readingList);

   // ✅ Bien
   setReadingList([...readingList, book]);
   ```

3. **Olvidar el cleanup en useEffect**

   ```javascript
   // ❌ Mal
   useEffect(() => {
     window.addEventListener("storage", handler);
   }, []);

   // ✅ Bien
   useEffect(() => {
     window.addEventListener("storage", handler);
     return () => window.removeEventListener("storage", handler);
   }, []);
   ```

4. **Llamar funciones con paréntesis en onClick**

   ```javascript
   // ❌ Mal
   <button onClick={handleClick()}>

   // ✅ Bien
   <button onClick={handleClick}>
   <button onClick={() => handleClick(param)}>
   ```

---

## 🚀 Resumen Rápido (5 minutos antes del examen)

### **Estructura básica:**

1. `main.jsx` renderiza `<App />`
2. `App.jsx` tiene la lógica principal
3. `BookCard.jsx` es el componente reutilizable

### **Estados en App:**

- `books` - todos los libros
- `readingList` - libros seleccionados
- `selectedGenre` - filtro activo

### **useEffect en App:**

1. Cargar books.json (1 vez)
2. Cargar localStorage (1 vez)
3. Guardar localStorage (cuando readingList cambia)
4. Sincronizar pestañas (siempre activo)

### **Funciones clave:**

- `addToReadingList` - agrega libro
- `removeFromReadingList` - quita libro
- `isInReadingList` - verifica si está en lista
- Filtrado: `availableBooks` → `filteredBooks`

### **Props a BookCard:**

- `book` - objeto libro
- `onAddToReading` - función para agregar
- `onRemoveFromReading` - función para quitar
- `isInReadingList` - booleano

---

## 📚 Recursos Adicionales

- [Documentación oficial de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [MDN Web Docs - localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

---

**¡Buena suerte en tu examen! 🎓✨**
