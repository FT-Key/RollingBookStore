import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";
import resizeCanvas from "./canvas.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

resizeCanvas();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#btn-regresar').addEventListener('click', () => {
        history.back();
    });
});
