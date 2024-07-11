import * as UsuariosModule from "./manejadorUsuarios.js";
import * as RutasProtegidassModule from "./rutasProtegidas.js";
import * as NavbarModule from "./manejadorNavbar.js";
import * as FooterModule from "./footer.js";

RutasProtegidassModule.protegerRuta(true, true, true);
NavbarModule.inicializarNavbar();
FooterModule.agregarFooter();

const divInicioSesion = document.querySelector("#inicio-sesion");

const botonInicio = divInicioSesion.querySelector("#botonInicio");
botonInicio.addEventListener("click", iniciarSesion);

function comprobarInicioSesion() {
  let usuario = UsuariosModule.recuperarUsuarioDeSessionStorage();

  if (usuario) {
    const formInicioSesion = divInicioSesion.querySelector("form");

    // Eliminar el formulario completo de inicio de sesión
    formInicioSesion.remove();

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
    divInicioSesion.appendChild(mensajeSesionIniciada);
  }
}

function iniciarSesion(event) {
  event.preventDefault(); // Previene que el formulario se envíe si es un botón dentro de un formulario

  // Declaro las variables que componen el formulario de inicio de sesion
  const nombreUsuario = divInicioSesion.querySelector("#userName");
  const contraseñaUsuario = divInicioSesion.querySelector("#userPass");
  const recordarme = divInicioSesion.querySelector("#userCheck");
  let patternIndications = divInicioSesion.querySelectorAll("abbr");

  // Declaro las variables que se usaran en la lógica del a función
  let usuarios = UsuariosModule.recuperarUsuariosDeLocalStorage();
  let estado = { error: false }; // Encapsula error en un objeto para pasarlo como referencia auna función
  let comprobarContrasenia = false;

  // Vincular patternIndications y state al contexto de setError
  const boundSetError = setError.bind({ patternIndications, estado });

  // Establecer todos los campos como inválidos, se irán cambiando a válidos a medida que cumplan las validaciones
  setInvalid(nombreUsuario);
  setInvalid(contraseñaUsuario);

  // Restablece los mansajes de error a cadenas vacías y los esconde
  patternIndications.forEach((element) => {
    element.classList.add("d-none");
    element.setAttribute("title", "");
  });

  // Input nombre validación
  if (!nombreUsuario.value.length) {
    boundSetError(0, "Ingrese un nombre de usuario.");
  } else if (!validarNombreUsuario(nombreUsuario.value)) {
    boundSetError(
      0,
      "El nombre de usuario debe contener\nentre 3 y 30 carácteres alfanuméricos"
    );
  } else {
    setValid(nombreUsuario);
  }

  // Input contraseña validación
  if (!contraseñaUsuario.value.length) {
    boundSetError(1, "Ingrese una contraseña.");
  } else if (!validarContraseniaUsuario(contraseñaUsuario.value)) {
    boundSetError(
      1,
      "La contraseña debe contener\nentre 3 y 30 carácteres alfanuméricos\ncon al menos una mayúscula y un número"
    );
  } else {
    setValid(contraseñaUsuario);
  }

  // Inicio de sesión

  const existeUsuario = usuarios.some(
    (user) => user.nombre === nombreUsuario.value
  );
  const noExisteErrorNombre =
    patternIndications[0].getAttribute("title").trim() === "";

  if (!existeUsuario && noExisteErrorNombre) {
    boundSetError(0, "Usuario inexistente.");
    setInvalid(nombreUsuario);
    setInvalid(contraseñaUsuario);
  } else if (existeUsuario && noExisteErrorNombre) {
    comprobarContrasenia = true;
  }

  if (comprobarContrasenia) {
    const usuario = usuarios.find(
      (user) => user.nombre === nombreUsuario.value
    );
    const contraseniasIguales = contraseñaUsuario.value === usuario.contrasenia;
    const noExisteErrorContrasenia =
      patternIndications[1].getAttribute("title").trim() === "";

    if (!contraseniasIguales && noExisteErrorContrasenia) {
      boundSetError(1, "Contraseñas incorrecta.");
      setInvalid(contraseñaUsuario);
    }
  }

  if (!estado.error) {
    const usuario = usuarios.find(
      (user) => user.nombre === nombreUsuario.value
    );
    const indexUsuario = usuarios.findIndex(
      (user) => user.nombre === nombreUsuario.value
    );

    if (recordarme.checked) {
      usuario.recordar = true;
    }

    usuario.login = true;

    usuarios[indexUsuario] = usuario;

    // Lógica de inicio de sesión

    UsuariosModule.guardarUsuarioEnSessionStorage(usuario);
    UsuariosModule.guardarUsuariosEnLocalStorage(usuarios);

    // Redirigir a inicio
    location.href = "./inicio.html";
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

comprobarInicioSesion();
