import * as NavbarModule from './manejadorNavbar.js';
import * as RutasProtegidassModule from './rutasProtegidas.js';
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validar longitud de los campos
    if (name.length > 20) {
        alert('El nombre no debe exceder los 20 caracteres.');
        return;
    }

    if (email.length > 40 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('El correo electrónico no debe exceder los 40 caracteres y debe ser válido.');
        return;
    }

    if (message.length > 250) {
        alert('El mensaje no debe exceder los 250 caracteres.');
        return;
    }

    // Muestra una alerta con los datos del formulario
    alert(`Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`);
});
