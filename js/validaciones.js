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