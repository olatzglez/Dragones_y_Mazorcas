export function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `
    <div class="header__container">
      <h1 class="logo">🎲 BoardGames Finder</h1>
      <nav class="nav" id="nav">
        <a href="#">Inicio</a>
        <a href="#">Explorar</a>
        <a href="#">Favoritos</a>
        <a href="#">Acerca de</a>
      </nav>
      <div class="header__actions">
        <button class="btn-login" id="btnLogin">Iniciar sesión</button>
        <button class="btn-darkmode" id="btnDarkmode">🌙</button>
        <button class="menu-toggle" id="menuToggle">☰</button>
      </div>
    </div>
  `;
  return header;
}

export function initHeaderEvents() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const btnDarkmode = document.getElementById("btnDarkmode");

  // Menú responsive
  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
    toggle.textContent = nav.classList.contains("nav--open") ? "✕" : "☰";
  });

  // Dark mode
  btnDarkmode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btnDarkmode.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}