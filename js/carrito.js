document.addEventListener("DOMContentLoaded", function () {
  if (typeof productos === "undefined") return;

  const listaCarrito = document.querySelector("#lista-carrito");
  const totalCarrito = document.querySelector("#total-carrito");
  const iconosCarrito = document.querySelectorAll(".icon-header-noti.js-show-cart");

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarContador() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    iconosCarrito.forEach(icono => {
      icono.setAttribute("data-notify", totalItems);
    });
  }

  function renderCarrito() {
    const carrito = obtenerCarrito();

    if (!listaCarrito || !totalCarrito) return;

    if (carrito.length === 0) {
      listaCarrito.innerHTML = `
        <li class="p-t-20 p-b-20 txt-center">
          <p class="stext-102 cl6">Tu carrito está vacío.</p>
        </li>
      `;

      totalCarrito.textContent = "Total: S/ 0.00";
      actualizarContador();
      return;
    }

    let total = 0;

    listaCarrito.innerHTML = carrito.map(item => {
      const producto = productos.find(p => String(p.id) === String(item.id));
      if (!producto) return "";

      const subtotal = Number(producto.precio) * item.cantidad;
      total += subtotal;

      return `
        <li class="header-cart-item flex-w flex-t m-b-12" data-id="${producto.id}">
          <div class="header-cart-item-img">
            <img src="${item.imagen || producto.imagen}" alt="${producto.nombre}">
          </div>

          <div class="header-cart-item-txt p-t-8">
            <a href="product-detail.html?id=${producto.id}" class="header-cart-item-name m-b-8 hov-cl1 trans-04">
              ${producto.nombre}${item.variante ? ` (${item.variante})` : ""}
            </a>

            ${item.variante ? `
              <span class="stext-107 cl6">
                ${item.variante}
              </span>
            ` : ""}

            <span class="header-cart-item-info m-t-5">
              S/ ${Number(producto.precio).toFixed(2)}
            </span>

            <div class="flex-w flex-m m-t-8">
              <button class="btn-restar-carrito bor4 p-lr-10 m-r-5" data-id="${producto.id}" data-variante="${item.variante || ""}">
                -
              </button>

              <span class="stext-102 cl3 m-r-5">
                ${item.cantidad}
              </span>

              <button class="btn-sumar-carrito bor4 p-lr-10 m-r-10" data-id="${producto.id}" data-variante="${item.variante || ""}">
                +
              </button>

              <button class="btn-eliminar-carrito cl2 hov-cl1" data-id="${producto.id}" data-variante="${item.variante || ""}">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </li>
      `;
    }).join("");

    totalCarrito.textContent = `Total: S/ ${total.toFixed(2)}`;
    actualizarContador();
  }

  function agregarAlCarrito(idProducto, cantidad = 1, variante = "", imagen = "") {
    const carrito = obtenerCarrito();

    const existe = carrito.find(item =>
      String(item.id) === String(idProducto) &&
      String(item.variante || "") === String(variante || "")
    );

    if (existe) {
      existe.cantidad += cantidad;
    } else {
      carrito.push({
        id: idProducto,
        cantidad: cantidad,
        variante: variante,
        imagen: imagen
      });
    }

    guardarCarrito(carrito);
    renderCarrito();
  }

  document.addEventListener("click", function (e) {
    const btnAgregar = e.target.closest(".js-addcart-detail, .js-addcart-b2");

    if (btnAgregar) {
      e.preventDefault();

      const id =
        btnAgregar.dataset.id ||
        btnAgregar.getAttribute("data-id") ||
        new URLSearchParams(window.location.search).get("id");

      if (!id) return;

      const cantidadInput = document.querySelector(".num-product");
      const cantidad = cantidadInput ? Number(cantidadInput.value) || 1 : 1;

const varianteSelect = document.querySelector(".detalle-variante, .detalle-variante-modal");

let variante = "";

if (varianteSelect) {
  if (varianteSelect.value === "") {
    swal("Selecciona una opción", "Debes elegir color, tamaño u otra variante antes de agregar al carrito.", "warning");
    return;
  }

  variante = varianteSelect.options[varianteSelect.selectedIndex].text;
}

      const imagenActiva = document.querySelector(".slick3 .slick-current img");
      const imagen = imagenActiva ? imagenActiva.getAttribute("src") : "";

      agregarAlCarrito(id, cantidad, variante, imagen);

      const producto = productos.find(p => String(p.id) === String(id));

      if (typeof swal !== "undefined" && producto) {
        swal(producto.nombre, "se agregó al carrito", "success");
      }
    }

    const btnSumar = e.target.closest(".btn-sumar-carrito");
    if (btnSumar) {
      e.preventDefault();

      const carrito = obtenerCarrito();
      const item = carrito.find(p =>
        String(p.id) === String(btnSumar.dataset.id) &&
        String(p.variante || "") === String(btnSumar.dataset.variante || "")
      );

      if (item) item.cantidad++;

      guardarCarrito(carrito);
      renderCarrito();
    }

    const btnRestar = e.target.closest(".btn-restar-carrito");
    if (btnRestar) {
      e.preventDefault();

      let carrito = obtenerCarrito();
      const item = carrito.find(p =>
        String(p.id) === String(btnRestar.dataset.id) &&
        String(p.variante || "") === String(btnRestar.dataset.variante || "")
      );

      if (item) {
        item.cantidad--;

        if (item.cantidad <= 0) {
          carrito = carrito.filter(p =>
            !(String(p.id) === String(btnRestar.dataset.id) &&
            String(p.variante || "") === String(btnRestar.dataset.variante || ""))
          );
        }
      }

      guardarCarrito(carrito);
      renderCarrito();
    }

    const btnEliminar = e.target.closest(".btn-eliminar-carrito");
    if (btnEliminar) {
      e.preventDefault();

      let carrito = obtenerCarrito();

      carrito = carrito.filter(p =>
        !(String(p.id) === String(btnEliminar.dataset.id) &&
        String(p.variante || "") === String(btnEliminar.dataset.variante || ""))
      );

      guardarCarrito(carrito);
      renderCarrito();
    }
  });

  renderCarrito();

document.addEventListener("click", function (e) {
  const btnMas = e.target.closest(".btn-num-product-up");
  const btnMenos = e.target.closest(".btn-num-product-down");

  if (btnMas) {
    e.preventDefault();

    const cajaCantidad = btnMas.closest(".wrap-num-product");
    const inputCantidad = cajaCantidad.querySelector(".num-product");

    inputCantidad.value = Number(inputCantidad.value || 1) + 1;
  }

  if (btnMenos) {
    e.preventDefault();

    const cajaCantidad = btnMenos.closest(".wrap-num-product");
    const inputCantidad = cajaCantidad.querySelector(".num-product");

    const cantidadActual = Number(inputCantidad.value || 1);

    if (cantidadActual > 1) {
      inputCantidad.value = cantidadActual - 1;
    }
  }
});

});