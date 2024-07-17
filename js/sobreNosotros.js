import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

document.addEventListener("DOMContentLoaded", () => {
  // Manejar el evento click de los botones
  document.querySelector(".back-btn").addEventListener("click", () => {
    window.history.back();
  });

  document.querySelector(".contact-btn").addEventListener("click", () => {
    location.href = "contacto.html"
  });
});
