document.addEventListener("DOMContentLoaded", function () {
  if (typeof productos === "undefined") return;

  const tablaCarrito = document.querySelector("#tabla-carrito");
  const subtotalPagina = document.querySelector("#subtotal-carrito-pagina");
  const totalPagina = document.querySelector("#total-carrito-pagina");
  const btnVaciar = document.querySelector("#btn-vaciar-carrito");
  const btnWhatsapp = document.querySelector("#btn-finalizar-whatsapp");

  const tipoEnvio = document.querySelector("#tipo-envio");
  const campoProvincia = document.querySelector("#campo-provincia");
  const campoLima = document.querySelector("#campo-lima");

  const numeroWhatsAppTienda = "51981539824";

  if (!tablaCarrito) return;

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarMiniCarrito() {
    if (typeof window.renderCarrito === "function") {
      window.renderCarrito();
    }
  }

  function renderCarritoPagina() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      tablaCarrito.innerHTML = `
        <tr class="table_row">
          <td colspan="5" class="txt-center p-t-40 p-b-40">
            <p class="stext-102 cl6">Tu carrito está vacío.</p>
            <a href="pro-cepillos.html" class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 m-t-20" style="display:inline-flex;">
              Ver productos
            </a>
          </td>
        </tr>
      `;

      if (subtotalPagina) subtotalPagina.textContent = "S/ 0.00";
      if (totalPagina) totalPagina.textContent = "S/ 0.00";

      actualizarMiniCarrito();
      return;
    }

    let total = 0;

    tablaCarrito.innerHTML = carrito.map(item => {
      const producto = productos.find(p => String(p.id) === String(item.id));
      if (!producto) return "";

      const precio = Number(producto.precio) || 0;
      const cantidad = Number(item.cantidad) || 1;
      const subtotal = precio * cantidad;

      total += subtotal;

      return `
        <tr class="table_row">
          <td class="column-1">
            <div class="how-itemcart1 btn-eliminar-carrito-pagina"
                 data-id="${item.id}"
                 data-variante="${item.variante || ""}">
              <img src="${item.imagen || producto.imagen}" alt="${producto.nombre}">
            </div>
          </td>

          <td class="column-2">
            <a href="product-detail.html?id=${producto.id}" class="cl2 hov-cl1">
              ${producto.nombre}${item.variante ? ` (${item.variante})` : ""}
            </a>
          </td>

          <td class="column-3">
            S/ ${precio.toFixed(2)}
          </td>

          <td class="column-4">
            <div class="wrap-num-product flex-w m-l-auto m-r-0">
              <button type="button" class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m btn-restar-carrito-pagina"
                data-id="${item.id}"
                data-variante="${item.variante || ""}">
                <i class="fs-16 zmdi zmdi-minus"></i>
              </button>

              <input class="mtext-104 cl3 txt-center num-product input-cantidad-carrito-pagina"
                type="number"
                value="${cantidad}"
                min="1"
                data-id="${item.id}"
                data-variante="${item.variante || ""}">

              <button type="button" class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m btn-sumar-carrito-pagina"
                data-id="${item.id}"
                data-variante="${item.variante || ""}">
                <i class="fs-16 zmdi zmdi-plus"></i>
              </button>
            </div>
          </td>

          <td class="column-5">
            S/ ${subtotal.toFixed(2)}
          </td>
        </tr>
      `;
    }).join("");

    if (subtotalPagina) subtotalPagina.textContent = `S/ ${total.toFixed(2)}`;
    if (totalPagina) totalPagina.textContent = `S/ ${total.toFixed(2)}`;

    actualizarMiniCarrito();
  }

  function actualizarCantidad(id, variante, nuevaCantidad) {
    let carrito = obtenerCarrito();

    const item = carrito.find(p =>
      String(p.id) === String(id) &&
      String(p.variante || "") === String(variante || "")
    );

    if (!item) return;

    item.cantidad = Number(nuevaCantidad);

    if (item.cantidad <= 0) {
      carrito = carrito.filter(p =>
        !(String(p.id) === String(id) &&
        String(p.variante || "") === String(variante || ""))
      );
    }

    guardarCarrito(carrito);
    renderCarritoPagina();
  }

  document.addEventListener("click", function (e) {
    const btnSumar = e.target.closest(".btn-sumar-carrito-pagina");
    const btnRestar = e.target.closest(".btn-restar-carrito-pagina");
    const btnEliminar = e.target.closest(".btn-eliminar-carrito-pagina");

    if (btnSumar) {
      e.preventDefault();

      const carrito = obtenerCarrito();

      const item = carrito.find(p =>
        String(p.id) === String(btnSumar.dataset.id) &&
        String(p.variante || "") === String(btnSumar.dataset.variante || "")
      );

      if (item) {
        actualizarCantidad(item.id, item.variante, item.cantidad + 1);
      }
    }

    if (btnRestar) {
      e.preventDefault();

      const carrito = obtenerCarrito();

      const item = carrito.find(p =>
        String(p.id) === String(btnRestar.dataset.id) &&
        String(p.variante || "") === String(btnRestar.dataset.variante || "")
      );

      if (item) {
        actualizarCantidad(item.id, item.variante, item.cantidad - 1);
      }
    }

    if (btnEliminar) {
      e.preventDefault();

      let carrito = obtenerCarrito();

      carrito = carrito.filter(p =>
        !(String(p.id) === String(btnEliminar.dataset.id) &&
        String(p.variante || "") === String(btnEliminar.dataset.variante || ""))
      );

      guardarCarrito(carrito);
      renderCarritoPagina();
    }
  });

  document.addEventListener("change", function (e) {
    const input = e.target.closest(".input-cantidad-carrito-pagina");

    if (input) {
      const cantidad = Number(input.value) || 1;
      actualizarCantidad(input.dataset.id, input.dataset.variante || "", cantidad);
    }
  });

  if (btnVaciar) {
    btnVaciar.addEventListener("click", function (e) {
      e.preventDefault();

      localStorage.removeItem("carrito");
      renderCarritoPagina();
    });
  }

  function mostrarCamposEnvio(valor) {
    if (campoProvincia) campoProvincia.style.display = "none";
    if (campoLima) campoLima.style.display = "none";

    if (valor === "Envío a provincia por Shalom") {
      if (campoProvincia) campoProvincia.style.display = "block";
    }

    if (valor === "Envío a domicilio en Lima") {
      if (campoLima) campoLima.style.display = "block";
    }
  }

  if (tipoEnvio) {
    tipoEnvio.addEventListener("change", function () {
      mostrarCamposEnvio(this.value);
    });

    if (window.jQuery) {
      $("#tipo-envio").on("change select2:select", function () {
        mostrarCamposEnvio(this.value);
      });
    }
  }

