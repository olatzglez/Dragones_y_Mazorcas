import { createHeader, initHeaderEvents } from "./dom/header.js";
import { createFooter } from "./dom/footer.js";

// Crear header
const header = createHeader();
document.body.prepend(header);

// Activar eventos
initHeaderEvents();

// Crear footer
document.body.appendChild(createFooter());