document.addEventListener("DOMContentLoaded", function () {
  if (typeof productos === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");
  const producto = productos.find(p => String(p.id) === String(idProducto));

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

  if (!producto) {
    document.querySelector(".sec-product-detail .container").innerHTML = `
      <div class="p-t-50 p-b-50 txt-center">
        <h3 class="ltext-103 cl5">Producto no encontrado</h3>
        <p class="stext-102 cl6 p-t-20">El producto que buscas no existe.</p>
        <a href="pro-cepillos.html" class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 m-t-30" style="display:inline-flex;">
          Volver a productos
        </a>
      </div>
    `;
    return;
  }

  const nombre = document.querySelector(".js-name-detail");
  const precio = document.querySelector(".mtext-106.cl2");
  const galeria = document.querySelector(".slick3.gallery-lb");
  const infoLista = document.querySelector("#information ul");
  const skuBox = document.querySelector(".bg6.flex-c-m");
  const breadcrumb = document.querySelector(".bread-crumb");

  document.title = producto.nombre;

  if (nombre) nombre.textContent = producto.nombre;
  if (precio) precio.textContent = `S/ ${Number(producto.precio).toFixed(2)}`;
const descripcionCorta = document.querySelector(".col-md-6.col-lg-5 .stext-102.cl3");
const descripcionCompleta = document.querySelector("#description .stext-102.cl6");

if (descripcionCorta) {
  descripcionCorta.innerHTML = producto.descripcionCorta || "Sin descripción corta disponible.";
}

if (descripcionCompleta) {
  descripcionCompleta.innerHTML = producto.descripcion || "Sin descripción completa disponible.";
}
  if (breadcrumb) {
    const subcategoria = producto.subcategoria || "Productos";
    const subcategoriaURL = normalizar(subcategoria);

    breadcrumb.innerHTML = `
      <a href="index.html" class="stext-109 cl8 hov-cl1 trans-04">
        Inicio
        <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
      </a>

      <a href="pro-cepillos.html?subcategoria=${subcategoriaURL}" class="stext-109 cl8 hov-cl1 trans-04">
        ${subcategoria}
        <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
      </a>

      <span class="stext-109 cl4">
        ${producto.nombre}
      </span>
    `;
  }

  function renderGaleria(imagenes) {
    if (!galeria) return;

    const imgs = imagenes && imagenes.length ? imagenes : ["images/noimage.jpg"];

    galeria.innerHTML = imgs.map(img => `
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

  function renderInformacion() {
    if (!infoLista) return;

    const info = producto.informacion || {};

    infoLista.innerHTML = Object.entries(info).map(([clave, valor]) => `
      <li class="flex-w flex-t p-b-7">
        <span class="stext-102 cl3 size-205">${clave}</span>
        <span class="stext-102 cl6 size-206">${valor}</span>
      </li>
    `).join("");
  }

  function renderSku() {
    if (!skuBox) return;

    skuBox.innerHTML = `
      <span class="stext-107 cl6 p-lr-25">
        Código: ${producto.codigo || producto.id}
      </span>

      <span class="stext-107 cl6 p-lr-25">
        Categoría: ${producto.categoriaPrincipal || ""}
      </span>

      <span class="stext-107 cl6 p-lr-25">
        Marca: ${producto.marca || ""}
      </span>
    `;
  }

  function renderVariantes() {
    const contenedorOpciones = document.querySelector(".p-t-33");
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
              <select class="detalle-variante">
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

          <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;

    $(".btn-num-product-down").off("click").on("click", function () {
      const input = $(this).next();
      const valor = Number(input.val());
      if (valor > 1) input.val(valor - 1);
    });

    $(".btn-num-product-up").off("click").on("click", function () {
      const input = $(this).prev();
      input.val(Number(input.val()) + 1);
    });

    const selectVariante = document.querySelector(".detalle-variante");

    if (selectVariante) {
      $(".detalle-variante").off("change").on("change", function () {
        const variante = variantes[Number(this.value)];
        if (!variante || !variante.imagen) return;

        const slider = $(".slick3");
        const imagenes = producto.imagenes || [];
        const indexImagen = imagenes.findIndex(img => img === variante.imagen);

        if (slider.length && slider.hasClass("slick-initialized") && indexImagen >= 0) {
          slider.slick("slickGoTo", indexImagen);
        }
      });
    }
  }

  function reiniciarSlick() {
    if (!window.jQuery || !$(".slick3").length) return;

    const slider = $(".slick3");

    if (slider.hasClass("slick-initialized")) {
      slider.slick("unslick");
    }

    $(".wrap-slick3-dots").empty();
    $(".wrap-slick3-arrows").empty();

    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      infinite: true,
      arrows: true,
      dots: true,
      appendArrows: $(".wrap-slick3-arrows"),
      appendDots: $(".wrap-slick3-dots"),
      prevArrow: '<button type="button" class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
      nextArrow: '<button type="button" class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
      dotsClass: "slick3-dots",
      customPaging: function (slick, index) {
        const thumb = $(slick.$slides[index]).data("thumb");
        return `<img src="${thumb}"><div class="slick3-dot-overlay"></div>`;
      }
    });

    $(".prev-slick3").off("click").on("click", function (e) {
      e.preventDefault();
      slider.slick("slickPrev");
    });

    $(".next-slick3").off("click").on("click", function (e) {
      e.preventDefault();
      slider.slick("slickNext");
    });

    $(".gallery-lb").each(function () {
      if ($(this).data("magnificPopup")) {
        $(this).magnificPopup("destroy");
      }

      $(this).magnificPopup({
        delegate: "a",
        type: "image",
        gallery: { enabled: true },
        mainClass: "mfp-fade"
      });
    });
  }

  function renderProductosRelacionados(productoActual) {
    const contenedor = document.querySelector("#productos-relacionados");
    if (!contenedor || !productoActual) return;

    const tagsActual = productoActual.tags || [];

    const relacionados = productos
      .filter(p => String(p.id) !== String(productoActual.id))
      .filter(p => {
        const mismaCategoria = p.categoriaPrincipal === productoActual.categoriaPrincipal;
        const mismaSubcategoria = p.subcategoria === productoActual.subcategoria;
        const comparteTags = (p.tags || []).some(tag => tagsActual.includes(tag));

        return mismaCategoria || mismaSubcategoria || comparteTags;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    contenedor.innerHTML = relacionados.map(p => `
      <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
        <div class="block2">
          <div class="block2-pic hov-img0">
            <img src="${p.imagen}" alt="${p.nombre}">

            <a href="product-detail.html?id=${p.id}" 
               class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04">
              Ver producto
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
            </div>

            <div class="block2-txt-child2 flex-r p-t-3">
              <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    if (window.jQuery && $(".slick2").length) {
      if ($(".slick2").hasClass("slick-initialized")) {
        $(".slick2").slick("unslick");
      }

      $(".slick2").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        autoplay: false,
        arrows: true,
        appendArrows: $(".wrap-slick2"),
        prevArrow: '<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
      });
    }
  }

  renderGaleria(producto.imagenes);
  renderInformacion();
  renderSku();
  renderVariantes();
  reiniciarSlick();
  renderProductosRelacionados(producto);
});