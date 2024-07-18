import * as librosModule from "./manejadorLibros.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";
import * as ValidacionesModule from "./validaciones.js";

RutasProtegidassModule.protegerRuta(false, false, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

function inicializar() {
    // Obtener productos
    const containerCards = document.querySelector("#container-producto");
    const containerDestacados = document.querySelector("#container-destacados");
    containerCards.innerHTML = ``;
    containerDestacados.innerHTML = ``;

    let destacadoACambiar;

    // Container Destacados

    let estructuraDestacados =
        `<div id="destacados" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 w-100">
        <div class="col d-flex align-items-center flex-column">
            <img class="destacados-img" alt="">
            <abbr class="text-decoration-none pt-1" title=""><h5 class="title"></h5></abbr>
            <button class="btn-destacados btn btn-primary">Cambiar</button>
        </div>
        <div class="col d-flex align-items-center flex-column">
            <img class="destacados-img" alt="">
            <abbr class="text-decoration-none pt-1" title=""><h5 class="title"></h5></abbr>
            <button class="btn btn-primary btn-destacados">Cambiar</button>
        </div>
        <div class="col d-flex align-items-center flex-column">
            <img class="destacados-img" alt="">
            <abbr class="text-decoration-none pt-1" title=""><h5 class="title"></h5></abbr>
            <button class="btn-destacados btn btn-primary">Cambiar</button>
        </div>
    </div>`;

    containerDestacados.innerHTML = estructuraDestacados;

    const librosDestacados = librosModule.recuperarDestacadosDeLocalStorage();
    const imagenesDestacados = document.querySelectorAll('#destacados .col .destacados-img');
    const titulosDestacados = document.querySelectorAll('#destacados .col .title');
    const abbrsDestacados = document.querySelectorAll('#destacados .col abbr');

    for (let i = 0; i < 3; i++) {
        imagenesDestacados[i].src = librosDestacados[i].imagenURL || "https://via.placeholder.com/200x300";
        imagenesDestacados[i].alt = librosDestacados[i].titulo || "Imágen genérica";
        titulosDestacados[i].textContent = librosDestacados[i].titulo || "Sin libro";
        abbrsDestacados[i].title = librosDestacados[i].titulo || "Sin libro";
    }

    const btnDestacados = document.querySelectorAll('#destacados .col button');

    function actualizarBotones(indexParaCancelar) {
        btnDestacados.forEach((button, index) => {
            button.classList.remove('btn-success', 'disabled');
            button.classList.add('btn-primary');
            button.textContent = "Cambiar";
            button.removeEventListener('click', cancelarEvento);
            button.addEventListener('click', eventoBoton);
            if (index === indexParaCancelar) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-success');
                button.textContent = "Cancelar";
                button.removeEventListener('click', eventoBoton);
                button.addEventListener('click', cancelarEvento);
            } else if (indexParaCancelar !== -1) {
                button.classList.add('disabled');
            }
        });

    }

    function eventoBoton(e) {
        const index = Array.from(btnDestacados).indexOf(e.currentTarget);
        generarCards();
        destacadoACambiar = index;
        actualizarBotones(index);
    }

    function cancelarEvento() {
        limpiarCards();
        actualizarBotones(-1);
    }

    btnDestacados.forEach(button => {
        button.addEventListener('click', eventoBoton);
    });

    function generarCards() {
        const libros = librosModule.recuperarLibrosDeLocalStorage();

        // Container Cards

        let estructuraCards = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-4 w-100">`;

        for (let i = 0; i < libros.length; i++) {
            estructuraCards += `
            <div class="col d-flex flex-column align-items-center">
                <div class="card">
                    <img class="card-img-top" alt="">
                    <div class="card-body">
                        <abbr title=""><h5 class="card-title"></h5></abbr>
                        <a class=" btn-select btn btn-success btn-card" data-id="">Seleccionar</a>
                    </div>
                </div>
            </div>
            `;
        }

        estructuraCards += `</div>`;
        containerCards.innerHTML = estructuraCards;

        // Seleccionar todos los elementos generados dentro del containerCards
        const imagenes = containerCards.querySelectorAll(".card-img-top");
        const abbrs = containerCards.querySelectorAll("abbr");
        const titulos = containerCards.querySelectorAll(".card-title");
        const btnCards = containerCards.querySelectorAll(".btn-select");

        // Iterar sobre los libros y asignarles los valores correspondientes
        libros.forEach((libro, index) => {
            imagenes[index].src = libro.imagenURL;
            imagenes[index].alt = libro.titulo;
            abbrs[index].title = libro.titulo;
            titulos[index].textContent = libro.titulo;
            btnCards[index].setAttribute("data-id", libro.id - 1);
        });

        btnCards.forEach(btn => {
            btn.addEventListener('click', () => {
                librosDestacados[destacadoACambiar] = libros[btn.getAttribute('data-id')];
                librosModule.guardarDestacadosEnLocalStorage(librosDestacados);
                inicializar();
            });
        });

    }

    function limpiarCards() {
        containerCards.innerHTML = ``;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
});
