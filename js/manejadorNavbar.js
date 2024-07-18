import * as UsuariosModule from './manejadorUsuarios.js';

export class NavbarLinkButton {
  constructor(nombre, onclick = null) {
    this.nombre = nombre;
    this.tipo = "button";
    this.onclick = onclick;
  }

  // Getter y Setter para nombre
  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  // Getter y Setter para tipo
  getTipo() {
    return this.tipo;
  }

  // Getter y Setter para onclick
  getOnClick() {
    return this.onclick;
  }

  setOnClick(onclick) {
    this.onclick = onclick;
  }
}

export class NavbarLink {
  constructor(nombre, href = "#") {
    this.nombre = nombre;
    this.tipo = "link";
    this.href = "../" + href;
  }

  // Getter y Setter para nombre
  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  // Getter y Setter para tipo
  getTipo() {
    return this.tipo;
  }

  // Getter y Setter para href
  getHref() {
    return this.href;
  }

  setHref(href) {
    this.href = href;
  }
}

export class NavbarDropdown {
  constructor(nombre, items = []) {
    this.nombre = nombre;
    this.tipo = "dropdown";
    this.items = items;
  }

  // Getter para nombre
  getNombre() {
    return this.nombre;
  }

  // Setter para nombre
  setNombre(nombre) {
    this.nombre = nombre;
  }

  // Getter para tipo
  getTipo() {
    return this.tipo;
  }

  // Getter para items
  getItems() {
    return this.items;
  }

  // Método para agregar un item
  addItem(item) {
    if (item instanceof NavbarDropdownItem) {
      this.items.push(item);
    } else {
      console.error('Item debe ser una instancia de NavbarDropdownItem');
    }
  }
}

export class NavbarDropdownItem {
  constructor(nombre, href) {
    this.nombre = nombre;
    this.href = href;
  }

  // Getter para nombre
  getNombre() {
    return this.nombre;
  }

  // Setter para nombre
  setNombre(nombre) {
    this.nombre = nombre;
  }

  // Getter para href
  getHref() {
    return this.href;
  }

  // Setter para href
  setHref(href) {
    this.href = href;
  }
}

export function eliminarElementoNavbar(elementoNombre) {
  // Selecciona todos los elementos li.nav-item
  const navItems = document.querySelectorAll('li.nav-item');

  // Itera sobre los elementos para encontrar el que contiene el enlace con el texto especificado
  let targetNavItem = null;

  navItems.forEach(item => {
    const link = item.querySelector('a.nav-link');
    if (link && link.textContent.trim() === elementoNombre) {
      targetNavItem = item;
    }
  });

  // targetNavItem ahora es el <li> que contiene el <a> con el texto especificado
  if (targetNavItem) {
    // Eliminar el elemento <li>
    targetNavItem.remove();
    /* console.log(`El elemento con el texto "${elementoNombre}" ha sido eliminado.`); */
  } else {
    /* console.log('No se encontró el elemento'); */
  }
}

export function agregarElementoNavbar(elemento) {
  let navbar = document.querySelector(".navbar-nav");

  let elementoNavbar;
  switch (true) {
    case elemento.tipo == "link":
      elementoNavbar = document.createElement('li');
      elementoNavbar.className = 'nav-item';
      elementoNavbar.innerHTML = `
                <a class="nav-link text-nowrap" href="${elemento.href}">${elemento.nombre}</a>
            `;
      break;

    case elemento.tipo == "button":
      elementoNavbar = document.createElement('li');
      elementoNavbar.className = 'nav-item';
      let buttonElement = document.createElement('a');
      buttonElement.className = 'nav-link text-nowrap';
      buttonElement.href = '#';
      buttonElement.role = 'button';
      buttonElement.textContent = elemento.nombre;
      buttonElement.onclick = function (event) {
        event.preventDefault();
        if (typeof elemento.onclick === 'function') {
          elemento.onclick.call(buttonElement, event); // Llamar al callback con el contexto de buttonElement
        }
      };
      elementoNavbar.appendChild(buttonElement);
      break;

    case elemento.tipo == "dropdown":
      elementoNavbar = document.createElement('li');
      elementoNavbar.className = 'nav-item dropdown';
      let dropdownElement = document.createElement('a');
      dropdownElement.className = 'nav-link text-nowrap dropdown-toggle';
      dropdownElement.href = '#';
      dropdownElement.role = 'button';
      dropdownElement.dataset.bsToggle = 'dropdown';
      dropdownElement.ariaExpanded = 'false';
      dropdownElement.textContent = elemento.nombre;

      let dropdownMenu = document.createElement('ul');
      dropdownMenu.className = 'dropdown-menu';
      elemento.items.forEach(item => {
        let dropdownItem = document.createElement('li');
        dropdownItem.innerHTML = `<a class="dropdown-item" href="${item.href}">${item.nombre}</a>`;
        dropdownMenu.appendChild(dropdownItem);
      });

      elementoNavbar.appendChild(dropdownElement);
      elementoNavbar.appendChild(dropdownMenu);
      break;

    default:
      break;
  }

  // Agrega el nuevo elemento al navbar
  navbar.appendChild(elementoNavbar);
}

export function agregarSearchNavbar() {
  let searchBar = `
    <form class="d-flex me-auto mt-3 mt-md-0" role="search">
        <input id="inputBusquedaNavbar" class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
        <abbr title="Buscar">
            <button id="botonBusquedaNavbar" class="btn btn-success d-flex justify-content-cente align-items-center h-100" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
        <abbr/>        
    </form>
    `;

  let navbar = document.querySelector("#navbarNav");

  // Agrega el nuevo elemento al navbar
  navbar.insertAdjacentHTML('afterbegin', searchBar);
}

