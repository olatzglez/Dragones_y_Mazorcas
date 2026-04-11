export function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = `
    <div class="footer__grid">
      <div class="footer__brand">
        <h2 class="footer__logo">Dragones y Mazorcas</h2>
        <p class="footer__desc">Tu app para descubrir, explorar y guardar juegos de mesa.</p>
        <div class="footer__social">
          <a href="https://github.com/olatzglez/IndividualJS" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:contacto@boardgamesfinder.com">Contacto</a>
        </div>
      </div>
      <div class="footer__col">
        <h4>La app</h4>
        <ul>
          <li><a href="#">Quiénes somos</a></li>
          <li><a href="#">Contacto</a></li>
          <li><a href="#">GitHub</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacidad</a></li>
          <li><a href="#">Cookies</a></li>
          <li><a href="#">Aviso legal</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2026 BoardGames Finder · Olatz González</p>
      <a class="footer__top" href="#">Subir ↑</a>
    </div>
  `;
  return footer;
}