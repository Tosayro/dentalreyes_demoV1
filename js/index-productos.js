document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector("#productos-index");
  const btnCargarMas = document.querySelector("#btn-cargar-mas-index");
  const inputBuscar = document.querySelector("#buscar-index");

  if (!contenedor || typeof productos === "undefined") return;

  let cantidadVisible = 8;
  const incremento = 8;
  let categoriaActiva = "all";
  let busqueda = "";

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .replaceAll("ñ", "n")
      .replaceAll("á", "a")
      .replaceAll("é", "e")
      .replaceAll("í", "i")
      .replaceAll("ó", "o")
      .replaceAll("ú", "u")
      .trim();
  }

  function mezclarArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const productosRandom = mezclarArray(productos);

  function crearProductoHTML(p) {
    return `
      <div class="col-sm-6 col-md-4 col-lg-3 p-b-35">
        <div class="block2">
          <div class="block2-pic hov-img0">
            <img src="${p.imagen}" alt="${p.nombre}">

            <a href="#"
               class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-vista-rapida-index"
               data-id="${p.id}">
              Vista rápida
            </a>
          </div>

          <div class="block2-txt flex-w flex-t p-t-14">
            <div class="block2-txt-child1 flex-col-l">
              <a href="product-detail.html?id=${p.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                ${p.nombre}
              </a>

              <span class="stext-105 cl3">
                S/ ${Number(p.precio).toFixed(2)}
              </span>

              <span class="stext-107 cl6">
                ${p.marca || ""}
              </span>
            </div>

            <div class="block2-txt-child2 flex-r p-t-3">
              <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2" data-id="${p.id}">
                <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function obtenerFiltrados() {
    return productosRandom.filter(p => {
      const categoria = normalizar(p.categoriaPrincipal);
      const nombre = normalizar(p.nombre);
      const marca = normalizar(p.marca);
      const tags = (p.tags || []).map(normalizar);

      const cumpleCategoria =
        categoriaActiva === "all" || categoria === categoriaActiva;

      const cumpleBusqueda =
        busqueda === "" ||
        nombre.includes(busqueda) ||
        marca.includes(busqueda) ||
        tags.some(tag => tag.includes(busqueda));

      return cumpleCategoria && cumpleBusqueda;
    });
  }

  function render() {
    const filtrados = obtenerFiltrados();
    const visibles = filtrados.slice(0, cantidadVisible);

    contenedor.innerHTML = visibles.map(crearProductoHTML).join("");

    if (visibles.length === 0) {
      contenedor.innerHTML = `
        <div class="col-12 p-t-30 p-b-30">
          <p class="stext-106 cl6 txt-center">
            No se encontraron productos.
          </p>
        </div>
      `;
    }

    if (btnCargarMas) {
      btnCargarMas.style.display =
        cantidadVisible >= filtrados.length ? "none" : "flex";
    }

    activarVistaRapidaIndex();
    activarWishlistIndex();

    if (window.actualizarWishlist) {
      window.actualizarWishlist();
    }
  }

  function abrirVistaRapidaIndex(idProducto) {
    const producto = productos.find(p => String(p.id) === String(idProducto));
    if (!producto) return;

    const modal = document.querySelector(".wrap-modal1");
    const nombre = document.querySelector(".wrap-modal1 .js-name-detail");
    const precio = document.querySelector(".wrap-modal1 .mtext-106.cl2");
    const descripcion = document.querySelector(".wrap-modal1 .stext-102.cl3.p-t-23");
    const galeria = document.querySelector(".wrap-modal1 .slick3.gallery-lb");
    const opciones = document.querySelector(".wrap-modal1 .p-t-33");

    if (nombre) nombre.textContent = producto.nombre;
    if (precio) precio.textContent = `S/ ${Number(producto.precio).toFixed(2)}`;
    if (descripcion) descripcion.innerHTML = producto.descripcionCorta || "Sin descripción disponible.";

    const imagenes = producto.imagenes && producto.imagenes.length ? producto.imagenes : [producto.imagen];

    if (galeria) {
      galeria.innerHTML = imagenes.map(img => `
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

    let htmlVariantes = "";

    if (producto.variantes && producto.variantes.length > 0) {
      const tipo = producto.variantes[0].tipo || "Opción";

      htmlVariantes = `
        <div class="flex-w flex-r-m p-b-10">
          <div class="size-203 flex-c-m respon6">
            ${tipo}
          </div>

          <div class="size-204 respon6-next">
            <div class="rs1-select2 bor8 bg0">
              <select class="js-select2 detalle-variante-modal" name="time">
                <option value="">Elige una opción</option>
                ${producto.variantes.map((v, index) => `
                  <option value="${index}">${v.nombre}</option>
                `).join("")}
              </select>
              <div class="dropDownSelect2"></div>
            </div>
          </div>
        </div>
      `;
    }

    if (opciones) {
      opciones.innerHTML = `
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
    }

    if (window.jQuery && $(".wrap-modal1 .slick3").length) {
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
        prevArrow: '<button type="button" class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="arrow-slick3 next-slick3"><i class="fa fa-angle-right"></i></button>',
        dotsClass: "slick3-dots",
        customPaging: function (slick, index) {
          const thumb = $(slick.$slides[index]).data("thumb");
          return `<img src="${thumb}"><div class="slick3-dot-overlay"></div>`;
        }
      });

      $(".wrap-modal1 .gallery-lb").magnificPopup({
        delegate: "a",
        type: "image",
        gallery: { enabled: true },
        mainClass: "mfp-fade"
      });
    }

if (window.jQuery && $(".wrap-modal1 .detalle-variante-modal").length) {
  const $selectVariante = $(".wrap-modal1 .detalle-variante-modal");

  $selectVariante.select2({
    minimumResultsForSearch: 20,
    dropdownParent: $selectVariante.closest(".rs1-select2")
  });

$selectVariante.off("select2:select").on("select2:select", function (e) {
  const valor = e.params.data.id;
  const variante = producto.variantes[Number(valor)];

  if (!variante || !variante.imagen) return;

  const indexImagen = imagenes.findIndex(img => img === variante.imagen);
  const slider = $(".wrap-modal1 .slick3");

  if (slider.length && slider.hasClass("slick-initialized") && indexImagen >= 0) {
    slider.slick("slickGoTo", indexImagen);
  }
});
}

    if (modal) {
      modal.classList.add("show-modal1");
    }
  }

  function activarVistaRapidaIndex() {
    document.querySelectorAll(".js-vista-rapida-index").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        abrirVistaRapidaIndex(this.dataset.id);
      });
    });
  }

  function activarWishlistIndex() {
    document.querySelectorAll(".js-addwish-b2").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const id = this.dataset.id;

        if (window.agregarAWishlist) {
          window.agregarAWishlist(id);
        }

        this.classList.add("js-addedwish-b2");
      });
    });
  }

  document.querySelectorAll(".js-hide-modal1").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelector(".wrap-modal1")?.classList.remove("show-modal1");
    });
  });

  document.querySelectorAll("[data-categoria]").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll("[data-categoria]").forEach(b =>
        b.classList.remove("how-active1")
      );

      this.classList.add("how-active1");

      categoriaActiva = normalizar(this.dataset.categoria);
      cantidadVisible = 8;
      render();
    });
  });

  if (inputBuscar) {
    inputBuscar.addEventListener("input", function () {
      busqueda = normalizar(this.value);
      cantidadVisible = 8;
      render();
    });
  }

btnCargarMas.addEventListener("click", function (e) {
  e.preventDefault();

  const scrollAntes = window.scrollY;

  const filtrados = obtenerFiltrados();
  const nuevos = filtrados.slice(cantidadVisible, cantidadVisible + incremento);

  contenedor.insertAdjacentHTML(
    "beforeend",
    nuevos.map(crearProductoHTML).join("")
  );

  cantidadVisible += incremento;

  activarVistaRapidaIndex();
  activarWishlistIndex();

  if (window.actualizarWishlist) {
    window.actualizarWishlist();
  }

  if (cantidadVisible >= filtrados.length) {
    btnCargarMas.style.display = "none";
  }

  // 🔥 CLAVE: restaurar scroll exacto
  window.scrollTo(0, scrollAntes);
});

  render();
});