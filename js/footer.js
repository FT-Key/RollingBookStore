// Definir el contenido del footer

export function agregarFooter() {
  const footerHTML = `
        <footer class="text-center">
          <div class="container">
            <div class="row">
              <div class="col-6 mb-3">
                <h5>Sobre Nosotros</h5>
                <p>Información sobre la empresa</p>
              </div>
              
              <div class="col-6 mb-3">
                <h5>Síguenos</h5>
                <a href="#" class="me-2"><i class="fab fa-facebook-f"></i> Facebook</a>
                <a href="#" class="me-2"><i class="fab fa-twitter"></i> Twitter</a>
                <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
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
