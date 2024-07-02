export class Usuario {
    #id;
    #nombre;
    #email;
    #contrasenia;
    #role;
    #terms;
    #login;
    #recordar;
    #favoritos;
    #carrito;

    constructor(id, nombre, email, contrasenia, role, terms, login = false, recordar = false, favoritos = [], carrito = []) {
        this.#id = id;
        this.#nombre = nombre;
        this.#email = email;
        this.#contrasenia = contrasenia;
        this.#role = role;
        this.#terms = terms;
        this.#login = login;
        this.#recordar = recordar;
        this.#favoritos = favoritos;
        this.#carrito = carrito;
    }

    // Getters

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get email() {
        return this.#email;
    }

    get contrasenia() {
        return this.#contrasenia;
    }

    get role() {
        return this.#role;
    }

    get terms() {
        return this.#terms;
    }

    get login() {
        return this.#login;
    }

    get recordar() {
        return this.#recordar;
    }

    get favoritos() {
        return this.#favoritos;
    }

    get carrito() {
        return this.#carrito;
    }

    // Setters

    set id(id) {
        this.#id = id;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    set email(email) {
        this.#email = email;
    }

    set contrasenia(contrasenia) {
        this.#contrasenia = contrasenia;
    }

    set role(role) {
        this.#role = role;
    }

    set terms(terms) {
        this.#terms = terms;
    }

    set login(login) {
        this.#login = login;
    }

    set recordar(recordar) {
        this.#recordar = recordar;
    }

    set favoritos(favoritos) {
        this.#favoritos = favoritos;
    }

    set carrito(carrito) {
        this.#carrito = carrito;
    }

    // Métodos para serialización y deserialización
    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            email: this.#email,
            contrasenia: this.#contrasenia,
            role: this.#role,
            terms: this.#terms,
            login: this.#login,
            recordar: this.#recordar,
            favoritos: this.#favoritos,
            carrito: this.#carrito
        };
    }

    static fromJSON(json) {
        return new Usuario(
            json.id,
            json.nombre,
            json.email,
            json.contrasenia,
            json.role,
            json.terms,
            json.login,
            json.recordar,
            json.favoritos,
            json.carrito
        );
    }
}

// Función para guardar el array de usuarios en el localStorage
export function guardarUsuariosEnLocalStorage(usuarios) {
    const usuariosJSON = usuarios.map(usuario => usuario.toJSON());
    localStorage.setItem('usuarios', JSON.stringify(usuariosJSON));
}

// Función para recuperar el array de usuarios del localStorage
export function recuperarUsuariosDeLocalStorage() {
    const usuariosJSON = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosJSON.map(json => Usuario.fromJSON(json));
}

function encryptPassword(password, key) {
    return CryptoJS.AES.encrypt(password, key).toString();
}

function decryptPassword(encryptedPassword, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Función para guardar un usuario en el sessionStorage
export function guardarUsuarioEnSessionStorage(usuario) {
    const usuarioJSON = usuario.toJSON();
    usuarioJSON.contrasenia = encryptPassword(usuarioJSON.contrasenia, 'key123');
    sessionStorage.setItem('usuario', JSON.stringify(usuarioJSON));
}

// Función para recuperar un usuario del sessionStorage
export function recuperarUsuarioDeSessionStorage() {
    const usuarioJSON = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuarioJSON) {
        usuarioJSON.contrasenia = decryptPassword(usuarioJSON.contrasenia, 'key123');
        return Usuario.fromJSON(usuarioJSON);
    }
    return null;
}

// Función para eliminar un usuario del sessionStorage
export function eliminarUsuarioDeSessionStorage() {
    sessionStorage.removeItem('usuario');
}

export * from '../js/manejadorUsuarios.js';