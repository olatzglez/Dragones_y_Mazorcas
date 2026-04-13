# Dragones y Mazorcas — Buscador y comparador de juegos de mesa

> Buscador y comparador de juegos de mesa construido con Vanilla JavaScript, HTML5 y CSS3.

**Autora:** Olatz González  
**Módulo:** JavaScript — Proyecto Individual · Bootcamp Full Stack  
**Repositorio:** [github.com/olatzglez/IndividualJS](https://github.com/olatzglez/Dragones_y_Mazorcas)

---

## Descripción

El mercado de juegos de mesa supera los 100.000 títulos registrados en BoardGameGeek (BGG), lo que dificulta enormemente explorar, comparar y decidirse por un juego concreto.

**Dragones y Mazorcas** es una aplicación web 100% frontend que consume la API pública de BGG mediante un proxy local y permite al usuario **buscar, filtrar, guardar y comparar** juegos en una sola interfaz, sin recargar la página.

---

## Funcionalidades

- **Búsqueda por nombre** — resultados dinámicos desde la API de BGG
- **Filtros avanzados** — número de jugadores, edad mínima, duración, categoría, complejidad y año de publicación
- **Gestión de favoritos** — añadir y eliminar con persistencia en `localStorage` entre sesiones
- **Tabla comparativa** — ordenación dinámica por cualquier columna en la página de favoritos
- **Exportación PDF / CSV** — descarga directa de la tabla comparativa desde el navegador
- **Dark mode persistente** — modo oscuro/claro con preferencia guardada en `localStorage`
- **Diseño responsive** — adaptado a móvil, tablet y escritorio (breakpoints en 480px y 768px)
- **Header y footer dinámicos** — componentes reutilizables generados desde JavaScript

---

## Páginas

| Página | Descripción |
|---|---|
| `index.html` | Landing page — presentación del proyecto y acceso a la app |
| `buscador.html` | Explorador — búsqueda, filtros y listado de juegos |
| `favorites.html` | Mis favoritos — cards, tabla comparativa y exportación |

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de páginas |
| CSS3 + Variables | Sistema de diseño, dark mode y responsive |
| JavaScript ES6 | Lógica de la app (módulos, clases, async/await) |
| Fetch API | Consumo asíncrono de la API de BGG |
| localStorage | Persistencia de favoritos y preferencia de tema |
| Node.js + Express | Servidor proxy (evita CORS con la API XML de BGG) |
| BGG XML API | Fuente de datos — más de 100.000 juegos de mesa |
| jsPDF + AutoTable | Generación de PDF desde el navegador |

---

## Arquitectura — Modelo de clases (POO)

```
ApiService          →     BoardGame          →     Favorites
──────────          →     ─────────          →     ─────────
searchGames()             getPlayers()             add(game)
getGame()                 getPlaytime()            remove(id)
                          getRating()              getAll()
                          getWeight()              isFavorite(id)
                          getDescription()         count()
                          toJSON()
                          fromJSON()  ← rehidratación desde localStorage
```

**Flujo de datos:** `ApiService` obtiene los datos crudos → `BoardGame` los modela → `Favorites` los almacena.

---

## Estructura del proyecto

```
IndividualJS/
├── docs/
│   ├── memoria.md               # Memoria técnica del proyecto
│   └── README.md
├── js/
│   ├── api/
│   │   └── apiService.js        # Servicio de consumo de API
│   ├── classes/
│   │   ├── Game.js              # Clase base
│   │   ├── BoardGame.js         # Clase del dominio (hereda de Game)
│   │   └── Favorites.js        # Gestión de favoritos con localStorage
│   └── dom/
│       ├── header.js            # Componente header dinámico
│       ├── footer.js            # Componente footer dinámico
│       └── filters.js           # Lógica de filtros avanzados
├── src/
│   ├── assets/images/           # Logos y recursos gráficos
│   └── css/
│       ├── styles.css           # Variables CSS globales
│       ├── components.css       # Botones y componentes UI
│       ├── header.css           # Estilos del header
│       ├── footer.css           # Estilos del footer
│       ├── landing.css          # Estilos de la landing page
│       └── darkmode.css         # Sobreescritura de variables para modo oscuro
├── index.html                   # Landing page
├── buscador.html                # Explorador de juegos
├── favorites.html               # Página de favoritos
├── server.js                    # Servidor proxy Node.js + Express
├── .env                         # Token de la API de BGG (no incluido en el repo)
├── .gitignore
└── README.md
```

---

## Instalación y ejecución

### Requisitos previos

- Node.js instalado
- Token de la API de BGG ([regístrate aquí](https://boardgamegeek.com/using_the_xml_api))

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/olatzglez/IndividualJS.git
cd IndividualJS

# 2. Instalar dependencias del servidor
cd server
npm install
cd ..

# 3. Crear el archivo .env con tu token de BGG
echo "BGG_TOKEN=tu_token_aqui" > .env

# 4. Arrancar el servidor proxy
node server.js

# 5. Abrir la aplicación en el navegador
# Usa Live Server en VS Code o cualquier servidor local
# → http://127.0.0.1:5500/index.html
```

> El servidor proxy debe estar corriendo para que las búsquedas funcionen.


---

## Ramas del proyecto

| Rama | Descripción |
|---|---|
| `main` | Versión estable del proyecto |
| `develop` | Integración de todas las funcionalidades |
| `feature/ui` | Componentes dinámicos, estilos y responsive |
| `feature/api-service` | Lógica de consumo de la API de BGG |
| `feature/game-model` | Modelo de clases POO |

---

## Requisitos implementados

- [x] Programación Orientada a Objetos (clases y herencia)
- [x] Manipulación dinámica del DOM
- [x] Consumo de API con `fetch` y `async/await`
- [x] Uso de `localStorage` para persistencia
- [x] Sistema de búsqueda y filtrado avanzado
- [x] Interfaz responsive y accesible
- [x] Módulos ES6 (`import/export`)
- [x] Dark mode con persistencia *(opcional)*
- [x] Exportación a PDF y CSV *(opcional)*

---

## Autora

**Olatz González** — Proyecto del Bootcamp de Desarrollo Full Stack · Abril 2026