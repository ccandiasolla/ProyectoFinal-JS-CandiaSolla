// Cargar categorías
const categoriasURL = "categorias.json";

fetch(categoriasURL)
    .then(response => response.json())
    .then(data => {
        const categorias = data.categorias;
        const categoriasLista = document.createElement("ul");
        categoriasLista.classList.add("categorias-lista");
        categorias.forEach(categoria => {
            const categoriaLink = document.createElement("a");
            categoriaLink.href = "#";
            categoriaLink.textContent = categoria.nombre;
            categoriaLink.addEventListener("click", () => cargarProductos(categoria.id));
            const categoriaItem = document.createElement("li");
            categoriaItem.appendChild(categoriaLink);
            categoriasLista.appendChild(categoriaItem);
        });
        document.body.insertBefore(categoriasLista, document.getElementById("productos"));
    });

// Cargar productos de la categoría seleccionada
function cargarProductos(categoriaID) {
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      const productos = data.productos.filter(producto => producto.categoria === categoriaID);
      const productosHTML = productos.map(producto => `
        <div class="card col-md-3">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <a href="#" class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</a>
          </div>
        </div>
      `).join('');
      document.getElementById('productos').innerHTML = productosHTML;
    })
    .catch(error => console.log(error));
}

function agregarAlCarrito(productoID) {
  const carrito = obtenerCarrito();
  const productoEnCarrito = carrito.find(producto => producto.id === productoID);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({id: productoID, cantidad: 1});
  }
  guardarCarrito(carrito);
  actualizarCarrito();
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}

function actualizarCarrito() {
  const carrito = obtenerCarrito();
  const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  document.getElementById('total-carrito').textContent = totalProductos;
}

function obtenerCarrito() {
  const carritoString = localStorage.getItem('carrito');
  if (carritoString) {
    return JSON.parse(carritoString);
  } else {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('categorias.json')
    .then(response => response.json())
    .then(data => {
      const categoriasHTML = data.categorias.map(categoria => `
        <li><a href="#" id="${categoria.id}" onclick="cargarProductos(${categoria.id})">${categoria.nombre}</a></li>
      `).join('');
      document.getElementById('categorias').innerHTML = categoriasHTML;
    })
    .catch(error => console.log(error));
  actualizarCarrito();
});
