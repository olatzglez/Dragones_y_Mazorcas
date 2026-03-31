export function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = `
    <div class="header__container">
      <h1 class="logo">🎲 BoardGames</h1>

      <nav class="nav" id="nav">
        <a href="#">Inicio</a>
        <a href="#">Favoritos</a>
      </nav>

      <button class="menu-toggle" id="menuToggle">
        ☰
      </button>
    </div>
  `;

  return header;
}