import { createHeader, initHeaderEvents } from "./dom/header.js";

const app = document.getElementById("app");

// Crear header
const header = createHeader();
document.body.prepend(header);

// Activar eventos
initHeaderEvents();

// Crear footer
import { createFooter } from "./dom/footer.js";
document.body.appendChild(createFooter());