if (btnWhatsapp) {
  btnWhatsapp.addEventListener("click", function () {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      swal("Carrito vacío", "Agrega productos antes de finalizar el pedido.", "warning");
      return;
    }

    const envio = document.querySelector("#tipo-envio")?.value || "";
    const destinoProvincia = document.querySelector("#destino-provincia")?.value || "";
    const distritoLima = document.querySelector("#distrito-lima")?.value || "";
    const direccionLima = document.querySelector("#direccion-lima")?.value || "";

    const nombre = document.querySelector("#nombre-cliente")?.value.trim() || "";
    const correo = document.querySelector("#correo-cliente")?.value.trim() || "";
    const tipoPago = document.querySelector("#tipo-pago")?.value || "";
    const comentario = document.querySelector("#comentario-cliente")?.value.trim() || "";

    const codigoPais = document.querySelector("#codigo-pais")?.value || "+51";
    const numeroCliente = document.querySelector("#whatsapp-cliente")?.value.trim() || "";

    if (!envio) {
      swal("Falta envío", "Selecciona una opción de envío.", "warning");
      return;
    }

    if (envio === "Envío a provincia por Shalom" && !destinoProvincia) {
      swal("Falta destino", "Selecciona el destino para envío por Shalom.", "warning");
      return;
    }

    if (envio === "Envío a domicilio en Lima" && (!distritoLima || !direccionLima)) {
      swal("Falta dirección", "Completa el distrito y la dirección de entrega.", "warning");
      return;
    }

    if (!nombre) {
      swal("Falta nombre", "Ingresa tu nombre completo.", "warning");
      return;
    }

    if (!tipoPago) {
      swal("Falta método de pago", "Selecciona un tipo de pago.", "warning");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correo || !correoValido) {
      swal("Correo inválido", "Ingresa un correo electrónico válido. Ejemplo: nombre@correo.com", "warning");
      return;
    }

    if (!numeroCliente) {
      swal("Falta WhatsApp", "Completa tu número de WhatsApp.", "warning");
      return;
    }

    if (codigoPais === "+51" && numeroCliente.length !== 9) {
      swal("Número inválido", "En Perú el número debe tener 9 dígitos.", "warning");
      return;
    }

    if (codigoPais !== "+51" && numeroCliente.length < 6) {
      swal("Número inválido", "Ingresa un número de WhatsApp válido.", "warning");
      return;
    }

    const whatsappCliente = codigoPais + numeroCliente;

    let total = 0;

    const productosTexto = carrito.map((item, index) => {
      const producto = productos.find(p => String(p.id) === String(item.id));
      if (!producto) return "";

      const precio = Number(producto.precio) || 0;
      const cantidad = Number(item.cantidad) || 1;
      const subtotal = precio * cantidad;

      total += subtotal;

      return `${index + 1}. ${producto.nombre}${item.variante ? ` (${item.variante})` : ""}
Código: ${producto.codigo || producto.id}
Cantidad: ${cantidad}
Precio: S/ ${precio.toFixed(2)}
Subtotal: S/ ${subtotal.toFixed(2)}`;
    }).join("\n\n");

    let datosEnvio = `Tipo de envío: ${envio}`;

    if (envio === "Envío a provincia por Shalom") {
      datosEnvio += `\nDestino Shalom: ${destinoProvincia}`;
    }

    if (envio === "Envío a domicilio en Lima") {
      datosEnvio += `\nDistrito: ${distritoLima}\nDirección: ${direccionLima}`;
    }

    const mensaje = `Hola, quiero finalizar mi pedido:

PRODUCTOS:
${productosTexto}

TOTAL: S/ ${total.toFixed(2)}

DATOS DEL CLIENTE:
Nombre: ${nombre}
Correo: ${correo}
WhatsApp: ${whatsappCliente}
Método de pago: ${tipoPago}
Comentario adicional: ${comentario || "Sin comentario"}

ENVÍO:
${datosEnvio}

Quedo atento(a) para confirmar mi pedido. ¡Gracias!`;

    const url = `https://wa.me/${numeroWhatsAppTienda}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  });
}

  renderCarritoPagina();
});