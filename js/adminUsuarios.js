import * as UsuariosModule from "./manejadorUsuarios.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";
import { validarNombreUsuario, validarContraseniaUsuario, validarCorreoElectronico } from './validaciones.js';

RutasProtegidassModule.protegerRuta(false, false, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

function inicializar(palabraClave = '') {
  const containerUsuarios = document.querySelector('#admin-usuarios');
  const usuariosSinFiltro = UsuariosModule.recuperarUsuariosDeLocalStorage();
  const usuarioSession = UsuariosModule.recuperarUsuarioDeSessionStorage();
  let usuarios;

  if (palabraClave) {
    const palabraClaveMinuscula = palabraClave.toLowerCase();

    usuarios = usuariosSinFiltro.filter(usuario => {
      const [nombreUsuarioMail, dominio] = usuario.email.toLowerCase().split('@');

      return usuario.nombre.toLowerCase().includes(palabraClaveMinuscula) ||
        usuario.id.toLowerCase().includes(palabraClaveMinuscula) ||
        nombreUsuarioMail.includes(palabraClaveMinuscula) ||
        dominio.includes(palabraClaveMinuscula);
    });
  } else {
    usuarios = usuariosSinFiltro;
  }

  // Limpiar el contenedor antes de añadir nuevas filas
  containerUsuarios.innerHTML = '';

  // Agregar la cabecera
  const cabecera = document.createElement('div');
  cabecera.classList.add('fila-usuario', 'fila-usuario-header');
  cabecera.innerHTML = `
        <div class="usuario-id">ID</div>
        <div class="usuario-nombre">Nombre</div>
        <div class="usuario-email">Email</div>
        <div class="usuario-contrasenia">Contraseña</div>
        <div class="usuario-role">Rol</div>
        <div class="usuario-bloqueado">Bloqueado</div>
        <div class="usuario-acciones">Acciones</div>
    `;
  containerUsuarios.appendChild(cabecera);

  // Crear y agregar filas al contenedor
  usuarios.forEach(usuario => {
    const fila = document.createElement('div');
    fila.classList.add('fila-usuario'); // Puedes agregar clases CSS para estilizar las filas

    fila.innerHTML = `
            <div class="usuario-id"></div>
            <div class="usuario-nombre"></div>
            <div class="usuario-email"></div>
            <div class="usuario-contrasenia"></div>
            <div class="usuario-role"></div>
            <div class="usuario-bloqueado"></div>
            <div class="usuario-acciones">
                <button class="btn btn-primary btn-sm boton-editar ${usuario.id == usuarioSession.id ? 'd-none' : ''}" type="button" data-id="">Editar</button>
            </div>
        `;

    // Asignar el contenido de texto a los elementos para evitar inyección de código malicioso
    fila.querySelector('.usuario-id').textContent = usuario.id;
    fila.querySelector('.usuario-nombre').textContent = usuario.nombre;
    fila.querySelector('.usuario-email').textContent = usuario.email;
    fila.querySelector('.usuario-contrasenia').textContent = usuario.contrasenia;
    fila.querySelector('.usuario-role').textContent = usuario.role;
    fila.querySelector('.usuario-bloqueado').textContent = usuario.bloqueado;
    fila.querySelector('.boton-editar').setAttribute('data-id', usuario.id);

    containerUsuarios.appendChild(fila);
  });

  // Agregar eventos a los botones de edición
  const botonesEdit = containerUsuarios.querySelectorAll('.boton-editar');
  botonesEdit.forEach(boton => {
    boton.addEventListener('click', () => {
      editarUsuario(boton.getAttribute('data-id'));
    });
  });


}

function editarUsuario(idString) {
  const id = Number.parseInt(idString);

  // Buscar el usuario a editar en la lista
  const usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
  const usuario = usuarios.find(u => u.id === id);



  // Crear un formulario para editar el usuario
  const form = document.createElement('div');
  form.classList.add('editar-usuario-form');

  const formTitle = document.createElement('h2');
  formTitle.textContent = `Id usuario: ${usuario.id}`;
  formTitle.classList.add('text-center', 'mb-3');
  form.appendChild(formTitle);

  // Nombre
  function rowNombre() {
    const nombreRow = document.createElement('div');
    nombreRow.classList.add('form-row', 'row', 'gy-2'); // Agregar clases para fila y columnas de Bootstrap
    form.appendChild(nombreRow);

    const nombreLabelCol = document.createElement('div');
    nombreLabelCol.classList.add('col', 'col-12', 'col-md-2');
    nombreRow.appendChild(nombreLabelCol);

    const nombreLabel = document.createElement('label');
    nombreLabel.textContent = 'Nombre:';
    nombreLabelCol.appendChild(nombreLabel);

    const nombreValorCol = document.createElement('div');
    nombreValorCol.classList.add('col', 'col-12', 'col-md-3');
    nombreRow.appendChild(nombreValorCol);

    const nombreValor = document.createElement('div');
    nombreValor.textContent = usuario.nombre;
    nombreValorCol.appendChild(nombreValor);

    const nombreInputCol = document.createElement('div');
    nombreInputCol.classList.add('col', 'col-12', 'col-md-5');
    nombreRow.appendChild(nombreInputCol);

    const nombreInput = document.createElement('input');
    nombreInput.type = 'text';
    nombreInput.placeholder = 'Nuevo nombre';
    nombreInput.classList.add('form-control');
    nombreInputCol.appendChild(nombreInput);

    const nombreGuardarBtnCol = document.createElement('div');
    nombreGuardarBtnCol.classList.add('col', 'col-12', 'col-md-2', 'd-flex', 'justify-content-center');
    nombreRow.appendChild(nombreGuardarBtnCol);

    const nombreGuardarBtn = document.createElement('button');
    nombreGuardarBtn.textContent = 'Guardar';
    nombreGuardarBtn.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
    nombreGuardarBtn.addEventListener('click', () => {
      if (validarNombreUsuario(nombreInput.value)) {
        usuario.nombre = nombreInput.value;
        UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
        editarUsuario(idString); // Actualizar la vista
      }
    });
    nombreGuardarBtnCol.appendChild(nombreGuardarBtn);
  }

  rowNombre();

  // Email
  function rowEmail() {
    const emailRow = document.createElement('div');
    emailRow.classList.add('form-row', 'row', 'gy-2'); // Agregar clases para fila y columnas de Bootstrap
    form.appendChild(emailRow);

    const emailLabelCol = document.createElement('div');
    emailLabelCol.classList.add('col', 'col-12', 'col-md-2');
    emailRow.appendChild(emailLabelCol);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    emailLabelCol.appendChild(emailLabel);

    const emailValorCol = document.createElement('div');
    emailValorCol.classList.add('col', 'col-12', 'col-md-3');
    emailRow.appendChild(emailValorCol);

    const emailValor = document.createElement('div');
    emailValor.textContent = usuario.email;
    emailValorCol.appendChild(emailValor);

    const emailInputCol = document.createElement('div');
    emailInputCol.classList.add('col', 'col-12', 'col-md-5');
    emailRow.appendChild(emailInputCol);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Nuevo email';
    emailInput.classList.add('form-control');
    emailInputCol.appendChild(emailInput);

    const emailGuardarBtnCol = document.createElement('div');
    emailGuardarBtnCol.classList.add('col', 'col-12', 'col-md-2', 'd-flex', 'justify-content-center');
    emailRow.appendChild(emailGuardarBtnCol);

    const emailGuardarBtn = document.createElement('button');
    emailGuardarBtn.textContent = 'Guardar';
    emailGuardarBtn.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
    emailGuardarBtn.addEventListener('click', () => {
      if (validarCorreoElectronico(emailInput.value)) {
        usuario.email = emailInput.value;
        UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
        editarUsuario(idString); // Actualizar la vista
      }
    });
    emailGuardarBtnCol.appendChild(emailGuardarBtn);
  }

  rowEmail();

  // Contraseña
  function rowContrasenia() {
    const contraseniaRow = document.createElement('div');
    contraseniaRow.classList.add('form-row', 'row', 'gy-2'); // Agregar clases para fila y columnas de Bootstrap
    form.appendChild(contraseniaRow);

    const contraseniaLabelCol = document.createElement('div');
    contraseniaLabelCol.classList.add('col', 'col-12', 'col-md-2');
    contraseniaRow.appendChild(contraseniaLabelCol);

    const contraseniaLabel = document.createElement('label');
    contraseniaLabel.textContent = 'Contraseña:';
    contraseniaLabelCol.appendChild(contraseniaLabel);

    const contraseniaValorCol = document.createElement('div');
    contraseniaValorCol.classList.add('col', 'col-12', 'col-md-3');
    contraseniaRow.appendChild(contraseniaValorCol);

    const contraseniaValor = document.createElement('div');
    contraseniaValor.textContent = usuario.contrasenia;
    contraseniaValorCol.appendChild(contraseniaValor);

    const contraseniaInputCol = document.createElement('div');
    contraseniaInputCol.classList.add('col', 'col-12', 'col-md-5');
    contraseniaRow.appendChild(contraseniaInputCol);

    const contraseniaInput = document.createElement('input');
    contraseniaInput.type = 'password';
    contraseniaInput.placeholder = 'Nueva contraseña';
    contraseniaInput.classList.add('form-control');
    contraseniaInputCol.appendChild(contraseniaInput);

    const contraseniaGuardarBtnCol = document.createElement('div');
    contraseniaGuardarBtnCol.classList.add('col', 'col-12', 'col-md-2', 'd-flex', 'justify-content-center');
    contraseniaRow.appendChild(contraseniaGuardarBtnCol);

    const contraseniaGuardarBtn = document.createElement('button');
    contraseniaGuardarBtn.textContent = 'Guardar';
    contraseniaGuardarBtn.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
    contraseniaGuardarBtn.addEventListener('click', () => {
      if (validarContraseniaUsuario(contraseniaInput.value)) {
        usuario.contrasenia = contraseniaInput.value;
        UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
        editarUsuario(idString); // Actualizar la vista
      }
    });
    contraseniaGuardarBtnCol.appendChild(contraseniaGuardarBtn);
  }

  rowContrasenia();

  // Rol
  function rowRol() {
    const rolRow = document.createElement('div');
    rolRow.classList.add('form-row', 'row', 'gy-2'); // Agregar clases para fila y columnas de Bootstrap
    form.appendChild(rolRow);

    const rolLabelCol = document.createElement('div');
    rolLabelCol.classList.add('col', 'col-12', 'col-md-2');
    rolRow.appendChild(rolLabelCol);

    const rolLabel = document.createElement('label');
    rolLabel.textContent = 'Rol:';
    rolLabelCol.appendChild(rolLabel);

    const rolValorCol = document.createElement('div');
    rolValorCol.classList.add('col', 'col-12', 'col-md-3');
    rolRow.appendChild(rolValorCol);

    const rolValor = document.createElement('div');
    rolValor.textContent = usuario.role;
    rolValorCol.appendChild(rolValor);

    const rolSelectCol = document.createElement('div');
    rolSelectCol.classList.add('col', 'col-12', 'col-md-5');
    rolRow.appendChild(rolSelectCol);

    const rolSelect = document.createElement('select');
    rolSelect.classList.add('form-control');
    const opcionesRol = ['miembro', 'admin'];
    opcionesRol.forEach(opcion => {
      const option = document.createElement('option');
      option.value = opcion;
      option.textContent = opcion;
      if (usuario.role === opcion) {
        option.selected = true;
      }
      rolSelect.appendChild(option);
    });
    rolSelectCol.appendChild(rolSelect);

    const rolGuardarBtnCol = document.createElement('div');
    rolGuardarBtnCol.classList.add('col', 'col-12', 'col-md-2', 'd-flex', 'justify-content-center');
    rolRow.appendChild(rolGuardarBtnCol);

    const rolGuardarBtn = document.createElement('button');
    rolGuardarBtn.textContent = 'Guardar';
    rolGuardarBtn.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
    rolGuardarBtn.addEventListener('click', () => {
      usuario.role = rolSelect.value;
      UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
      editarUsuario(idString); // Actualizar la vista
    });
    rolGuardarBtnCol.appendChild(rolGuardarBtn);
  }

  rowRol();

  // Bloqueado
  function rowBloqueado() {
    const bloqueadoRow = document.createElement('div');
    bloqueadoRow.classList.add('form-row', 'row', 'gy-2'); // Agregar clases para fila y columnas de Bootstrap
    form.appendChild(bloqueadoRow);

    const bloqueadoLabelCol = document.createElement('div');
    bloqueadoLabelCol.classList.add('col', 'col-12', 'col-md-2');
    bloqueadoRow.appendChild(bloqueadoLabelCol);

    const bloqueadoLabel = document.createElement('label');
    bloqueadoLabel.textContent = 'Bloqueado:';
    bloqueadoLabelCol.appendChild(bloqueadoLabel);

    const bloqueadoValorCol = document.createElement('div');
    bloqueadoValorCol.classList.add('col', 'col-12', 'col-md-3');
    bloqueadoRow.appendChild(bloqueadoValorCol);

    const bloqueadoValor = document.createElement('div');
    bloqueadoValor.textContent = usuario.bloqueado.toString();
    bloqueadoValorCol.appendChild(bloqueadoValor);

    const bloqueadoSelectCol = document.createElement('div');
    bloqueadoSelectCol.classList.add('col', 'col-12', 'col-md-5');
    bloqueadoRow.appendChild(bloqueadoSelectCol);

    const bloqueadoSelect = document.createElement('select');
    bloqueadoSelect.classList.add('form-control');
    const opcionesBloqueado = ['true', 'false'];
    opcionesBloqueado.forEach(opcion => {
      const option = document.createElement('option');
      option.value = opcion;
      option.textContent = opcion;
      if (usuario.bloqueado.toString() === opcion) {
        option.selected = true;
      }
      bloqueadoSelect.appendChild(option);
    });
    bloqueadoSelectCol.appendChild(bloqueadoSelect);

    const bloqueadoGuardarBtnCol = document.createElement('div');
    bloqueadoGuardarBtnCol.classList.add('col', 'col-12', 'col-md-2', 'd-flex', 'justify-content-center');
    bloqueadoRow.appendChild(bloqueadoGuardarBtnCol);

    const bloqueadoGuardarBtn = document.createElement('button');
    bloqueadoGuardarBtn.textContent = 'Cambiar';
    bloqueadoGuardarBtn.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
    bloqueadoGuardarBtn.addEventListener('click', () => {
      usuario.bloqueado = bloqueadoSelect.value === 'true';
      UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
      inicializar(); // Actualizar la vista
    });
    bloqueadoGuardarBtnCol.appendChild(bloqueadoGuardarBtn);
  }

  rowBloqueado();

  // Limpiar el contenedor y añadir el formulario
  const containerUsuarios = document.querySelector('#admin-usuarios');
  containerUsuarios.innerHTML = '';
  containerUsuarios.appendChild(form);

  // Botón de regresar y eliminar
  const divBotones = document.createElement('div');
  divBotones.classList.add('d-flex', 'justify-content-around', 'w-100');

  const regresarBtn = document.createElement('button');
  regresarBtn.textContent = 'Regresar';
  regresarBtn.classList.add('btn', 'btn-secondary', 'btn-block', 'my-2');
  regresarBtn.addEventListener('click', () => {
    inicializar(); // Volver a la vista anterior
  });
  divBotones.appendChild(regresarBtn);

  const eliminarBtn = document.createElement('button');
  eliminarBtn.textContent = 'Eliminar';
  eliminarBtn.classList.add('btn', 'btn-danger', 'btn-block', 'my-2');
  eliminarBtn.addEventListener('click', () => {
    const confirmacion = confirm('¿Seguro desea eliminar permanentemente este usuario?');
    if (confirmacion) {
      const indice = usuarios.findIndex(usuario => usuario.id === id);
      if (indice !== -1) {
        usuarios.splice(indice, 1);
        UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
      }
      inicializar(); // Volver a la vista anterior
    }
  });
  divBotones.appendChild(eliminarBtn);

  containerUsuarios.appendChild(divBotones);

  // Agregar eventos a los inputs y selects para habilitar los botones de guardar
  document.querySelectorAll('.editar-usuario-form input, .editar-usuario-form select').forEach(element => {
    const initialValue = element.tagName === 'SELECT' ? element.value : '';
    const button = element.closest('.form-row').querySelector('button');

    element.addEventListener('input', () => {
      if (element.tagName === 'SELECT') {
        if (element.value !== initialValue) {
          button.classList.remove('disabled');
        } else {
          button.classList.add('disabled');
        }
      } else {
        switch (true) {
          case element.type === 'text' && validarNombreUsuario(element.value):
            button.classList.remove('disabled');
            break;

          case element.type === 'email' && validarCorreoElectronico(element.value):
            button.classList.remove('disabled');
            break;

          case element.type === 'password' && validarContraseniaUsuario(element.value):
            button.classList.remove('disabled');
            break;

          default:
            button.classList.add('disabled');
            break;
        }
      }
    });
  });
}

// Uso
document.addEventListener('DOMContentLoaded', () => {
  inicializar();
});
