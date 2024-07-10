import * as NavbarModule from './manejadorNavbar.js';
import * as RutasProtegidassModule from './rutasProtegidas.js';
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    try {
        const response = await fetch('https://tu-api-backend.com/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
  
        if (response.ok) {
            alert('Formulario enviado exitosamente.');
        } else {
            alert('Error al enviar el formulario.');
        }
    } catch (error) {
        alert('Error de conexión.');
    }
  });