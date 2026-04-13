export function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `
    <div class="header__container">
      <a href="index.html" class="logo">
        <img 
          id="logoImg"
          src="./src/assets/images/logo_bg_white.jpg" 
          alt="Dragones y Mazorcas logo" 
          class="logo__img"
        />
        <h1 class="logo__text">Dragones y Mazorcas</h1>
      </a>
      <nav class="nav" id="nav">
        <a href="index.html">Inicio</a>
        <a href="buscador.html">Explorar</a>
        <a href="favorites.html">Favoritos</a>
        <a href="#">Acerca de</a>
      </nav>
      <div class="header__actions">
        <button class="btn btn-primary" id="btnLogin">Iniciar sesión</button>
        <button class="btn btn-tertiary" id="btnDarkmode">🌙</button>
        <button class="menu-toggle" id="menuToggle">☰</button>
      </div>
    </div>
  `;
  return header;
}

export function initHeaderEvents() {
  const toggle      = document.getElementById("menuToggle");
  const nav         = document.getElementById("nav");
  const btnDarkmode = document.getElementById("btnDarkmode");
  const logoImg     = document.getElementById("logoImg");

  const LOGO_LIGHT = "./src/assets/images/logo_bg_white.jpg";
  const LOGO_DARK  = "./src/assets/images/logo_bg_black.jpg";

  // ── Menú responsive ───────────────────────────
  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
    toggle.textContent = nav.classList.contains("nav--open") ? "✕" : "☰";
  });

  // ── Función para aplicar el tema ──────────────
  function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    btnDarkmode.textContent = isDark ? "☀️" : "🌙";
    logoImg.src = isDark ? LOGO_DARK : LOGO_LIGHT;
  }

  // ── Dark mode con persistencia ─────────────────
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark");

  btnDarkmode.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}