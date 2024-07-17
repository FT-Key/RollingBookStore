import * as LibrosModule from "./manejadorLibros.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as UsuariosModule from "./manejadorUsuarios.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(false, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

function inicializar() {
    const usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
    const usuarioActual = UsuariosModule.recuperarUsuarioDeSessionStorage();
    const usuario = usuarios.find(u => u.id === usuarioActual.id);
    const libros = LibrosModule.recuperarLibrosDeLocalStorage();

    const librosCarrito = libros.filter(libro => usuario.carrito.includes(libro.id));

    const containerCarrito = document.querySelector('.container-carrito');

    let estructuraFilas = `<div class="container">`;

    for (let libro of librosCarrito) {
        estructuraFilas += `
        <div id="divCarrito" class="row row-cols-1 row-cols-lg-5 pb-3 g-4 w-100">
            <div class="col d-flex justify-content-center align-items-center">
                <img src="" class="img-fluid" alt="">
            </div>
            <div class="col titulo d-flex justify-content-center align-items-center">
                <p></p>
            </div>
            <div class="col precio d-flex justify-content-center align-items-center">
                <p></p>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <input class="input-cantidad text-center" type="number" value="1"></input>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <button class="btn btn-danger btn-eliminar">Eliminar</button>
            </div>
        </div>
        `;
    }

    estructuraFilas += `
        <div id="divCarrito" class="row row-cols-1 row-cols-lg-5 pb-3 g-4 w-100">
            <div class="col">
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <p>Total:</p>
            </div>
            <div class="col precioTotal d-flex justify-content-center align-items-center">
                <p></p>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <button class="btn btn-success btn-comprar">Comprar</button>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
            </div>
        </div>
    </div>`;
    containerCarrito.innerHTML = estructuraFilas;

    const imagenerCar = document.querySelectorAll('#divCarrito .col img');
    const titulosCar = document.querySelectorAll('#divCarrito .col.titulo p');
    const preciosCar = document.querySelectorAll('#divCarrito .col.precio p');
    const botonesEliminar = document.querySelectorAll('#divCarrito .col button.btn-eliminar');

    librosCarrito.forEach((libro, index) => {
        imagenerCar[index].src = libro.imagenURL;
        imagenerCar[index].alt = libro.titulo;
        titulosCar[index].textContent = libro.titulo;
        preciosCar[index].textContent = `$${libro.precio}`;
        botonesEliminar[index].setAttribute('data-id', libro.id);
    });

    // Añadir manejador de eventos a los botones "Eliminar"
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const libroId = event.target.getAttribute('data-id');
            eliminarDelCarrito(parseInt(libroId));
        });
    });

    // Función para eliminar libro del carrito
    function eliminarDelCarrito(libroId) {
        const index = usuario.carrito.indexOf(libroId);
        if (index !== -1) {
            usuario.carrito.splice(index, 1);
            UsuariosModule.guardarUsuarioEnSessionStorage(usuario);
            UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
            inicializar(); // Volver a inicializar para actualizar la vista
        }
    }

    actualizarTotal();
}

function actualizarTotal() {
    const usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
    const usuarioActual = UsuariosModule.recuperarUsuarioDeSessionStorage();
    const usuario = usuarios.find(u => u.id === usuarioActual.id);
    const libros = LibrosModule.recuperarLibrosDeLocalStorage();
    const librosCarrito = libros.filter(libro => usuario.carrito.includes(libro.id));

    const total = document.querySelector('.precioTotal');
    const inputsCantidad = document.querySelectorAll('.input-cantidad');

    let precioTotal = 0;

    if (librosCarrito) {
        librosCarrito.forEach((libro, index) => {
            precioTotal += libro.precio * inputsCantidad[index].value
        });
    }

    total.textContent = `$${precioTotal}`;
}

function comprar() {
    const usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
    const usuarioActual = UsuariosModule.recuperarUsuarioDeSessionStorage();
    const usuario = usuarios.find(u => u.id === usuarioActual.id);
    const libros = LibrosModule.recuperarLibrosDeLocalStorage();
    const librosCarrito = libros.filter(libro => usuario.carrito.includes(libro.id));
    const inputsCantidad = document.querySelectorAll('.input-cantidad');

    let precioTotal = 0;

    if (librosCarrito) {
        librosCarrito.forEach((libro, index) => {
            precioTotal += libro.precio * inputsCantidad[index].value
        });
    }

    alert(`Compra realizada!\nTotal: $${precioTotal}`)
}

document.addEventListener('DOMContentLoaded', function () {
    inicializar();
    actualizarTotal();

    const inputsCantidad = document.querySelectorAll('.input-cantidad');
    inputsCantidad.forEach(input => {
        input.addEventListener('change', (event) => {
            if (event.target.value > 0) {
                actualizarTotal()
            } else {
                event.target.value = 1;
            }
        });
    });

    const btnComprar = document.querySelector('.btn-comprar');
    btnComprar.addEventListener('click', comprar);
});
