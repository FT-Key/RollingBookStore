import * as UsuariosModule from './manejadorUsuarios.js';

export function protegerRuta(deslogueado, miembro, admin) {
    let main = document.querySelector('main');
    main.style.display = 'none';
    const usuario = UsuariosModule.recuperarUsuarioDeSessionStorage();

    switch (true) {

        case deslogueado:
            main.style.display = 'block';
            break;

        case miembro && !admin:
            if (usuario && usuario.role === 'miembro') {
                main.style.display = 'block';
                return true;
            } else {
                location.href = '../pages/inicio-sesion.html';
            }
            break;

        case !miembro && admin:
            if (usuario && usuario.role === 'admin') {
                main.style.display = 'block';
                return true;
            } else {
                location.href = '../pages/inicio-sesion.html';
            }
            break;

        case miembro || admin:
            if (usuario && (usuario.role === 'admin' || usuario.role === 'miembro')) {
                main.style.display = 'block';
                return true;
            } else {
                location.href = '../pages/inicio-sesion.html';
            }
            break;

        default:
            location.href('../index.html');
            break;
    }
}

export * from '../js/rutasProtegidas.js';