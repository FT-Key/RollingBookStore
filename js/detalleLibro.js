import * as librosModule from './manejadorLibros.js';
import * as RutasProtegidassModule from './rutasProtegidas.js';
import * as NavbarModule from './manejadorNavbar.js';

RutasProtegidassModule.protegerRuta(false, true, true);
NavbarModule.inicializarNavbar();

function inicializar() {
    // Obtener el string de consulta de la URL
    const queryString = window.location.search;

    // Crear un objeto URLSearchParams con el string de consulta
    const urlParams = new URLSearchParams(queryString);

    if (urlParams) {
        // Obtener el valor del parámetro 'id'
        const id = parseInt(urlParams.get('id'));
        // Obtener productos
        const productos = librosModule.recuperarLibrosDeLocalStorage();
        const producto = productos.find(prod => prod.id == id);
        const containerProducto = document.querySelector('#container-producto');

        containerProducto.innerHTML = `
        <img class="producto-img" src="" alt="...">
        <div class="producto-info">
            <h2 class="producto-titulo"></h2>
            <p class="producto-descripcion"></p>
            <h4 class="producto-precio"></h4>
            <p class="producto-autor"><strong>Autor:</strong> <span></span></p>
            <p class="producto-isbn"><strong>ISBN:</strong> <span></span></p>
            <p class="producto-editorial"><strong>Editorial:</strong> <span></span></p>
            <p class="producto-fecha-publicacion"><strong>Fecha de Publicación:</strong> <span></span></p>
            <p class="producto-paginas"><strong>Páginas:</strong> <span></span></p>
            <p class="producto-genero"><strong>Género:</strong> <span></span></p>
            <p class="producto-idioma"><strong>Idioma:</strong> <span></span></p>
            <p class="producto-stock"><strong>Stock:</strong> <span></span></p>
            <div class="botones">
                <button class="btn favoritos">Agregar a Favoritos</button>
                <button class="btn btn-success">Agregar al Carrito</button>
            </div>
        </div>
        `;

        const img = containerProducto.querySelector('.producto-img');
        const titulo = containerProducto.querySelector('.producto-titulo');
        const descripcion = containerProducto.querySelector('.producto-descripcion');
        const precio = containerProducto.querySelector('.producto-precio');
        const autor = containerProducto.querySelector('.producto-autor span');
        const isbn = containerProducto.querySelector('.producto-isbn span');
        const editorial = containerProducto.querySelector('.producto-editorial span');
        const fechaPublicacion = containerProducto.querySelector('.producto-fecha-publicacion span');
        const paginas = containerProducto.querySelector('.producto-paginas span');
        const genero = containerProducto.querySelector('.producto-genero span');
        const idioma = containerProducto.querySelector('.producto-idioma span');
        const stock = containerProducto.querySelector('.producto-stock span');

        if (producto) {
            img.src = producto.imagenURL;
            img.alt = producto.titulo;
            titulo.textContent = producto.titulo;
            descripcion.textContent = producto.descripcion;
            precio.textContent = `$${producto.precio}`;
            autor.textContent = producto.autor;
            isbn.textContent = producto.isbn;
            editorial.textContent = producto.editorial;
            fechaPublicacion.textContent = producto.fechaPublicacion;
            paginas.textContent = producto.numeroPaginas;
            genero.textContent = producto.genero;
            idioma.textContent = producto.idioma;
            stock.textContent = producto.stock;
        } else {
           // window.location.href = `./404.html`;
        }

    } else {
        //window.location.href = `./404.html`;
    }
}

inicializar();
