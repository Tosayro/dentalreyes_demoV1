document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector(".isotope-grid");
  const btnCargarMas = document.querySelector("#btn-cargar-mas");
  const inputBuscar = document.querySelector('input[name="search-product"]');

  if (!contenedor || typeof productos === "undefined") return;

  const categoriaPagina = "cepillos";
  const params = new URLSearchParams(window.location.search);
  const subcategoriaURL = params.get("subcategoria");

  let cantidadVisible = 8;
  const incremento = 8;

  let filtros = {
    subcategoria: "*",
    marca: "all",
    tag: "all",
    precioMin: 0,
    precioMax: 999999,
    ordenar: "default",
    busqueda: ""
  };

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .replaceAll("ñ", "n")
      .replaceAll("á", "a")
      .replaceAll("é", "e")
      .replaceAll("í", "i")
      .replaceAll("ó", "o")
      .replaceAll("ú", "u")
      .replaceAll(" ", "-");
  }

const productosPagina = productos.filter(producto => {
  return normalizar(producto.categoriaPrincipal) === normalizar(categoriaPagina);
});
console.log("CATEGORIA PAGINA:", categoriaPagina);
console.log("PRODUCTOS DE ESTA PAGINA:", productosPagina);

  if (subcategoriaURL) {
    filtros.subcategoria = subcategoriaURL;

    document.querySelectorAll(".filter-tope-group button").forEach(btn => {
      btn.classList.remove("how-active1");

      const filtroBtn = btn.getAttribute("data-filter");
      if (filtroBtn && filtroBtn.replace(".", "") === subcategoriaURL) {
        btn.classList.add("how-active1");
      }
    });
  }

  function crearTarjetaProducto(producto) {
  const clasesFiltro = [
    producto.subcategoria,
    ...(producto.tags || [])
  ].map(normalizar).join(" ");

    return `
      <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${clasesFiltro}">
        <div class="block2">
          <div class="block2-pic hov-img0">
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <a href="#" 
               class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-vista-rapida"
               data-id="${producto.id}">
              Vista rápida
            </a>
          </div>

          <div class="block2-txt flex-w flex-t p-t-14">
            <div class="block2-txt-child1 flex-col-l">
              <a href="product-detail.html?id=${producto.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                ${producto.nombre}
              </a>

              <span class="stext-105 cl3">
                S/ ${Number(producto.precio).toFixed(2)}
              </span>

              <span class="stext-107 cl6">
                ${producto.marca || ""}
              </span>
            </div>

            <div class="block2-txt-child2 flex-r p-t-3">
              <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2" data-id="${producto.id}">
                <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function obtenerProductosFiltrados() {
    let lista = productosPagina.filter(producto => {
      const precio = Number(producto.precio) || 0;
      const marca = normalizar(producto.marca);
      const subcategoria = normalizar(producto.subcategoria);
      const tags = (producto.tags || []).map(normalizar);
      const nombre = normalizar(producto.nombre);

      const cumpleSubcategoria =
        filtros.subcategoria === "*" || subcategoria === filtros.subcategoria;

      const cumpleMarca =
        filtros.marca === "all" || marca === filtros.marca;

      const cumpleTag =
        filtros.tag === "all" || tags.includes(filtros.tag);

      const cumplePrecio =
        precio >= filtros.precioMin && precio <= filtros.precioMax;

      const cumpleBusqueda =
        filtros.busqueda === "" ||
        nombre.includes(filtros.busqueda) ||
        marca.includes(filtros.busqueda) ||
        tags.some(tag => tag.includes(filtros.busqueda));

      return cumpleSubcategoria && cumpleMarca && cumpleTag && cumplePrecio && cumpleBusqueda;
    });

    if (filtros.ordenar === "price-asc") {
      lista.sort((a, b) => Number(a.precio) - Number(b.precio));
    }

    if (filtros.ordenar === "price-desc") {
      lista.sort((a, b) => Number(b.precio) - Number(a.precio));
    }

    if (filtros.ordenar === "name-asc") {
      lista.sort((a, b) => String(a.nombre).localeCompare(String(b.nombre)));
    }

    if (filtros.ordenar === "new") {
      lista = lista.slice().reverse();
    }

    return lista;
  }

  function renderProductos() {
    const productosFiltrados = obtenerProductosFiltrados();
    const productosMostrados = productosFiltrados.slice(0, cantidadVisible);

    contenedor.innerHTML = productosMostrados.map(crearTarjetaProducto).join("");

    if (productosMostrados.length === 0) {
      contenedor.innerHTML = `
        <div class="col-12 p-t-30 p-b-30">
          <p class="stext-106 cl6 txt-center">
            No se encontraron productos con estos filtros.
          </p>
        </div>
      `;
    }

    if (window.jQuery && $(".isotope-grid").length) {
      const $grid = $(".isotope-grid");

      if ($grid.data("isotope")) {
        $grid.isotope("destroy");
      }

$grid.isotope({
  itemSelector: ".isotope-item",
  layoutMode: "fitRows",
  percentPosition: true
});

/* Recalcular layout cuando carguen las imágenes */
contenedor.querySelectorAll("img").forEach(img => {
  img.onload = function () {
    $grid.isotope("layout");
  };
});
    }

    if (btnCargarMas) {
      btnCargarMas.style.display =
        cantidadVisible >= productosFiltrados.length ? "none" : "flex";
    }

    activarVistaRapida();
    activarWishlist();
  }

  function resetCantidadYRender() {
    cantidadVisible = 8;
    renderProductos();
  }

  document.querySelectorAll(".filter-tope-group button").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".filter-tope-group button").forEach(b => {
        b.classList.remove("how-active1");
      });

      this.classList.add("how-active1");

      const valor = this.getAttribute("data-filter");
      filtros.subcategoria = valor === "*" ? "*" : valor.replace(".", "");

      resetCantidadYRender();
    });
  });

  document.querySelectorAll(".js-sort").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".js-sort").forEach(a => a.classList.remove("filter-link-active"));
      this.classList.add("filter-link-active");

      filtros.ordenar = this.dataset.sort || "default";
      resetCantidadYRender();
    });
  });

  document.querySelectorAll(".js-price").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".js-price").forEach(a => a.classList.remove("filter-link-active"));
      this.classList.add("filter-link-active");

      filtros.precioMin = Number(this.dataset.min) || 0;
      filtros.precioMax = Number(this.dataset.max) || 999999;

      resetCantidadYRender();
    });
  });

  document.querySelectorAll(".js-brand").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".js-brand").forEach(a => a.classList.remove("filter-link-active"));
      this.classList.add("filter-link-active");

      filtros.marca = this.dataset.brand || "all";
      resetCantidadYRender();
    });
  });

  document.querySelectorAll(".js-tag").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".js-tag").forEach(a => a.classList.remove("filter-link-active"));
      this.classList.add("filter-link-active");

      filtros.tag = this.dataset.tag || "all";
      resetCantidadYRender();
    });
  });

  if (inputBuscar) {
    inputBuscar.addEventListener("input", function () {
      filtros.busqueda = normalizar(this.value);
      resetCantidadYRender();
    });
  }

  if (btnCargarMas) {
    btnCargarMas.addEventListener("click", function (e) {
      e.preventDefault();

      const posicionActual = window.scrollY;

      cantidadVisible += incremento;
      renderProductos();

      window.scrollTo({
        top: posicionActual,
        behavior: "auto"
      });
    });
  }

  /* =========================
     VISTA RÁPIDA / POPUP
  ========================= */

  function renderGaleriaModal(producto, imagenes) {
    const galeriaModal = document.querySelector(".wrap-modal1 .slick3.gallery-lb");
    if (!galeriaModal) return;

    const imgs = imagenes && imagenes.length ? imagenes : ["images/noimage.jpg"];

    galeriaModal.innerHTML = imgs.map(img => `
      <div class="item-slick3" data-thumb="${img}">
        <div class="wrap-pic-w pos-relative">
          <img src="${img}" alt="${producto.nombre}">
          <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${img}">
            <i class="fa fa-expand"></i>
          </a>
        </div>
      </div>
    `).join("");
  }

  function reiniciarSlickModal() {
    if (!window.jQuery || !$(".wrap-modal1 .slick3").length) return;

    const slider = $(".wrap-modal1 .slick3");

    if (slider.hasClass("slick-initialized")) {
      slider.slick("unslick");
    }

    $(".wrap-modal1 .wrap-slick3-dots").empty();
    $(".wrap-modal1 .wrap-slick3-arrows").empty();

    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      infinite: true,
      arrows: true,
      dots: true,
      appendArrows: $(".wrap-modal1 .wrap-slick3-arrows"),
      appendDots: $(".wrap-modal1 .wrap-slick3-dots"),
      prevArrow: '<button type="button" class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
      nextArrow: '<button type="button" class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
      dotsClass: "slick3-dots",
      customPaging: function (slick, index) {
        const thumb = $(slick.$slides[index]).data("thumb");
        return `<img src="${thumb}"><div class="slick3-dot-overlay"></div>`;
      }
    });

    $(".wrap-modal1 .prev-slick3").off("click").on("click", function (e) {
      e.preventDefault();
      slider.slick("slickPrev");
    });

    $(".wrap-modal1 .next-slick3").off("click").on("click", function (e) {
      e.preventDefault();
      slider.slick("slickNext");
    });

    $(".wrap-modal1 .gallery-lb").each(function () {
      if ($(this).data("magnificPopup")) {
        $(this).magnificPopup("destroy");
      }

      $(this).magnificPopup({
        delegate: "a",
        type: "image",
        gallery: {
          enabled: true
        },
        mainClass: "mfp-fade"
      });
    });
  }

  function renderVariantesModal(producto) {
    const contenedorOpciones = document.querySelector(".wrap-modal1 .p-t-33");
    if (!contenedorOpciones) return;

    const variantes = producto.variantes || [];
    let htmlVariantes = "";

    if (variantes.length > 0) {
      const tipo = variantes[0].tipo || "Opción";

      htmlVariantes = `
        <div class="flex-w flex-r-m p-b-10">
          <div class="size-203 flex-c-m respon6">
            ${tipo}
          </div>

          <div class="size-204 respon6-next">
            <div class="detalle-select-wrap">
              <select class="detalle-variante-modal">
                <option value="">Elige una opción</option>
                ${variantes.map((v, index) => `
                  <option value="${index}">${v.nombre}</option>
                `).join("")}
              </select>
            </div>
          </div>
        </div>
      `;
    }

    contenedorOpciones.innerHTML = `
      ${htmlVariantes}

      <div class="flex-w flex-r-m p-b-10">
        <div class="size-204 flex-w flex-m respon6-next">
          <div class="wrap-num-product flex-w m-r-20 m-tb-10">
            <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
              <i class="fs-16 zmdi zmdi-minus"></i>
            </div>

            <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1">

            <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
              <i class="fs-16 zmdi zmdi-plus"></i>
            </div>
          </div>

          <button 
            class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
            data-id="${producto.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;

    $(".detalle-variante-modal").off("change").on("change", function () {
      const variante = variantes[Number(this.value)];
      if (!variante || !variante.imagen) return;

      const slider = $(".wrap-modal1 .slick3");
      const imagenes = producto.imagenes || [];
      const indexImagen = imagenes.findIndex(img => img === variante.imagen);

      if (slider.length && slider.hasClass("slick-initialized") && indexImagen >= 0) {
        slider.slick("slickGoTo", indexImagen);
      }
    });
  }

  function abrirVistaRapida(idProducto) {
    const producto = productos.find(p => String(p.id) === String(idProducto));
    if (!producto) return;

    const modal = document.querySelector(".wrap-modal1");
    const nombre = document.querySelector(".wrap-modal1 .js-name-detail");
    const precio = document.querySelector(".wrap-modal1 .mtext-106.cl2");
    const descripcion = document.querySelector(".wrap-modal1 .stext-102.cl3.p-t-23");

    if (nombre) nombre.textContent = producto.nombre;
    if (precio) precio.textContent = `S/ ${Number(producto.precio).toFixed(2)}`;
    if (descripcion) {
      descripcion.innerHTML = producto.descripcionCorta || "Sin descripción disponible.";
    }

    renderGaleriaModal(producto, producto.imagenes);
    renderVariantesModal(producto);
    reiniciarSlickModal();

    if (modal) {
      modal.classList.add("show-modal1");
    }
  }

  function activarVistaRapida() {
    document.querySelectorAll(".js-vista-rapida").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        abrirVistaRapida(this.dataset.id);
      });
    });
  }

function activarWishlist() {
  document.querySelectorAll(".js-addwish-b2").forEach(btn => {
    btn.removeEventListener("click", handlerWishlist); // evitar duplicados
    btn.addEventListener("click", handlerWishlist);
  });
}

function handlerWishlist(e) {
  e.preventDefault();

  const id = this.dataset.id;

  if (window.agregarAWishlist) {
    window.agregarAWishlist(id);
  }

  this.classList.add("js-addedwish-b2");
}

// cerrar modal
document.querySelectorAll(".js-hide-modal1").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelector(".wrap-modal1")?.classList.remove("show-modal1");
  });
});

// 👇 PEGA ESTO AQUÍ
window.abrirVistaRapida = abrirVistaRapida;

// iniciar productos
renderProductos();

if (window.actualizarWishlist) {
  window.actualizarWishlist();
}
});