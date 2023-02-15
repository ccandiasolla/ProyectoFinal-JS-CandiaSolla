const categoriasURL = 'categorias.json';
const productosURL = 'productos.json';
const categoriasList = document.querySelector('ul');
const productosDiv = document.querySelector('#productos');

// Cargar categorías
categoriasList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const categoriaId = event.target.id;
    fetch(productosURL)
      .then(response => response.json())
      .then(data => {
        const productos = data.productos.filter(producto => producto.categoria.toString() === categoriaId);
        mostrarProductos(productos);
      })
      .catch(error => console.error(error));
  }
});

function cargarCategorias() {
  fetch(categoriasURL)
    .then(response => response.json())
    .then(data => {
      data.categorias.forEach(categoria => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = categoria.nombre;
        a.id = categoria.id.toString();
        li.appendChild(a);
        categoriasList.appendChild(li);
      });
    })
    .catch(error => console.error(error));
}

// Mostrar productos
function mostrarProductos(productos) {
  productosDiv.innerHTML = '';
  productos.forEach(producto => {
    const div = document.createElement('div');
    const nombre = document.createElement('p');
    nombre.textContent = producto.nombre;
    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;
    const stock = document.createElement('p');
    stock.textContent = `Stock: ${producto.stock}`;
    const boton = document.createElement('button');
    boton.textContent = 'Comprar';
    boton.addEventListener('click', () => comprarProducto(producto));
    div.appendChild(nombre);
    div.appendChild(precio);
    div.appendChild(stock);
    div.appendChild(boton);
    productosDiv.appendChild(div);
  });
}

// Comprar producto
function comprarProducto(producto) {
  if (producto.stock > 0) {
    producto.stock--;
    Toastify({
      text: `${producto.nombre} agregado al carrito.`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: '#4caf50',
      stopOnFocus: true,
    }).showToast();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `No hay más ${producto.nombre} en stock.`,
    });
  }
}

// Cargar categorías al inicio
cargarCategorias();

// Obtener los elementos del DOM necesarios
const productosDiv2 = document.getElementById("productos");
const carritoDiv = document.createElement("div");
const carritoIcono = document.createElement("i");
const carritoCantidad = document.createElement("span");

// Agregar el carrito al DOM
carritoIcono.classList.add("fa", "fa-shopping-cart");
carritoCantidad.classList.add("badge", "badge-light");
carritoDiv.classList.add("carrito");
carritoDiv.appendChild(carritoIcono);
carritoDiv.appendChild(carritoCantidad);
document.body.appendChild(carritoDiv2);

// Obtener los productos del Local Storage o inicializar el carrito vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar la cantidad de productos en el carrito
function mostrarCantidadCarrito() {
  carritoCantidad.textContent = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find((p) => p.id === producto.id);

  if (productoExistente) {
    // Si el producto ya está en el carrito, aumentar su cantidad
    productoExistente.cantidad++;
  } else {
    // Si el producto no está en el carrito, agregarlo con una cantidad de 1
    carrito.push({ ...producto, cantidad: 1 });
  }

  // Actualizar la cantidad de productos en el carrito y guardar el carrito en el Local Storage
  mostrarCantidadCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
  // Vaciar el div de productos
  productosDiv2.innerHTML = "";

  // Recorrer los productos y crear un elemento HTML para cada uno
  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv2.classList.add("producto");
    productoDiv2.innerHTML = `
      <img src="https://via.placeholder.com/150x150" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button class="agregar-al-carrito btn btn-primary">Agregar al carrito</button>
    `;

    // Agregar el evento click al botón "Agregar al carrito"
    const agregarAlCarritoBtn = productoDiv2.querySelector(".agregar-al-carrito");
    agregarAlCarritoBtn.addEventListener("click", () => agregarAlCarrito(producto));

    // Agregar el elemento HTML al div de productos
    productosDiv.appendChild(productoDiv2);
  });
}

// Función para filtrar los productos por categoría y mostrarlos en el DOM
function mostrarProductosPorCategoria(categoriaId) {
  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === categoriaId
  );
  mostrarProductos(productosFiltrados);
}

// Función para mostrar los productos por categoría al hacer click en un enlace de categoría
function agregarEventosClickCategorias(categorias) {
  categorias.forEach((categoria) => {
    const categoriaLink = document.getElementById(categoria.id);

    categoriaLink.addEventListener("click", () => {
      mostrarProductosPorCategoria(categoria.id);
    });
  });
}

// Inicializar la página
