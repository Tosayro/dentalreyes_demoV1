document.addEventListener("DOMContentLoaded", function () {
  const WISHLIST_KEY = "listaDeseos";

  function obtenerWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  }

  function guardarWishlist(lista) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(lista));
  }

  function actualizarContadorWishlist() {
    const lista = obtenerWishlist();

    document.querySelectorAll(".js-show-wishlist").forEach(boton => {
      boton.setAttribute("data-notify", lista.length);
    });
  }

  function normalizarTexto(texto) {
    return String(texto || "").trim();
  }

  function obtenerProductoDesdeBoton(boton) {
    const card = boton.closest(".block2");
    const modal = boton.closest(".wrap-modal1");

    let nombre = "";
    let precio = "";
    let imagen = "";
    let id = "";

    if (card) {
      const linkNombre = card.querySelector(".js-name-b2");
      const precioTexto = card.querySelector(".stext-105");
      const img = card.querySelector(".block2-pic img");

      nombre = linkNombre ? normalizarTexto(linkNombre.textContent) : "";
      precio = precioTexto ? normalizarTexto(precioTexto.textContent) : "";
      imagen = img ? img.getAttribute("src") : "";

      if (linkNombre && linkNombre.href.includes("id=")) {
        const url = new URL(linkNombre.href);
        id = url.searchParams.get("id");
      }
    }

    if (modal) {
      const nombreModal = modal.querySelector(".js-name-detail");
      const precioModal = modal.querySelector(".mtext-106");
      const imgModal = modal.querySelector(".slick3 img");

      nombre = nombreModal ? normalizarTexto(nombreModal.textContent) : nombre;
      precio = precioModal ? normalizarTexto(precioModal.textContent) : precio;
      imagen = imgModal ? imgModal.getAttribute("src") : imagen;

      const idModal = modal.getAttribute("data-producto-id");
      if (idModal) id = idModal;
    }

    if (!id) {
      id = nombre.toLowerCase().replace(/\s+/g, "-");
    }

    return { id, nombre, precio, imagen };
  }

  function marcarCorazonesActivos() {
    const lista = obtenerWishlist();

    document.querySelectorAll(".js-addwish-b2, .js-addwish-detail").forEach(boton => {
      const producto = obtenerProductoDesdeBoton(boton);
      const existe = lista.some(item => String(item.id) === String(producto.id));

      boton.classList.toggle("js-addedwish-b2", existe);
      boton.classList.toggle("js-addedwish-detail", existe);
    });
  }

  function renderWishlistPanel() {
    const contenedor = document.querySelector("#lista-wishlist");
    if (!contenedor) return;

    const lista = obtenerWishlist();

    if (lista.length === 0) {
      contenedor.innerHTML = `
        <li class="p-t-20 p-b-20">
          <p class="stext-102 cl6">Tu lista de deseos está vacía.</p>
        </li>
      `;
      return;
    }

    contenedor.innerHTML = lista.map(item => `
      <li class="header-cart-item flex-w flex-t m-b-18">
        <div class="header-cart-item-img">
          <img src="${item.imagen || "images/noimage.jpg"}" alt="${item.nombre}">
        </div>

        <div class="header-cart-item-txt p-t-8">
          <a href="product-detail.html?id=${item.id}" class="header-cart-item-name m-b-8 hov-cl1 trans-04">
            ${item.nombre}
          </a>

          <span class="header-cart-item-info">
            ${item.precio}
          </span>

          <div class="p-t-8 flex-w">
            <a href="product-detail.html?id=${item.id}" class="stext-111 cl8 hov-cl1 m-r-15">
              Ver producto
            </a>


            <a href="#" class="stext-111 cl8 hov-cl1 js-remove-wishlist" data-id="${item.id}">
              <i class="fa fa-trash"></i>
            </a>
          </div>
        </div>
      </li>
    `).join("");
  }

  function abrirWishlist() {
    renderWishlistPanel();
    document.querySelector(".js-panel-wishlist")?.classList.add("show-header-cart");
  }

  function cerrarWishlist() {
    document.querySelector(".js-panel-wishlist")?.classList.remove("show-header-cart");
  }

  document.addEventListener("click", function (e) {
    const botonWishlist = e.target.closest(".js-show-wishlist");
    if (botonWishlist) {
      e.preventDefault();
      abrirWishlist();
      return;
    }

    const cerrar = e.target.closest(".js-hide-wishlist");
    if (cerrar) {
      e.preventDefault();
      cerrarWishlist();
      return;
    }

    const eliminar = e.target.closest(".js-remove-wishlist");
    if (eliminar) {
      e.preventDefault();

      const id = eliminar.dataset.id;
      let lista = obtenerWishlist();

      lista = lista.filter(item => String(item.id) !== String(id));

      guardarWishlist(lista);
      actualizarContadorWishlist();
      marcarCorazonesActivos();
      renderWishlistPanel();
      return;
    }

    const boton = e.target.closest(".js-addwish-b2, .js-addwish-detail");
    if (!boton) return;

    e.preventDefault();

    const producto = obtenerProductoDesdeBoton(boton);
    if (!producto.nombre) return;

    let lista = obtenerWishlist();
    const existe = lista.some(item => String(item.id) === String(producto.id));

    if (existe) {
      lista = lista.filter(item => String(item.id) !== String(producto.id));
      if (typeof swal === "function") {
        swal(producto.nombre, "se quitó de tu lista de deseos.", "info");
      }
    } else {
      lista.push(producto);
      if (typeof swal === "function") {
        swal(producto.nombre, "se agregó a tu lista de deseos.", "success");
      }
    }

    guardarWishlist(lista);
    actualizarContadorWishlist();
    marcarCorazonesActivos();
    renderWishlistPanel();
  });

  actualizarContadorWishlist();

  setTimeout(function () {
    marcarCorazonesActivos();
    renderWishlistPanel();
  }, 500);

  window.actualizarWishlist = function () {
    actualizarContadorWishlist();
    marcarCorazonesActivos();
    renderWishlistPanel();
  };
});