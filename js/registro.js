import * as UsuariosModule from "./manejadorUsuarios.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";
import { validarNombreUsuario, validarContraseniaUsuario, validarCorreoElectronico } from "./validaciones.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

const nombreUsuario = document.querySelector("#userName");
const correoUsuario = document.querySelector("#userEmail");
const contraseñaUsuario = document.querySelector("#userPass");
const contraseñaConfirmarUsuario = document.querySelector("#userConfirmPass");
const terminosYCondiciones = document.querySelector("#userCheck");
const botonRegistro = document.querySelector("#botonRegistro");

botonRegistro.addEventListener("click", registrarse);

function comprobarInicioSesion() {
  let usuario = UsuariosModule.recuperarUsuarioDeSessionStorage();

  if (usuario) {
    const titulo = document.querySelector('h1');
    titulo.remove();
    const divRegistro = document.querySelector(".registro");
    const formRegistro = divRegistro.querySelector("form");

    // Eliminar el formulario completo de registro
    formRegistro.remove();

    // Crear un elemento <strong> para aplicar negrita
    const strongElement = document.createElement("strong");
    strongElement.textContent = usuario.nombre;

    // Crear el mensaje de sesión iniciada
    const mensajeSesionIniciada = document.createElement("h1");
    mensajeSesionIniciada.textContent = `Sesión iniciada como '`;

    // Se agrega al h1 el texto en negrita <strong> seguido del ' final
    mensajeSesionIniciada.appendChild(strongElement);
    mensajeSesionIniciada.appendChild(document.createTextNode("'"));

    // Agregar el mensaje al div
    divRegistro.appendChild(mensajeSesionIniciada);
  }
}

function registrarse(event) {
  event.preventDefault(); // Previene que el formulario se envíe si es un botón dentro de un formulario
  let usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
  let labelTerms = document.querySelector(".form-check-label"); // Label del terminos y condiciones
  let patternIndications = document.querySelectorAll(".registro abbr");

  let estado = { error: false }; // Encapsula error en un objeto para pasarlo como referencia auna función

  // Vincular patternIndications y state al contexto de setError
  const boundSetError = setError.bind({ patternIndications, estado });

  // let error = false; // Determina si se creará o no el usuario

  // Establecer todos los campos como inválidos, se irán cambiando a válidos a medida que cumplan las validaciones
  setInvalid(nombreUsuario);
  setInvalid(correoUsuario);
  setInvalid(contraseñaUsuario);
  setInvalid(contraseñaConfirmarUsuario);
  setInvalid(terminosYCondiciones);

  patternIndications.forEach((element) => {
    element.classList.add("d-none");
    element.setAttribute("title", "");
  });

  // Input nombre validación
  if (!nombreUsuario.value.length) {
    boundSetError(0, "Ingrese un nombre de usuario.");
  } else if (!validarNombreUsuario(nombreUsuario.value)) {
    boundSetError(0, "El nombre de usuario debe contener\nentre 3 y 30 carácteres alfanuméricos.");
  } else if (!usuarios.some((user) => user.nombre == nombreUsuario.value)) {
    setValid(nombreUsuario);
  }

  // Input correo validación
  if (!correoUsuario.value.length) {
    boundSetError(1, "Ingrese un correo electrónico.");
  } else if (!validarCorreoElectronico(correoUsuario.value)) {
    boundSetError(1, "El correo debe contener\nentre 3 y 30 carácteres con formato de email.");
  } else if (!usuarios.some((user) => user.email == correoUsuario.value)) {
    setValid(correoUsuario);
  }

  // Input contraseña validación
  if (!contraseñaUsuario.value.length) {
    boundSetError(2, "Ingrese una contraseña.");
  } else if (!validarContraseniaUsuario(contraseñaUsuario.value)) {
    boundSetError(2, "La contraseña debe contener\nentre 3 y 30 carácteres alfanuméricos\ncon al menos una mayúscula y un número.");
  } else {
    setValid(contraseñaUsuario);
  }

  // Input confirmar contraseña validación
  if (!contraseñaConfirmarUsuario.value.length) {
    boundSetError(3, "Confirme su contraseña.");
  } else if (!validarContraseniaUsuario(contraseñaConfirmarUsuario.value)) {
    boundSetError(3, `La confirmación de su contraseña debe\nseguir el mismo formato de la contraseña.`);
    patternIndications[2].classList.remove("d-none");
  } else {
    setValid(contraseñaConfirmarUsuario);
  }

  // Registro

  if (
    usuarios.some((user) => user.email == correoUsuario.value) &&
    patternIndications[1].getAttribute("title").trim() == ""
  ) {
    boundSetError(1, "Ya existe un usuario registrado con este correo electrónico.");
  }

  if (
    usuarios.some((user) => user.nombre == nombreUsuario.value) &&
    patternIndications[0].getAttribute("title").trim() == ""
  ) {
    boundSetError(0, "Nombre de usuario no disponible.");
  }

  if (!terminosYCondiciones.checked) {
    boundSetError(4, "Debe aceptar los términos y condiciones.");
  }

  if (
    contraseñaConfirmarUsuario.value !== contraseñaUsuario.value &&
    patternIndications[3].getAttribute("title").trim() === ""
  ) {
    boundSetError(3, "Las contraseñas no coinciden.");
    setInvalid(contraseñaUsuario);
    setInvalid(contraseñaConfirmarUsuario);
  }

  if (!estado.error) {
    let nuevoUsuarioId = usuarios.length
      ? usuarios[usuarios.length - 1].id + 1
      : 1;
    let nuevoUsuario = new UsuariosModule.Usuario(
      nuevoUsuarioId,
      nombreUsuario.value,
      correoUsuario.value,
      contraseñaUsuario.value,
      "miembro",
      terminosYCondiciones
    );

    usuarios.push(nuevoUsuario);

    UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
    location.href = "./inicioSesion.html";
  }
}

function setValid(elemento) {
  elemento.classList.remove("is-invalid");
  elemento.classList.add("is-valid");
}

function setInvalid(elemento) {
  elemento.classList.remove("is-valid");
  elemento.classList.add("is-invalid");
}

function setError(indice, mensajeError) {
  this.patternIndications[indice].setAttribute("title", mensajeError);
  this.patternIndications[indice].classList.remove("d-none");
  this.estado.error = true;
}

comprobarInicioSesion();
