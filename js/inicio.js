import * as LibrosModule from "./manejadorLibros.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as UsuariosModule from "./manejadorUsuarios.js";
import resizeCanvas from "./canvas.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(false, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

// Genera las cards de los libros
export function generarCards(palabraClave = '') {
  const containerCards = document.querySelector("#container-productos");
  let librosSinFiltro = LibrosModule.recuperarLibrosDeLocalStorage();
  let libros;

  if (UsuariosModule.recuperarUsuarioDeSessionStorage().role != "admin") {
    librosSinFiltro = librosSinFiltro.filter(libro => libro.disponible == true);
  }

  if (palabraClave) {
    // Convertir la palabra clave a minúsculas para una búsqueda insensible a mayúsculas
    const palabraClaveMinuscula = palabraClave.toLowerCase();

    // Filtrar libros por título o cualquier categoría que contenga la palabra clave
    libros = librosSinFiltro.filter(libro =>
      libro.titulo.toLowerCase().includes(palabraClaveMinuscula) || libro.autor.toLowerCase().includes(palabraClaveMinuscula) || libro.categorias.some(cat => cat.toLowerCase().includes(palabraClaveMinuscula))
    );
  } else {
    // Si no hay palabra clave, mostrar todos los libros
    libros = librosSinFiltro;
  }

  if (!libros.length) {
    const h1 = document.createElement('h1');
    h1.textContent = `No se encontraron resultados para la búsqueda '${palabraClave}'`;
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
                    <a class="btn btn-primary btn-card" data-id="">Ver detalles</a>
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

    // Función para añadir event listeners a los botones
    const botonesDetalle = document.querySelectorAll(".btn-card");
    botonesDetalle.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar que el enlace navegue automáticamente
        const idLibro = boton.getAttribute("data-id");
        // Redirigir a detalleLibro.html con el ID del libro
        window.location.href = `./detalleLibro.html?id=${idLibro}`;
      });
    });
  }

  if (UsuariosModule.recuperarUsuarioDeSessionStorage().role == "admin" && !document.querySelector('.btn-nuevo')) {
    const divBtnNuevo = document.createElement("div");
    divBtnNuevo.classList.add('div-btn-nuevo', 'd-flex', 'justify-content-start', 'w-100', 'ps-5');
    const btnNuevo = document.createElement("button");
    btnNuevo.type = "button";
    btnNuevo.classList.add('btn', 'btn-primary', 'btn-nuevo');
    btnNuevo.textContent = "Nuevo libro";
    btnNuevo.addEventListener('click', () => {
      window.location.href = `./editarLibro.html?id=-1`;
    });

    divBtnNuevo.appendChild(btnNuevo);

    containerCards.insertAdjacentElement('beforebegin', divBtnNuevo);
  }

  resizeCanvas();
}

// Establece un evento para los botones de las cards, el cual redirige a la pagina de detalle del libro y otro para la barra de busqueda
document.addEventListener("DOMContentLoaded", () => {
  // Redimensionar el canvas
  resizeCanvas();

  const agregarEventoABotonBusqueda = () => {
    const botonSearch = document.querySelector('#botonBusquedaNavbar');

    botonSearch.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe automáticamente
      const inputBusqueda = document.querySelector("#inputBusquedaNavbar");
      const palabraClave = inputBusqueda.value;

      // Obtiene la URL actual
      let url = new URL(window.location.href);

      if (url.search != '') {
        // Limpia los parámetros de búsqueda
        url.search = '';

        // Actualiza la URL sin recargar la página
        window.history.replaceState({}, document.title, url.toString());
      }

      generarCards(palabraClave);

      inputBusqueda.form.reset();
    });
  };

  agregarEventoABotonBusqueda();
});

function generarDestacados() {
  let librosdestacados = localStorage.getItem("librosdestacados");
  if (!librosdestacados) return;

  librosdestacados = JSON.parse(librosdestacados);

  const destacados = document.querySelector("#container-destacados");

  let estructura = `
    <h1 class="text-center">Libros Destacados</h1>
    <div class="destacados my-4 w-100">
        <div class="slider" reverse="true" style="
        --width: 200px;
        --height: 330px;
        --quantity: ${librosdestacados.length};
        --time: 7s;
        ">
          <div class="list">`;

  for (let i = 0; i < librosdestacados.length; i++) {
    estructura += `<a href="" class="item" style="--position: ${i + 1}">
              <abbr title=""><img src="images/slider2_1.png" alt=""></abbr>
              </a>`;
  }

  estructura += `</div></div></div>`;

  destacados.insertAdjacentHTML("beforeend", estructura);
  //destacados.innerHTML = estructura;

  const items = destacados.querySelectorAll(".item");
  const abbrs = destacados.querySelectorAll(".item abbr");
  const imgs = destacados.querySelectorAll(".item img");

  librosdestacados.forEach((libro, i) => {
    items[i].href = `./detalleLibro.html?id=${libro.id}`;
    abbrs[i].title = libro.titulo;
    imgs[i].src = libro.imagenURL;
  });

  if (UsuariosModule.recuperarUsuarioDeSessionStorage().role == "admin") {
    const divBtnEdit = document.createElement("div");
    divBtnEdit.classList.add('div-edit-destacados', 'd-flex', 'justify-content-start', 'w-100', 'ps-5', 'pt-3');
    const btnEdit = document.createElement("button");
    btnEdit.type = "button";
    btnEdit.classList.add('btn', 'btn-primary', 'btn-edit-destacados');
    btnEdit.textContent = "Editar destacados";
    btnEdit.addEventListener('click', () => {
      window.location.href = `./adminDestacados.html`;
    });

    divBtnEdit.appendChild(btnEdit);

    destacados.insertAdjacentElement('beforebegin', divBtnEdit);
  }
}

// Función para extraer el valor de palabraClave del pathname
function obtenerValorPalabraClave() {
  // Obtener los parámetros de búsqueda (query parameters)
  const params = new URLSearchParams(window.location.search);

  if (params.has('palabraClave')) {
    // Encontrado, retornar el valor de palabraClave
    return params.get('palabraClave');
  } else {
    // No encontrado
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  generarDestacados();
  generarCards(obtenerValorPalabraClave() || '');
});