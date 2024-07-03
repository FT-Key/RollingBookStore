export class Libro {
    #id;
    #titulo;
    #autor;
    #isbn;
    #editorial;
    #fechaPublicacion;
    #numeroPaginas;
    #genero;
    #idioma;
    #descripcion;
    #precio;
    #categoria;
    #stock;
    #imagenURL;
    #bloqueado;

    constructor(id, titulo, autor, isbn, editorial, fechaPublicacion, numeroPaginas, genero, idioma, descripcion, precio, categoria, stock, imagenURL, bloqueado = false) {
        this.#id = id;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#isbn = isbn;
        this.#editorial = editorial;
        this.#fechaPublicacion = fechaPublicacion;
        this.#numeroPaginas = numeroPaginas;
        this.#genero = genero;
        this.#idioma = idioma;
        this.#descripcion = descripcion;
        this.#precio = precio;
        this.#categoria = categoria;
        this.#stock = stock;
        this.#imagenURL = imagenURL;
        this.#bloqueado = bloqueado;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get titulo() {
        return this.#titulo;
    }

    get autor() {
        return this.#autor;
    }

    get isbn() {
        return this.#isbn;
    }

    get editorial() {
        return this.#editorial;
    }

    get fechaPublicacion() {
        return this.#fechaPublicacion;
    }

    get numeroPaginas() {
        return this.#numeroPaginas;
    }

    get genero() {
        return this.#genero;
    }

    get idioma() {
        return this.#idioma;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get precio() {
        return this.#precio;
    }

    get categoria() {
        return this.#categoria;
    }

    get stock() {
        return this.#stock;
    }

    get imagenURL() {
        return this.#imagenURL;
    }

    get bloqueado() {
        return this.#bloqueado;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set titulo(value) {
        this.#titulo = value;
    }

    set autor(value) {
        this.#autor = value;
    }

    set isbn(value) {
        this.#isbn = value;
    }

    set editorial(value) {
        this.#editorial = value;
    }

    set fechaPublicacion(value) {
        this.#fechaPublicacion = value;
    }

    set numeroPaginas(value) {
        this.#numeroPaginas = value;
    }

    set genero(value) {
        this.#genero = value;
    }

    set idioma(value) {
        this.#idioma = value;
    }

    set descripcion(value) {
        this.#descripcion = value;
    }

    set precio(value) {
        this.#precio = value;
    }

    set categoria(value) {
        this.#categoria = value;
    }

    set stock(value) {
        this.#stock = value;
    }

    set imagenURL(value) {
        this.#imagenURL = value;
    }

    set bloqueado(value) {
        this.#bloqueado = value;
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            autor: this.#autor,
            isbn: this.#isbn,
            editorial: this.#editorial,
            fechaPublicacion: this.#fechaPublicacion,
            numeroPaginas: this.#numeroPaginas,
            genero: this.#genero,
            idioma: this.#idioma,
            descripcion: this.#descripcion,
            precio: this.#precio,
            categoria: this.#categoria,
            stock: this.#stock,
            imagenURL: this.#imagenURL,
            bloqueado: this.#bloqueado
        };
    }

    static fromJSON(json) {
        return new Libro(
            json.id,
            json.titulo,
            json.autor,
            json.isbn,
            json.editorial,
            json.fechaPublicacion,
            json.numeroPaginas,
            json.genero,
            json.idioma,
            json.descripcion,
            json.precio,
            json.categoria,
            json.stock,
            json.imagenURL,
            json.bloqueado || false
        );
    }
}

// Función para guardar el array de libros en el localStorage
export function guardarLibrosEnLocalStorage(libros) {
    const librosJSON = libros.map(libro => libro.toJSON());
    localStorage.setItem('libros', JSON.stringify(librosJSON));
}

// Función para recuperar el array de libros del localStorage
export function recuperarLibrosDeLocalStorage() {
    const librosJSON = JSON.parse(localStorage.getItem('libros')) || [];
    return librosJSON.map(json => Libro.fromJSON(json));
}

// Función para guardar el array de destacados en el localStorage
export function guardarDestacadossEnLocalStorage(libros) {
    const librosJSON = libros.map(libro => libro.toJSON());
    localStorage.setItem('librosdestacados', JSON.stringify(librosJSON));
}

// Función para recuperar el array de destacados del localStorage
export function recuperarDestacadosDeLocalStorage() {
    const librosJSON = JSON.parse(localStorage.getItem('librosdestacados')) || [];
    return librosJSON.map(json => Libro.fromJSON(json));
}

// Función para guardar un libro en el sessionStorage
export function guardarLibroEnSessionStorage(libro) {
    const libroJSON = libro.toJSON();
    sessionStorage.setItem('libro', JSON.stringify(libroJSON));
}

// Función para recuperar un libro del sessionStorage
export function recuperarLibroDeSessionStorage() {
    const libroJSON = JSON.parse(sessionStorage.getItem('libro'));
    return libroJSON ? Libro.fromJSON(libroJSON) : null;
}

// Función para eliminar un libro del sessionStorage
export function eliminarLibroDeSessionStorage() {
    sessionStorage.removeItem('libro');
}

// ABM

export function altaLibro(libro) {
    let libros = recuperarLibrosDeLocalStorage();
    libros.push(libro);
    guardarLibrosEnLocalStorage(libros);
}

export function bajaLogicaLibro(idLibro) {
    let libros = recuperarLibrosDeLocalStorage();
    let libroEncontrado = libros.find(libro => libro.id === idLibro);

    if (libroEncontrado) {
        libroEncontrado.bloqueado = true;
        guardarLibrosEnLocalStorage(libros);
        console.log(`Libro con ID ${idLibro} bloqueado exitosamente.`);
    } else {
        console.log(`No se encontró ningún libro con el ID ${idLibro}.`);
    }
}

export function bajaFisicaLibro(idLibro) {
    let libros = recuperarLibrosDeLocalStorage();
    let indiceLibro = libros.findIndex(libro => libro.id === idLibro);

    if (indiceLibro !== -1) {
        // El libro fue encontrado, procedemos a eliminarlo con splice
        libros.splice(indiceLibro, 1); // Elimina 1 elemento en el índice encontrado
        guardarLibrosEnLocalStorage(libros);
        console.log(`Libro con ID ${idLibro} eliminado físicamente.`);
    } else {
        console.log(`No se encontró ningún libro con el ID ${idLibro}.`);
    }
}

export function modificacionLibro(libroModificado) {
    let libros = recuperarLibrosDeLocalStorage();
    let indiceLibro = libros.findIndex(libro => libro.id === libroModificado.id);

    if (indiceLibro !== -1) {
        libros[indiceLibro] = libroModificado;
        guardarLibrosEnLocalStorage(libros);
        console.log(`Libro con ID ${libroModificado.id} modificado exitosamente.`);
    } else {
        console.log(`No se encontró ningún libro con el ID ${libroModificado.id}.`);
    }
}

export * from './manejadorLibros.js';