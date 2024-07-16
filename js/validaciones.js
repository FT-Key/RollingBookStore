export function validarNombreUsuario(nombreUsuario) {
  // Expresión regular
  const regex =
    /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d\-_\.]{3,30}$/;

  // Comprobar si el valor de nombreUsuario cumple con la expresión regular
  return regex.test(nombreUsuario);
}

export function validarContraseniaUsuario(nombreUsuario) {
  // Expresión regular
  const regex =
    /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])(?=.*\d)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\d_]{6,30}$/;

  // Comprobar si el valor de nombreUsuario cumple con la expresión regular
  return regex.test(nombreUsuario);
}

export function validarCorreoElectronico(correo) {
  // Expresión regular
  const regex = /^[a-zA-Z0-9_]{3,40}@[a-zA-Z0-9_]+\.[a-zA-Z0-9]+$/;

  // Comprobar si el valor de correoUsuario cumple con la expresión regular
  return regex.test(correo);
}

export function validarLibroTitulo(cadena) {
  // Expresión regular mejorada
  const regex = /^[A-ZÁÉÍÓÚÑÜ0-9][A-Za-zÁÉÍÓÚÑÜáéíóúñü0-9\s,'-:()!?]*$/;

  // Comprobar si el valor de cadena cumple con la expresión regular
  return regex.test(cadena);
}

export function validarLibroDescripcion(cadena) {
  // Expresión regular para descripciones
  const regex = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü0-9\s,'-:()!?."%&$#@\n]*$/;

  // Comprobar si el valor de cadena cumple con la expresión regular
  return regex.test(cadena);
}

export function validarLibroAutorGeneroIdiomaEditorial(cadena) {
  const regex = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\s,'&-]+$/;
  return regex.test(cadena);
}

export function validarLibroISBN(cadena) {
  const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
  return regex.test(cadena);
}

export function validarLibroPrecio(cadena) {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(cadena);
}

export function validarLibroPaginasStock(cadena) {
  const regex = /^\d+$/;
  return regex.test(cadena);
}

export function validarLibroFecha(cadena) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(cadena);
}

export function validarLibroCategorias(cadena) {
  const regex = /^([A-Za-zÁÉÍÓÚÑÜáéíóúñü0-9\s,'-]+,)*[A-Za-zÁÉÍÓÚÑÜáéíóúñü0-9\s,'-]+$/;
  return regex.test(cadena);
}

export function validarLibroImagenURL(cadena) {
  // Expresión regular para URLs absolutas
  const regexURL = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
  // Expresión regular para rutas locales
  const regexLocal = /^(\.\/|\.\.\/).*\/.*\.(?:png|jpg|jpeg|gif|webp)$/i;

  // Comprobar si la cadena cumple con alguna de las dos expresiones regulares
  return regexURL.test(cadena) || regexLocal.test(cadena);
}