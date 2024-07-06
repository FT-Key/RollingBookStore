import * as LibrosModule from './manejadorLibros.js';
import * as RutasProtegidassModule from './rutasProtegidas.js';
import * as NavbarModule from './manejadorNavbar.js';

RutasProtegidassModule.protegerRuta(false, true, true);
NavbarModule.inicializarNavbar();

// Genera las cards de los libros
export function generarCards() {
    const containerCards = document.querySelector('#container-productos');
    const libros = LibrosModule.recuperarLibrosDeLocalStorage();

    let estructuraCards = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-4 w-100">`;

    for (let i = 0; i < libros.length; i++) {
        estructuraCards += `
        <div class="col">
            <div class="card">
                <img class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title"></h5>
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
    const imagenes = containerCards.querySelectorAll('.card-img-top');
    const titulos = containerCards.querySelectorAll('.card-title');
    const textos = containerCards.querySelectorAll('.card-text');
    const precios = containerCards.querySelectorAll('.card-price');
    const enlaces = containerCards.querySelectorAll('.btn-primary');

    // Iterar sobre los libros y asignarles los valores correspondientes
    libros.forEach((libro, index) => {
        imagenes[index].src = libro.imagenURL;
        imagenes[index].alt = libro.titulo;
        titulos[index].textContent = libro.titulo;
        textos[index].textContent = libro.descripcion;
        precios[index].textContent = `$${libro.precio.toFixed(2)}`;
        enlaces[index].setAttribute('data-id', libro.id);
    });
}

// Establece un evento para los botones de las cards, el cual redirige a la pagina de detalle del libro
document.addEventListener('DOMContentLoaded', () => {

    // Función para añadir event listeners a los botones
    const agregarEventoABotonesVerDetalle = () => {
        const botonesDetalle = document.querySelectorAll('.btn-primary');
        botonesDetalle.forEach(boton => {
            boton.addEventListener('click', (event) => {
                event.preventDefault(); // Evitar que el enlace navegue automáticamente
                const idLibro = boton.getAttribute('data-id');
                // Redirigir a detalleLibro.html con el ID del libro
                window.location.href = `./detalleLibro.html?id=${idLibro}`;
            });
        });
    }; agregarEventoABotonesVerDetalle();

});

function generarDestacados() {
    let librosdestacados = localStorage.getItem('librosdestacados');
    if (!librosdestacados) return;

    librosdestacados = JSON.parse(librosdestacados);

    const destacados = document.querySelector('#container-destacados');

    let estructura = `
    <div class="destacados my-4">
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

    destacados.innerHTML = estructura;

    const items = destacados.querySelectorAll('.item');
    const abbrs = destacados.querySelectorAll('.item abbr');
    const imgs = destacados.querySelectorAll('.item img');

    librosdestacados.forEach((libro, i) => {
        items[i].href = `./detalleLibro.html?id=${libro.id}`;
        abbrs[i].title = libro.titulo;
        imgs[i].src = libro.imagenURL;
    });
}

// TESTEO

// Crea un array de objetos a modo de prueba y los sube al localStorage
export function agregarLibrosLocalStorage() {
    const imagenPorDefecto = 'https://via.placeholder.com/400x500';

    const librosEjemplo = [
        new LibrosModule.Libro(1, 'Cien Años de Soledad', 'Gabriel García Márquez', '978-3-16-148410-0', 'Sudamericana', '1967-05-30', 471, 'Realismo mágico', 'Español', 'Una novela épica que cuenta la historia de la familia Buendía en el pueblo ficticio de Macondo.', 20.00, 'Novela', 100, 'https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg'),
        new LibrosModule.Libro(2, '1984', 'George Orwell', '978-0-452-28423-4', 'Secker & Warburg', '1949-06-08', 328, 'Distopía', 'Inglés', 'Una novela sobre un régimen totalitario que usa la vigilancia y el control mental para mantener el poder.', 15.00, 'Novela', 150, 'https://acdn.mitiendanube.com/stores/001/029/689/products/19841-039a8c5f61dee95ec316324958058653-1024-1024.png'),
        new LibrosModule.Libro(3, 'El Gran Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 'Charles Scribner\'s Sons', '1925-04-10', 180, 'Tragedia', 'Inglés', 'La historia de la misteriosa vida y la trágica caída de Jay Gatsby en los años 20.', 10.00, 'Novela', 200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4vwkvHsfzm2qnterTvyd1ZKKo_4jCzvTbA&s'),
        new LibrosModule.Libro(4, 'Matar a un ruiseñor', 'Harper Lee', '978-0-06-112008-4', 'J.B. Lippincott & Co.', '1960-07-11', 281, 'Drama', 'Inglés', 'Una historia conmovedora sobre la injusticia racial en el sur de los Estados Unidos.', 12.00, 'Novela', 300, 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/690144.jpg'),
        new LibrosModule.Libro(5, 'Orgullo y prejuicio', 'Jane Austen', '978-0-19-953556-9', 'T. Egerton', '1813-01-28', 279, 'Romance', 'Inglés', 'Una crítica social y una historia de amor en la Inglaterra del siglo XIX.', 14.00, 'Novela', 250, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjykXuoU-pVtZYP4C91G9YNTdOKIf6_KapOg&s'),
        new LibrosModule.Libro(6, 'Don Quijote de la Mancha', 'Miguel de Cervantes', '978-0-14-243723-0', 'Francisco de Robles', '1605-01-16', 863, 'Aventura', 'Español', 'Las aventuras de un hidalgo que pierde la cordura y se cree un caballero andante.', 25.00, 'Novela', 400, 'https://www.edicontinente.com.ar/image/titulos/9788419087003.jpg'),
        new LibrosModule.Libro(7, 'En busca del tiempo perdido', 'Marcel Proust', '978-0-307-47444-8', 'Grasset', '1913-11-14', 4215, 'Modernismo', 'Francés', 'Una exploración profunda de la memoria y el tiempo en una serie de siete volúmenes.', 30.00, 'Novela', 100, imagenPorDefecto),
        new LibrosModule.Libro(8, 'La Odisea', 'Homero', '978-0-14-026886-7', 'Penguin Classics', '800 a.C.', 560, 'Épico', 'Griego', 'El poema épico que narra las aventuras de Odiseo en su regreso a casa.', 18.00, 'Poesía', 150, imagenPorDefecto),
        new LibrosModule.Libro(9, 'Ulises', 'James Joyce', '978-0-679-72232-3', 'Sylvia Beach', '1922-02-02', 730, 'Modernismo', 'Inglés', 'Un día en la vida de Leopold Bloom en Dublín, una obra compleja y revolucionaria.', 22.00, 'Novela', 120, imagenPorDefecto),
        new LibrosModule.Libro(10, 'Crimen y castigo', 'Fiódor Dostoyevski', '978-0-14-305814-4', 'The Russian Messenger', '1866-01-01', 671, 'Filosofía', 'Ruso', 'La historia de un joven estudiante que comete un asesinato y lucha con la culpa.', 16.00, 'Novela', 130, imagenPorDefecto),
        new LibrosModule.Libro(11, 'La Divina Comedia', 'Dante Alighieri', '978-0-19-953564-4', 'John Ciardi', '1320-01-01', 798, 'Épico', 'Italiano', 'Un viaje alegórico a través del Infierno, el Purgatorio y el Paraíso.', 20.00, 'Poesía', 110, imagenPorDefecto),
        new LibrosModule.Libro(12, 'El Retrato de Dorian Gray', 'Oscar Wilde', '978-0-19-953598-9', 'Ward, Lock & Co.', '1890-06-20', 254, 'Gótico', 'Inglés', 'Un joven hace un pacto para mantener su juventud mientras su retrato envejece en su lugar.', 10.00, 'Novela', 210, imagenPorDefecto),
        new LibrosModule.Libro(13, 'El Principito', 'Antoine de Saint-Exupéry', '978-0-15-601219-5', 'Reynal & Hitchcock', '1943-04-06', 96, 'Fantasía', 'Francés', 'Un piloto perdido en el desierto conoce a un joven príncipe de otro planeta.', 8.00, 'Novela', 300, imagenPorDefecto),
        new LibrosModule.Libro(14, 'Fahrenheit 451', 'Ray Bradbury', '978-0-7432-4722-1', 'Ballantine Books', '1953-10-19', 158, 'Distopía', 'Inglés', 'Un futuro donde los libros están prohibidos y los bomberos queman cualquiera que encuentren.', 12.00, 'Novela', 220, imagenPorDefecto),
        new LibrosModule.Libro(15, 'Cumbres Borrascosas', 'Emily Brontë', '978-0-14-243727-9', 'Thomas Cautley Newby', '1847-12-17', 348, 'Gótico', 'Inglés', 'Una trágica historia de amor y venganza en las frías colinas de Yorkshire.', 15.00, 'Novela', 180, imagenPorDefecto)
    ];

    LibrosModule.guardarLibrosEnLocalStorage(librosEjemplo);
}

export function agregarDestacadosLocalStorage() {
    const imagenPorDefecto = 'https://via.placeholder.com/400x500';

    const librosEjemplo = [
        new LibrosModule.Libro(1, 'Cien Años de Soledad', 'Gabriel García Márquez', '978-3-16-148410-0', 'Sudamericana', '1967-05-30', 471, 'Realismo mágico', 'Español', 'Una novela épica que cuenta la historia de la familia Buendía en el pueblo ficticio de Macondo.', 20.00, 'Novela', 100, 'https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg'),
        new LibrosModule.Libro(2, '1984', 'George Orwell', '978-0-452-28423-4', 'Secker & Warburg', '1949-06-08', 328, 'Distopía', 'Inglés', 'Una novela sobre un régimen totalitario que usa la vigilancia y el control mental para mantener el poder.', 15.00, 'Novela', 150, 'https://acdn.mitiendanube.com/stores/001/029/689/products/19841-039a8c5f61dee95ec316324958058653-1024-1024.png'),
        new LibrosModule.Libro(3, 'El Gran Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 'Charles Scribner\'s Sons', '1925-04-10', 180, 'Tragedia', 'Inglés', 'La historia de la misteriosa vida y la trágica caída de Jay Gatsby en los años 20.', 10.00, 'Novela', 200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4vwkvHsfzm2qnterTvyd1ZKKo_4jCzvTbA&s')
    ];

    LibrosModule.guardarDestacadossEnLocalStorage(librosEjemplo);
}

generarDestacados();
generarCards();
// Las agrego al ámbito global para que puedan ser llamadas por consola
window.agregarLibrosLocalStorage = agregarLibrosLocalStorage;
window.agregarDestacadosLocalStorage = agregarDestacadosLocalStorage;

