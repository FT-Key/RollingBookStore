import * as UsuariosModule from './manejadorUsuarios.js';

export function protegerRuta(deslogueado, miembro, admin) {
    comprobarUsuarioRecordado();

    let main = document.querySelector('main');
    main.style.display = 'none';
    const usuario = UsuariosModule.recuperarUsuarioDeSessionStorage();

    switch (true) {

        case deslogueado:
            main.style.display = 'block';
            break;

        case miembro && !admin:
            if (usuario && (usuario.role === 'miembro' || usuario.role === 'miembroTest')) {
                main.style.display = 'block';
                return true;
            } else {
                location.href = '../pages/registro.html';
            }
            break;

        case !miembro && admin:
            if (usuario && (usuario.role === 'admin')) {
                main.style.display = 'block';
                return true;
            } else {
                location.href = '../pages/registro.html';
            }
            break;

        case miembro && admin:
            if (usuario && (usuario.role === 'admin' || usuario.role === 'miembro' || usuario.role === 'miembroTest')) {
                main.style.display = 'block';
                return true;
            } else {
                location.href = '../pages/registro.html';
            }
            break;

        default:
            location.href('../index.html');
            break;
    }
}

export function comprobarUsuarioRecordado() {

    if (!UsuariosModule.recuperarUsuarioDeSessionStorage()) {
        const idUsuarioRecordado = UsuariosModule.recuperarUsuarioRecordadoLocalStorage();
        console.log(idUsuarioRecordado)

        if (idUsuarioRecordado) {
            const usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
            const usuario = usuarios.find(u => u.id === idUsuarioRecordado)
            console.log(usuario)

            UsuariosModule.guardarUsuarioEnSessionStorage(usuario);
            location.reload();
        }
    }
}

window.recuperarUsuarioRecordadoLocalStorage = UsuariosModule.recuperarUsuarioRecordadoLocalStorage;

export * from '../js/rutasProtegidas.js';