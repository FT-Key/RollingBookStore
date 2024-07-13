import * as LibrosModule from "./manejadorLibros.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as UsuariosModule from "./manejadorUsuarios.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(false, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

export function generarCardsFavoritos() {
  const contenedorFav = document.querySelector('.contenedor-favoritos');

  const titulo = document.createElement('h1');
  titulo.textContent = "Favoritos";
  titulo.classList.add('text-center', 'pt-2');
  contenedorFav.insertAdjacentElement('afterbegin', titulo);
  
  const containerCards = document.querySelector("#container-productos");
  const favoritos = UsuariosModule.recuperarUsuarioDeSessionStorage().favoritos;
  const librosSinFiltro = LibrosModule.recuperarLibrosDeLocalStorage();
  const libros = librosSinFiltro.filter(libro => favoritos.includes(libro.id));

  if (!libros.length) {
    const h1 = document.createElement('h1');
    h1.textContent = `No hay ningún libro agregado a favoritos`;
    containerCards.innerHTML = '';
    containerCards.insertAdjacentElement('beforeend', h1);
  } else {
    let estructuraCards = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-4 w-100">`;

    for (let i = 0; i < libros.length; i++) {
      estructuraCards += `
          <div class="col">
              <div class="card">
                  <img class="card-img-top" alt="">
                  <div class="card-body">
                      <abbr title=""><h5 class="card-title"></h5></abbr>
                      <p class="card-text"></p>
                      <h5 class="card-price"></h5>
                      <a class="btn btn-primary" data-id="">Ver detalles</a>
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
    const textos = containerCards.querySelectorAll(".card-text");
    const precios = containerCards.querySelectorAll(".card-price");
    const enlaces = containerCards.querySelectorAll(".btn-primary");

    // Iterar sobre los libros y asignarles los valores correspondientes
    libros.forEach((libro, index) => {
      imagenes[index].src = libro.imagenURL;
      imagenes[index].alt = libro.titulo;
      abbrs[index].title = libro.titulo;
      titulos[index].textContent = libro.titulo;
      textos[index].textContent = libro.descripcion;
      precios[index].textContent = `$${libro.precio.toFixed(2)}`;
      enlaces[index].setAttribute("data-id", libro.id);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  generarCardsFavoritos();
});