// Definir el contenido del footer

export function agregarFooter() {
  const hrefError = location.pathname === "/" || location.pathname === "/index.html" ? "pages/error404.html" : "error404.html";
  const hrefSobreNosotros = location.pathname === "/" || location.pathname === "/index.html" ? "pages/sobreNosotros.html" : "sobreNosotros.html";

  const footerHTML = `
        <footer class="text-center">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-5 mb-3">
                <a href="${hrefSobreNosotros}" class="fs-4">Sobre Nosotros</a>
                <p class="fs-6">RollingBookStore es tu tienda en línea para libros. Encuentra bestsellers, clásicos y más, con promociones exclusivas y entrega a domicilio. ¡Tu próxima gran lectura te espera!</p>
              </div>

              <div class="col-12 col-md-2">

              </div>
              
              <div class="col-12 col-md-5 mb-3">
                <h5>Síguenos</h5>
                <a href="${hrefError}" class="me-2"><i class="fab fa-facebook-f"></i> Facebook</a>
                <a href="${hrefError}" class="me-2"><i class="fab fa-twitter"></i> Twitter</a>
                <a href="${hrefError}"><i class="fab fa-instagram"></i> Instagram</a>
              </div>
            </div>
            <div class="mt-3">
              <p>&copy; 2024 RollingBookStore. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
        `;
  const mainElement = document.querySelector("main");
  mainElement.insertAdjacentHTML("afterend", footerHTML);
}

export * from "../js/footer.js";
