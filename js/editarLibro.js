import * as librosModule from "./manejadorLibros.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";
import * as UsuariosModule from "./manejadorUsuarios.js";
import * as ValidacionesModule from "./validaciones.js";

RutasProtegidassModule.protegerRuta(false, false, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

function inicializar() {
    // Obtener el string de consulta de la URL
    const queryString = window.location.search;

    // Crear un objeto URLSearchParams con el string de consulta
    const urlParams = new URLSearchParams(queryString);
    const usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
    const usuarioActual = UsuariosModule.recuperarUsuarioDeSessionStorage();
    const usuario = usuarios.find(u => u.id === usuarioActual.id);

    if (urlParams) {
        // Obtener el valor del parámetro 'id'
        const id = parseInt(urlParams.get("id"));
        // Obtener productos
        const productos = librosModule.recuperarLibrosDeLocalStorage();
        const producto = productos.find((prod) => prod.id == id);
        const containerProducto = document.querySelector("#container-producto");

        containerProducto.innerHTML = `
            <div class="d-flex flex-column gap-3 w-50 align-items-center">
                <img class="producto-img img-fluid" src="" alt="...">
                <input type="text" class="producto-img-url w-75 form-ctrl" placeholder="URL de la imagen">
            </div>
            <div class="producto-info align-items-start">
                <p class="producto-titulo mb-3"><input type="text" class="producto-titulo-input pb-2 fs-3 w-100 form-ctrl" placeholder="Título del producto"></p>
                <textarea class="producto-descripcion w-75 form-ctrl"></textarea>                
                <p class="producto-precio fs-4"><strong>$</strong> <input type="text" class="producto-precio form-ctrl"></p>
                <p class="producto-autor"><strong>Autor:</strong> <input type="text" class="form-ctrl"></p>
                <p class="producto-isbn"><strong>ISBN:</strong> <input type="text" class="form-ctrl"></p>
                <p class="producto-editorial"><strong>Editorial:</strong> <input type="text" class="form-ctrl"></p>
                <p class="producto-fecha-publicacion"><strong>Fecha de Publicación:</strong> <input type="date" class="form-ctrl"></p>
                <p class="producto-paginas"><strong>Páginas:</strong> <input type="number" class="form-ctrl"></p>
                <p class="producto-genero"><strong>Género:</strong> <input type="text" class="form-ctrl"></p>
                <p class="producto-idioma"><strong>Idioma:</strong> <input type="text" class="form-ctrl"></p>
                <p class="producto-categorias"><strong>Categorías:</strong> <input type="text" class="form-ctrl"></p>
                <p class="producto-stock"><strong>Stock:</strong> <input type="number" class="form-ctrl"></p>
                <div class="botones">
                    <button id="btn-guardar" class="btn btn-success">Guardar cambios</button>
                </div>
            </div>
        `;

        if (producto) {
            const img = containerProducto.querySelector(".producto-img");
            const tituloInput = containerProducto.querySelector(".producto-titulo-input");
            const descripcion = containerProducto.querySelector(".producto-descripcion");
            const precio = containerProducto.querySelector(".producto-precio input");
            const autor = containerProducto.querySelector(".producto-autor input");
            const isbn = containerProducto.querySelector(".producto-isbn input");
            const editorial = containerProducto.querySelector(".producto-editorial input");
            const fechaPublicacion = containerProducto.querySelector(".producto-fecha-publicacion input");
            const paginas = containerProducto.querySelector(".producto-paginas input");
            const genero = containerProducto.querySelector(".producto-genero input");
            const idioma = containerProducto.querySelector(".producto-idioma input");
            const categorias = containerProducto.querySelector(".producto-categorias input");
            const stock = containerProducto.querySelector(".producto-stock input");
            const imgURL = containerProducto.querySelector(".producto-img-url");

            img.src = producto.imagenURL;
            img.alt = producto.titulo;
            tituloInput.value = producto.titulo;
            descripcion.value = producto.descripcion;
            precio.value = producto.precio;
            autor.value = producto.autor;
            isbn.value = producto.isbn;
            editorial.value = producto.editorial;
            fechaPublicacion.value = producto.fechaPublicacion;
            paginas.value = producto.numeroPaginas;
            genero.value = producto.genero;
            idioma.value = producto.idioma;
            categorias.value = producto.categorias.join(', '); // Unir categorías con una coma
            stock.value = producto.stock;
            imgURL.value = producto.imagenURL;

            const botonGuardar = document.querySelector('#btn-guardar');

            botonGuardar.addEventListener('click', () => {


                function validarInputs() {

                    let error = true;

                    switch (true) {

                        case !ValidacionesModule.validarLibroTitulo(tituloInput.value):
                            tituloInput.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroDescripcion(descripcion.value):
                            descripcion.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroPrecio(precio.value):
                            precio.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroAutorGeneroIdiomaEditorial(autor.value):
                            autor.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroAutorGeneroIdiomaEditorial(autor.value):
                            autor.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroISBN(isbn.value):
                            isbn.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroAutorGeneroIdiomaEditorial(editorial.value):
                            editorial.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroFecha(fechaPublicacion.value):
                            fechaPublicacion.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroPaginasStock(paginas.value):
                            paginas.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroAutorGeneroIdiomaEditorial(genero.value):
                            genero.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroAutorGeneroIdiomaEditorial(idioma.value):
                            idioma.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroCategorias(categorias.value):
                            categorias.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroPaginasStock(stock.value):
                            stock.classList.add('is-invalid');
                            break;

                        case !ValidacionesModule.validarLibroImagenURL(imgURL.value):
                            imgURL.classList.add('is-invalid');
                            break;

                        default:
                            error = false;
                            break;
                    }

                    return error;
                }

                if (validarInputs()) {
                    producto.imagenURL = img.src;
                    producto.titulo = tituloInput.value;
                    producto.descripcion = descripcion.value;
                    producto.precio = parseFloat(precio.value);
                    producto.autor = autor.value;
                    producto.isbn = isbn.value;
                    producto.editorial = editorial.value;
                    producto.fechaPublicacion = fechaPublicacion.value;
                    producto.numeroPaginas = parseInt(paginas.value);
                    producto.genero = genero.value;
                    producto.idioma = idioma.value;
                    producto.categorias = categorias.value.split(',').map(categoria => categoria.trim());
                    producto.stock = parseInt(stock.value);

                    // Guardar los cambios en localStorage
                    librosModule.guardarLibrosEnLocalStorage(productos);

                    inicializar();
                }
            });

            if (!(document.querySelector('.btn-eliminar') && document.querySelector('.btn-regresar'))) {
                // Botón de regresar y eliminar
                const divBotones = document.createElement('div');
                divBotones.classList.add('d-flex', 'justify-content-evenly', 'w-75', 'mb-4');

                const regresarBtn = document.createElement('button');
                regresarBtn.textContent = 'Regresar';
                regresarBtn.classList.add('btn', 'btn-secondary', 'btn-block', 'my-2', 'btn-regresar');
                regresarBtn.addEventListener('click', () => {
                    window.history.back(); // Volver a la vista anterior
                });
                divBotones.appendChild(regresarBtn);

                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'Eliminar';
                eliminarBtn.classList.add('btn', 'btn-danger', 'btn-block', 'my-2', 'btn-eliminar');
                eliminarBtn.addEventListener('click', () => {
                    const confirmacion = confirm('¿Seguro desea eliminar permanentemente este libro?');
                    if (confirmacion) {
                        const indice = productos.findIndex(prod => prod.id === id);
                        if (indice !== -1) {
                            productos.splice(indice, 1);
                            librosModule.guardarLibrosEnLocalStorage(productos);
                        }
                        inicializar(); // Volver a la vista anterior
                    }
                });
                divBotones.appendChild(eliminarBtn);

                containerProducto.insertAdjacentElement('afterend', divBotones);
            }
        } else {
            window.location.href = `404.html`;
        }
    } else {
        window.location.href = `404.html`;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    inicializar();
});