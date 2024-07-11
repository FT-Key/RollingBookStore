# Documentacion

Para poder usar los manejadores de datos primero debes declarar tu script principal (el scrip que usaras en tu html) con type:"module", por ej:
<!-- <script type="module" src="./script.js"><script/> -->

luego desde tu archivo js al comienzo importar el manejador con (import * as nombre from 'ruta dej manejador') por ejemplo:
<!--
import * as LibrosModule from './manejadorLibros.js';
import * as RutasProtegidassModule from './rutasProtegidas.js';
import * as UsuariosModule from './manejadorUsuarios.js';
-->

y para llamar a sus funciones debes llamarlas por su nombre primero segido de un . y nombre de la funcion que deseas llamar, por ej:

<!-- 
LibrosModule.guardarLibrosEnLocalStorage();
LibrosModule.recuperarLibrosDeLocalStorage();
 -->


Funciones:

# manejadorLibros.js:

- guardarLibrosEnLocalStorage()
Guarda el array de libros en el localstorage con la clave 'libros'

- recuperarLibrosDeLocalStorage()
Recupera los libros del local storage y los devuelve como un array

- guardarDestacadossEnLocalStorage()
Guarda el array de destacados en el localstorage con la clave 'librosdestacados'

- recuperarDestacadosDeLocalStorage()
Recupera los destacados del local storage y los devuelve como un array

- guardarLibroEnSessionStorage()
Guarda un libro en el sessionstorage con la clave 'libro'

- recuperarLibroDeSessionStorage()
Recupera el libro del sessionstorage que tenga la clave 'libro'

- eliminarLibroDeSessionStorage()
Elimina el libro del sessionstorage con la clave 'libro'

- altaLibro(libro)
Se envia como argumento un libro y la funcion lo agrega al array de 'libros y lo guarda en el localstorage

- bajaLogicaLibro(isLibro)
Se envia un id del libro que queremos dar baja logica y la funcion lo busca en el localstorage y cambia el valor de su atributo bloqueado a true

- bajaFisicaLibro(isLibro)
Se envia un id del libro que queremos dar baja fisica y la funcion lo busca en el localstorage y lo elimina

- modificacionLibro(libroModificado)
Se envía un libro previamente modificado y la funcion busca el libro que coincida con el id en el localstorage y lo reemplaza

# manejadorUsuarios.js:

- guardarUsuariosEnLocalStorage()
Guarda el array de usuarios en el localstorage con la clave 'usuarios'

- recuperarUsuariosDeLocalStorage()
Recupera los usuarios del local storage y los devuelve como un array

- guardarUsuarioEnSessionStorage()
Guarda un usuarioibro en el sessionstorage con la clave 'usuario' y su contraseña encriptada

- recuperarUsuarioDeSessionStorage()
Recupera el usuario del sessionstorage que tenga la clave 'usuario' con la contraseña desencriptada

- eliminarUsuarioDeSessionStorage()
Elimina el usuario del sessionstorage con la clave 'usuario'

# rutasProtegidas.js

- protegerRuta(deslogueado, miembro, admin)
Esta funcion recibe como parametros 3 booleanos, debe ser declarada al comienzo del js donde se utilice, los tre boleanos se encargan de identificar quienes tienen permitido entrar a esa pagina, por ej, si el primer parametro (deslogueado) es true los usuarios que no esten logueados podran acceder a dicha pagina, en caso de que sea false y entre un usuario no logueado, lo redirige a inicio, la misma logica aplica con los otros 3 parametros, debeoms especificar quienes pueden ingresar a nuestra pagina, por ejemplo para el index llamariamos a
<!-- protegerRuta(true, true, true) -->
indicando que todos pueden acceder a esa pagina, en caso de ser la pagina de administrador donde se puden editar los libros y las cuentas de usuario llamariamos a
<!-- protegerRuta(false, false, true) -->
indicando que solo los admin puden acceder a dicha pagina, en caso de que entre alguien deslogueado o alguien logueado que tenga rol de 'miembro' será redirigido al inicio de sesion, solo los usuarios con rol 'admin' podran acceder a dicha pagina.