import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

document.addEventListener("DOMContentLoaded", () => {
  // Manejar el evento click del botón de Iniciar Sesión
  document.querySelector(".back-btn").addEventListener("click", () => {
    window.history.back();
  });
});
