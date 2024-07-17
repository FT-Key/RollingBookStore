import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as UsuariosModule from "./manejadorUsuarios.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

function tamañoMain() {
    const tamañoHeader = document.querySelector('header').getBoundingClientRect().height;
    const tamañoFooter = document.querySelector('footer').getBoundingClientRect().height;
    const tamañoBody = document.body.getBoundingClientRect().height;

    const main = document.querySelector('main');

    // Calculamos el ancho restando el tamaño del header y footer al tamaño del body
    const anchoMain = tamañoBody - (tamañoFooter + tamañoHeader);

    // Asignamos el ancho calculado al main
    main.style.height = anchoMain + "px";
}

function bienvenidaIndex() {
    const usuarioActual = UsuariosModule.recuperarUsuarioDeSessionStorage();

    let divBotones = `<div class="d-flex flex-column gap-3 py-3">`;

    if (usuarioActual) {
        divBotones += `<a class="btn btn-primary" href="pages/inicio.html">Inicio</a>`;
    } else {
        divBotones += `<div class="d-flex gap-3">
        <a class="btn btn-primary" href="pages/inicioSesion.html">Iniciar Sesión</a>
        <a class="btn btn-success" href="pages/registro.html">Registrarse</a>
        </div>
        `;
    }

    divBotones += `</div>`

    const containerBienvenida = document.querySelector('.container-bienvenida');
    console.log(containerBienvenida);
    containerBienvenida.innerHTML += divBotones;
}

window.addEventListener('resize', () => {
    tamañoMain();
});

document.querySelector('body').addEventListener('resize', () => {
    tamañoMain();
});

document.addEventListener('DOMContentLoaded', () => {
    tamañoMain();
    bienvenidaIndex();
});