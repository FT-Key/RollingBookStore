import * as UsuariosModule from "./manejadorUsuarios.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";

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
  let patternIndications = document.querySelectorAll("abbr");

  let error = false; // Determina si se creará o no el usuario

  // Establecer todos los campos como inválidos, se irán cambiando a válidos a medida que cumplan las validaciones
  nombreUsuario.classList.remove("is-valid");
  nombreUsuario.classList.add("is-invalid");
  correoUsuario.classList.remove("is-valid");
  correoUsuario.classList.add("is-invalid");
  contraseñaUsuario.classList.remove("is-valid");
  contraseñaUsuario.classList.add("is-invalid");
  contraseñaConfirmarUsuario.classList.remove("is-valid");
  contraseñaConfirmarUsuario.classList.add("is-invalid");

  patternIndications.forEach((element) => {
    element.classList.add("d-none");
    element.setAttribute("title", "");
  });

  // Input nombre validación
  if (!nombreUsuario.value.length) {
    patternIndications[0].setAttribute(
      "title",
      "Ingrese un nombre de usuario."
    );
    patternIndications[0].classList.remove("d-none");
    error = true;
  } else if (!validarNombreUsuario(nombreUsuario.value)) {
    patternIndications[0].setAttribute(
      "title",
      "El nombre de usuario debe contener\nentre 3 y 30 carácteres alfanuméricos"
    );
    patternIndications[0].classList.remove("d-none");
    error = true;
  } else if (!usuarios.some((user) => user.nombre == nombreUsuario.value)) {
    nombreUsuario.classList.remove("is-invalid");
    nombreUsuario.classList.add("is-valid");
  }

  // Input correo validación
  if (!correoUsuario.value.length) {
    patternIndications[1].setAttribute(
      "title",
      "Ingrese un correo electrónico."
    );
    patternIndications[1].classList.remove("d-none");
    error = true;
  } else if (!validarCorreoElectronico(correoUsuario.value)) {
    patternIndications[1].setAttribute(
      "title",
      "El correo debe contener\nentre 3 y 30 carácteres con formato de email"
    );
    patternIndications[1].classList.remove("d-none");
    error = true;
  } else if (!usuarios.some((user) => user.email == correoUsuario.value)) {
    correoUsuario.classList.remove("is-invalid");
    correoUsuario.classList.add("is-valid");
  }

  // Input contraseña validación
  if (!contraseñaUsuario.value.length) {
    patternIndications[2].setAttribute("title", "Ingrese una contraseña.");
    patternIndications[2].classList.remove("d-none");
    error = true;
  } else if (!validarContraseniaUsuario(contraseñaUsuario.value)) {
    patternIndications[2].setAttribute(
      "title",
      "La contraseña debe contener\nentre 3 y 30 carácteres alfanuméricos\ncon al menos una mayúscula y un número"
    );
    patternIndications[2].classList.remove("d-none");
    error = true;
  } else {
    contraseñaUsuario.classList.remove("is-invalid");
    contraseñaUsuario.classList.add("is-valid");
  }

  // Input confirmar contraseña validación
  if (!contraseñaConfirmarUsuario.value.length) {
    patternIndications[3].setAttribute("title", "Confirme su contraseña.");
    patternIndications[3].classList.remove("d-none");
    error = true;
  } else if (!validarContraseniaUsuario(contraseñaConfirmarUsuario.value)) {
    patternIndications[3].setAttribute(
      "title",
      `La confirmación de su contraseña debe\nseguir el mismo formato de la contraseña.`
    );
    patternIndications[3].classList.remove("d-none");
    patternIndications[2].classList.remove("d-none");
    error = true;
  } else {
    contraseñaConfirmarUsuario.classList.remove("is-invalid");
    contraseñaConfirmarUsuario.classList.add("is-valid");
  }

  // Input terminos y condiciones
  if (!terminosYCondiciones.checked) {
    labelTerms.classList.add("check-invalid");
    error = true;
  } else {
    labelTerms.classList.remove("check-invalid");
  }

  // Registro

  if (
    usuarios.some((user) => user.email == correoUsuario.value) &&
    patternIndications[1].getAttribute("title").trim() == ""
  ) {
    patternIndications[1].setAttribute(
      "title",
      "Ya existe un usuario registrado con este correo electrónico."
    );
    patternIndications[1].classList.remove("d-none");
    error = true;
  }

  if (
    usuarios.some((user) => user.nombre == nombreUsuario.value) &&
    patternIndications[0].getAttribute("title").trim() == ""
  ) {
    patternIndications[0].setAttribute(
      "title",
      "Nombre de usuario no disponible."
    );
    patternIndications[0].classList.remove("d-none");
    error = true;
  }

  if (!terminosYCondiciones.checked) {
    patternIndications[4].setAttribute(
      "title",
      "Debe aceptar los términos y condiciones."
    );
    patternIndications[4].classList.remove("d-none");
    error = true;
  }

  if (
    contraseñaConfirmarUsuario.value !== contraseñaUsuario.value &&
    patternIndications[3].getAttribute("title").trim() === ""
  ) {
    patternIndications[3].setAttribute(
      "title",
      "Las contraseñas no coinciden."
    );
    patternIndications[3].classList.remove("d-none");
    contraseñaUsuario.classList.remove("is-valid");
    contraseñaUsuario.classList.add("is-invalid");
    contraseñaConfirmarUsuario.classList.remove("is-valid");
    contraseñaConfirmarUsuario.classList.add("is-invalid");
    error = true;
  }

  if (!error) {
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

    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);

    UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);
    location.href = "./inicioSesion.html";
  }
}

function validarNombreUsuario(nombreUsuario) {
  // Expresión regular
  const regex =
    /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d\-_\.]{3,30}$/;

  // Comprobar si el valor de nombreUsuario cumple con la expresión regular
  return regex.test(nombreUsuario);
}

function validarContraseniaUsuario(nombreUsuario) {
  // Expresión regular
  const regex =
    /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])(?=.*\d)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d_]{6,30}$/;

  // Comprobar si el valor de nombreUsuario cumple con la expresión regular
  return regex.test(nombreUsuario);
}

function validarCorreoElectronico(correo) {
  // Expresión regular
  const regex = /^[a-zA-Z0-9_]{3,40}@[a-zA-Z0-9_]+\.[a-zA-Z0-9]+$/;

  // Comprobar si el valor de correoUsuario cumple con la expresión regular
  return regex.test(correo);
}

comprobarInicioSesion();