export function agregarNavbar() {

  let header = document.querySelector('header');

  if (!header) {
    const body = document.querySelector('body');
    header = document.createElement('header');
    header.classList.add("sticky-top");
    body.insertBefore(header, body.firstChild); // Insertar el nuevo header al inicio del body
  } else if (!header.classList.contains("sticky-top")) {
    header.classList.add("sticky-top");
  }

  let estructuraNavbar = `
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-md navbar-dark bg-navbar border-body" id="navbar">
            <div class="container-fluid">
                <a class="navbar-brand" href="${(window.location.pathname === "/index.html" || window.location.pathname === "/") ? "#" : "../index.html"}"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    </ul>
                </div>
            </div>
        </nav>
        <!-- NAVBAR END -->
    `  

  header.insertAdjacentHTML('afterbegin', estructuraNavbar);

  const navBrand = document.querySelector('.navbar-brand');

  const logo = document.createElement('img');
  if (location.pathname == "/" || location.pathname == "index.html") {
    logo.src = "images/Logo.png";
  } else {
    logo.src = "../images/Logo.png";

  }
  
  logo.style.height = "40px";
  navBrand.appendChild(logo);
}

function cambiarVistaEstilo() {
  // Seleccionar el elemento navbar que corresponde a cambiarVista
  const navbarItems = document.querySelectorAll('.navbar-nav .nav-item');
  let cambiarVistaElement = null;

  navbarItems.forEach(item => {
    const link = item.querySelector('.nav-link.text-nowrap');
    if (link && link.textContent.trim() === "Vista miembro") {
      cambiarVistaElement = item;
    }
  });

  const item = cambiarVistaElement.querySelector('.nav-link.text-nowrap');

  // Aplicar estilos al elemento encontrado
  if (cambiarVistaElement ) {
    item.style.color = "white";
    cambiarVistaElement.style.backgroundColor = "rgba(16, 106, 16, 0.8)";
    cambiarVistaElement.style.borderRadius = "10px";
  }
}

export function inicializarNavbar() {
  agregarNavbar();

  let usuario = UsuariosModule.recuperarUsuarioDeSessionStorage() || null;
  let vistaMiembro = JSON.parse(sessionStorage.getItem('vistaMiembro')) || false;
  if (usuario && usuario.role == "admin") {
    vistaMiembro = false;
  }

  const cerrarSesion = new NavbarLinkButton("Cerrar Sesión", function () {
    UsuariosModule.eliminarUsuarioDeSessionStorage();
    sessionStorage.removeItem('vistaMiembro');
    localStorage.removeItem('usuarioRecordado');
    location.href = "/pages/inicioSesion.html";
  });

  const cambiarVista = new NavbarLinkButton("Vista miembro", function () {
    if (!vistaMiembro) {
      usuario.role = "miembroTest";

    } else {
      usuario.role = "admin";
    }
    UsuariosModule.eliminarUsuarioDeSessionStorage();
    UsuariosModule.guardarUsuarioEnSessionStorage(usuario);
    vistaMiembro = !vistaMiembro;
    sessionStorage.setItem('vistaMiembro', JSON.stringify(vistaMiembro));
    location.reload()
  });

  const favoritos = new NavbarLink("Favoritos", "pages/favoritos.html");
  const carrito = new NavbarLink("Carrito", "pages/carrito.html");
  const catalogo = new NavbarLink("Catálogo", "pages/inicio.html");
  const esIndex = window.location.pathname === "/index.html" || window.location.pathname === "/";

  switch (true) {
    case usuario === null:

      let iniSes;
      let reg;

      if (!esIndex) {
        iniSes = "../pages/inicioSesion.html";
        reg = "../pages/registro.html";
        agregarSearchNavbar();
      } else {
        iniSes = "./pages/inicioSesion.html";
        reg = "./pages/registro.html";
      }

      const iniciarSesion = new NavbarLink("Iniciar Sesión", iniSes);
      const registrarse = new NavbarLink("Registrarse", reg);
      agregarElementoNavbar(iniciarSesion);
      agregarElementoNavbar(registrarse);
      break;

    case usuario.role === "miembro" || usuario.role === "miembroTest":

      agregarElementoNavbar(favoritos);
      agregarElementoNavbar(carrito);
      agregarElementoNavbar(catalogo);
      if (usuario.role === "miembroTest") {
        agregarElementoNavbar(cambiarVista);
        cambiarVistaEstilo();
      }
      agregarElementoNavbar(cerrarSesion);
      if (!esIndex) {
        agregarSearchNavbar();
      }

      break;

    case usuario.role === "admin":

      const usuarios = new NavbarLink("Usuarios", "pages/adminUsuarios.html");
      agregarElementoNavbar(usuarios);
      agregarElementoNavbar(catalogo);
      agregarElementoNavbar(cambiarVista);
      agregarElementoNavbar(cerrarSesion);
      if (!esIndex) {
        agregarSearchNavbar();
      }
      break;

    default:
      console.log("No se ha iniciado sesión.");
      break;
  }

  if (window.location.pathname !== "/pages/inicio.html" && !esIndex) {
    const botonSearch = document.querySelector('#botonBusquedaNavbar');

    botonSearch.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe automáticamente

      const inputBusqueda = document.querySelector("#inputBusquedaNavbar");
      const palabraClave = inputBusqueda.value;

      location.href = "/pages/inicio.html?palabraClave=" + encodeURIComponent(palabraClave);
    });
  } else if (esIndex) {
    const navbar = document.querySelector('.navbar .container-fluid .collapse ul');
    navbar.classList.add('ms-auto');
  }

}

// Exporta todo lo definido en este módulo (manejadorNavbar.js)
export * from '../js/manejadorNavbar.js';
