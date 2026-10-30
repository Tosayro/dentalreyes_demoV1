const productos = [
  {
    id: 1,
    codigo: "PRB-001",
    nombre: "Cepillo Curaprox Adulto Ultra Soft",
    precio: 28.90,
    imagen: "images/gallery-01.jpg",
    imagenes: ["images/gallery-01.jpg", "images/gallery-02.jpg", "images/gallery-03.jpg"],
    categoria: "adultos",
    categoriaPrincipal: "cepillos",
    subcategoria: "adultos",
    marca: "Curaprox",
    stock: 20,
    tags: ["suave", "encias", "uso-diario"],
    descripcionCorta: "Cepillo ultra suave para limpieza diaria, ideal para encías sensibles y uso frecuente.",
    descripcion: `
      <p>El Cepillo Curaprox Adulto Ultra Soft está pensado para una limpieza diaria delicada y efectiva. Sus filamentos suaves ayudan a limpiar la superficie dental sin maltratar las encías.</p>
      <ul>
        <li>Ideal para encías sensibles</li>
        <li>Cerdas ultra suaves</li>
        <li>Buena opción para uso diario</li>
        <li>Diseño cómodo y ligero</li>
      </ul>
    `,
    informacion: {
      Marca: "Curaprox",
      Categoría: "Cepillos",
      Subcategoría: "Adultos",
      Stock: "Disponible"
    },
    variantes: [
      { tipo: "Color", nombre: "Azul", imagen: "images/gallery-01.jpg" },
      { tipo: "Color", nombre: "Rojo", imagen: "images/gallery-02.jpg" },
      { tipo: "Color", nombre: "Verde", imagen: "images/gallery-03.jpg" }
    ]
  },

  {
    id: 2,
    codigo: "PRB-002",
    nombre: "Cepillo Oral-B Niños",
    precio: 14.90,
    imagen: "images/gallery-04.jpg",
    imagenes: ["images/gallery-04.jpg", "images/gallery-05.jpg"],
    categoria: "ninos",
    categoriaPrincipal: "cepillos",
    subcategoria: "ninos",
    marca: "Oral-B",
    stock: 15,
    tags: ["infantil", "suave"],
    descripcionCorta: "Cepillo infantil con cabezal pequeño y cerdas suaves para una limpieza segura en niños.",
    descripcion: `
      <p>El Cepillo Oral-B Niños está diseñado para bocas pequeñas y encías delicadas. Su cabezal compacto facilita el cepillado y sus cerdas suaves ayudan a limpiar sin causar molestias.</p>
      <ul>
        <li>Recomendado para niños</li>
        <li>Cabezal pequeño</li>
        <li>Cerdas suaves</li>
        <li>Diseño cómodo y llamativo</li>
      </ul>
    `,
    informacion: {
      Marca: "Oral-B",
      Categoría: "Cepillos",
      Subcategoría: "Niños",
      Edad: "3 años a más"
    },
    variantes: [
      { tipo: "Color", nombre: "Celeste", imagen: "images/gallery-04.jpg" },
      { tipo: "Color", nombre: "Rosado", imagen: "images/gallery-05.jpg" }
    ]
  },

  {
    id: 3,
    codigo: "PRB-003",
    nombre: "Cepillo Vitis Ortodoncia",
    precio: 18.90,
    imagen: "images/gallery-06.jpg",
    imagenes: ["images/gallery-06.jpg", "images/gallery-07.jpg", "images/gallery-08.jpg"],
    categoria: "ortodoncia",
    categoriaPrincipal: "cepillos",
    subcategoria: "ortodoncia",
    marca: "Vitis",
    stock: 12,
    tags: ["ortodoncia", "brackets"],
    descripcionCorta: "Cepillo para ortodoncia con diseño especial para limpiar brackets, dientes y encías.",
    descripcion: `
      <p>El Cepillo Vitis Ortodoncia está diseñado para personas con brackets. Su estructura permite limpiar alrededor de la aparatología, ayudando a remover residuos en zonas difíciles.</p>
      <ul>
        <li>Ideal para brackets</li>
        <li>Cerdas con corte especial</li>
        <li>Ayuda a limpiar dientes y aparatología</li>
        <li>Mango cómodo para mejor control</li>
      </ul>
    `,
    informacion: {
      Marca: "Vitis",
      Categoría: "Cepillos",
      Subcategoría: "Ortodoncia",
      Uso: "Brackets"
    },
    variantes: [
      { tipo: "Color", nombre: "Azul", imagen: "images/gallery-06.jpg" },
      { tipo: "Color", nombre: "Morado", imagen: "images/gallery-07.jpg" },
      { tipo: "Color", nombre: "Naranja", imagen: "images/gallery-08.jpg" }
    ]
  },

  {
    id: 4,
    codigo: "PRB-004",
    nombre: "Cepillo Colgate Adulto Medio",
    precio: 11.90,
    imagen: "images/gallery-09.jpg",
    imagenes: ["images/gallery-09.jpg", "images/gallery-01.jpg"],
    categoria: "adultos",
    categoriaPrincipal: "cepillos",
    subcategoria: "adultos",
    marca: "Colgate",
    stock: 30,
    tags: ["uso-diario"],
    descripcionCorta: "Cepillo adulto de uso diario con cerdas medias para limpieza general.",
    descripcion: `
      <p>El Cepillo Colgate Adulto Medio es una opción práctica para la higiene diaria. Sus cerdas de dureza media ayudan a limpiar dientes y encías en una rutina de cepillado regular.</p>
      <ul>
        <li>Uso diario</li>
        <li>Cerdas medias</li>
        <li>Limpieza general</li>
        <li>Diseño simple y funcional</li>
      </ul>
    `,
    informacion: {
      Marca: "Colgate",
      Categoría: "Cepillos",
      Subcategoría: "Adultos",
      Tipo: "Medio"
    },
    variantes: [
      { tipo: "Color", nombre: "Blanco", imagen: "images/gallery-09.jpg" },
      { tipo: "Color", nombre: "Azul", imagen: "images/gallery-01.jpg" }
    ]
  },

  {
    id: 5,
    codigo: "PRB-005",
    nombre: "Cepillo Bebé Suave",
    precio: 12.90,
    imagen: "images/gallery-02.jpg",
    imagenes: ["images/gallery-02.jpg", "images/gallery-03.jpg"],
    categoria: "bebes",
    categoriaPrincipal: "cepillos",
    subcategoria: "bebes",
    marca: "Vitis",
    stock: 10,
    tags: ["infantil", "suave"],
    descripcionCorta: "Cepillo suave para bebés, pensado para los primeros dientes y encías delicadas.",
    descripcion: `
      <p>El Cepillo Bebé Suave está pensado para acompañar la higiene oral desde los primeros dientes. Su cabezal pequeño y cerdas delicadas permiten una limpieza controlada y cómoda.</p>
      <ul>
        <li>Para bebés y primeros dientes</li>
        <li>Cerdas extra suaves</li>
        <li>Cabezal pequeño</li>
        <li>Mango cómodo para el adulto</li>
      </ul>
    `,
    informacion: {
      Marca: "Vitis",
      Categoría: "Cepillos",
      Subcategoría: "Bebés",
      Edad: "0 a 2 años"
    },
    variantes: [
      { tipo: "Color", nombre: "Rosado", imagen: "images/gallery-02.jpg" },
      { tipo: "Color", nombre: "Celeste", imagen: "images/gallery-03.jpg" }
    ]
  },

  {
    id: 6,
    codigo: "PRB-006",
    nombre: "Cepillo Eléctrico Básico",
    precio: 89.90,
    imagen: "images/gallery-03.jpg",
    imagenes: ["images/gallery-03.jpg", "images/gallery-04.jpg", "images/gallery-05.jpg"],
    categoria: "electricos",
    categoriaPrincipal: "cepillos",
    subcategoria: "electricos",
    marca: "Oral-B",
    stock: 8,
    tags: ["electrico", "tecnologia"],
    descripcionCorta: "Cepillo eléctrico básico para mejorar la limpieza diaria con movimiento automático.",
    descripcion: `
      <p>El Cepillo Eléctrico Básico ayuda a mejorar la rutina de higiene oral gracias a su movimiento automático. Es una opción práctica para quienes buscan una limpieza más constante y fácil de realizar.</p>
      <ul>
        <li>Movimiento automático</li>
        <li>Fácil de usar</li>
        <li>Ideal para uso diario</li>
        <li>Buena opción de inicio en cepillos eléctricos</li>
      </ul>
    `,
    informacion: {
      Marca: "Oral-B",
      Categoría: "Cepillos",
      Subcategoría: "Eléctricos",
      Tipo: "Recargable"
    },
    variantes: [
      { tipo: "Color", nombre: "Negro", imagen: "images/gallery-03.jpg" },
      { tipo: "Color", nombre: "Blanco", imagen: "images/gallery-04.jpg" }
    ]
  },

  {
    id: 7,
    codigo: "PRB-007",
    nombre: "Cepillo Interproximal Pack",
    precio: 22.90,
    imagen: "images/gallery-05.jpg",
    imagenes: ["images/gallery-05.jpg", "images/gallery-06.jpg"],
    categoria: "interproximales",
    categoriaPrincipal: "cepillos",
    subcategoria: "interproximales",
    marca: "Dentaid",
    stock: 18,
    tags: ["interproximal", "limpieza"],
    descripcionCorta: "Pack de cepillos interproximales para limpiar espacios entre dientes.",
    descripcion: `
      <p>El Cepillo Interproximal Pack está diseñado para remover placa y restos de comida en los espacios interdentales. Es útil para complementar el cepillado tradicional.</p>
      <ul>
        <li>Limpieza entre dientes</li>
        <li>Ideal para espacios interdentales</li>
        <li>Complementa el cepillado diario</li>
        <li>Disponible en diferentes tamaños</li>
      </ul>
    `,
    informacion: {
      Marca: "Dentaid",
      Categoría: "Cepillos",
      Subcategoría: "Interproximales",
      Presentación: "Pack"
    },
    variantes: [
      { tipo: "Tamaño", nombre: "Pequeño", imagen: "images/gallery-05.jpg" },
      { tipo: "Tamaño", nombre: "Mediano", imagen: "images/gallery-06.jpg" }
    ]
  },

  {
    id: 8,
    codigo: "PRB-008",
    nombre: "Cepillo Especial Encías",
    precio: 16.90,
    imagen: "images/gallery-07.jpg",
    imagenes: ["images/gallery-07.jpg", "images/gallery-08.jpg"],
    categoria: "especializados",
    categoriaPrincipal: "cepillos",
    subcategoria: "especializados",
    marca: "Curaprox",
    stock: 14,
    tags: ["encias", "suave"],
    descripcionCorta: "Cepillo especializado para encías sensibles, con cerdas suaves y limpieza delicada.",
    descripcion: `
      <p>El Cepillo Especial Encías está pensado para personas con sensibilidad gingival o que prefieren una limpieza más delicada. Sus cerdas suaves ayudan a reducir la agresión durante el cepillado.</p>
      <ul>
        <li>Para encías sensibles</li>
        <li>Cerdas extra suaves</li>
        <li>Limpieza delicada</li>
        <li>Recomendado para uso diario cuidadoso</li>
      </ul>
    `,
    informacion: {
      Marca: "Curaprox",
      Categoría: "Cepillos",
      Subcategoría: "Especializados",
      Uso: "Encías sensibles"
    },
    variantes: []
  },

  {
    id: 9,
    codigo: "PRB-009",
    nombre: "Cepillo Adolescente Soft",
    precio: 13.90,
    imagen: "images/gallery-08.jpg",
    imagenes: ["images/gallery-08.jpg", "images/gallery-09.jpg"],
    categoria: "adolescentes",
    categoriaPrincipal: "cepillos",
    subcategoria: "adolescentes",
    marca: "Colgate",
    stock: 22,
    tags: ["suave", "uso-diario"],
    descripcionCorta: "Cepillo suave para adolescentes, cómodo para higiene diaria.",
    descripcion: `
      <p>El Cepillo Adolescente Soft está diseñado para una etapa de transición entre cepillos infantiles y adultos. Su cabezal mediano y cerdas suaves ayudan a mantener una limpieza cómoda todos los días.</p>
      <ul>
        <li>Para adolescentes</li>
        <li>Cerdas suaves</li>
        <li>Cabezal mediano</li>
        <li>Diseño juvenil y práctico</li>
      </ul>
    `,
    informacion: {
      Marca: "Colgate",
      Categoría: "Cepillos",
      Subcategoría: "Adolescentes",
      Edad: "12 años a más"
    },
    variantes: [
      { tipo: "Color", nombre: "Verde", imagen: "images/gallery-08.jpg" },
      { tipo: "Color", nombre: "Azul", imagen: "images/gallery-09.jpg" }
    ]
  },

  {
    id: 10,
    codigo: "PRB-010",
    nombre: "Cabezal Ortho Repuesto",
    precio: 24.90,
    imagen: "images/gallery-01.jpg",
    imagenes: ["images/gallery-01.jpg", "images/gallery-04.jpg"],
    categoria: "pastas",
    categoriaPrincipal: "pastas",
    subcategoria: "pastas",
    marca: "Curaprox",
    stock: 9,
    tags: ["repuesto", "brackets"],
    descripcionCorta: "Cabezal de repuesto para limpieza en pacientes con ortodoncia.",
    descripcion: `
      <p>El Cabezal Ortho Repuesto está pensado para mantener una limpieza adecuada en personas con brackets. Permite reemplazar el cabezal cuando las cerdas pierden firmeza o se desgastan.</p>
      <ul>
        <li>Repuesto para ortodoncia</li>
        <li>Ideal para brackets</li>
        <li>Ayuda a limpiar zonas difíciles</li>
        <li>Fácil de reemplazar</li>
      </ul>
    `,
    informacion: {
      Marca: "Curaprox",
      Categoría: "pastas",
      Subcategoría: "pastas",
      Tipo: "Repuesto"
    },
    variantes: [
      { tipo: "Color", nombre: "Azul", imagen: "images/gallery-01.jpg" },
      { tipo: "Color", nombre: "Negro", imagen: "images/gallery-04.jpg" }
    ]
  }
];