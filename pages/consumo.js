// Se ejecuta cuando el documento se carga
document.addEventListener("DOMContentLoaded", () => {
  fetch("categorias.json")
    .then(response => response.json())
    .then(data => {
      const categoriasHTML = data.categorias.map(categoria => `
        <li><a href="#" id="${categoria.id}" style="text-decoration: none" onclick="cargarProductos(${categoria.id})">${categoria.nombre}</a></li>
      `).join("");
      document.getElementById("categorias").innerHTML = categoriasHTML;
    })
    .catch(error => console.log(error));
  actualizarCarrito();
});

// Función para cargar los productos de la categoría seleccionada
function cargarProductos(categoriaID) {
  fetch("productos.json")
    .then(response => response.json())
    .then(data => {
      const productos = data.productos.filter(producto => producto.categoria === categoriaID);
      const productosHTML = productos.map(producto => `
        <div class="card col-md-3">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-stock">Stock: Disponible</p>
            <a href="#" class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar</a>
          </div>
        </div>
      `).join("");
      document.getElementById("productos").innerHTML = productosHTML;
    })
    .catch(error => console.log(error));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(productoID) {
  const carrito = obtenerCarrito();
  const productoEnCarrito = carrito.find(producto => producto.id === productoID);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    fetch("productos.json")
      .then(response => response.json())
      .then(data => {
        const producto = data.productos.find(producto => producto.id === productoID);
        carrito.push({id: productoID, nombre: producto.nombre, cantidad: 1, precio: producto.precio});
        guardarCarrito(carrito);
        actualizarCarrito();
      })
      .catch(error => console.log(error));
  }
  guardarCarrito(carrito);
  actualizarCarrito();
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "green",
  }).showToast();
}

// Función para actualizar la cantidad de productos en el carrito
function actualizarCarrito() {
  const carrito = obtenerCarrito();
  const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  document.getElementById("carrito-total").textContent = totalProductos;
  
  // construir la lista de productos en el carrito
  const carritoHTML = carrito.map(producto => `
    <li>${producto.cantidad} x ${producto.nombre}</li>
  `).join("");
  document.getElementById("carrito-productos").innerHTML = carritoHTML;
}

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
  const carritoString = localStorage.getItem("carrito");
  if (carritoString) {
    return JSON.parse(carritoString);
  } else {
    return [];
  }
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito.map(producto => ({id: producto.id, cantidad: producto.cantidad, nombre: producto.nombre}))));
}

// Función para borrar el carrito en localStorage
const botonVaciarCarrito = document.getElementById('carrito-vaciar');

botonVaciarCarrito.addEventListener("click", () => {
  if(JSON.parse(localStorage.getItem('carrito')).length === 0) {
    Toastify({
      text: "No hay productos que borrar",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
    }).showToast();
    return;
  }

  Swal.fire({
    title: "¿Está seguro de que desea borrar los productos?",
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: "No",
    confirmButtonColor: "green",
    denyButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("carrito", JSON.stringify([]));
      actualizarCarrito();
      Toastify({
        text: "Se han borrado los productos",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "green"
      }).showToast();
    }
  });
});

// Función para realizar el consumo, de momento este código no resta stock al producto correspondiente
function realizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    Toastify({
      text: "No ha agregado productos",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
    }).showToast();
    return;
  }
  Swal.fire({
    title: "¿Desea realizar el consumo?",
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "No",
    confirmButtonColor: "green",
    denyButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Consumo realizado con éxito",
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
      }).showToast();
      localStorage.setItem("carrito", JSON.stringify([]));
      actualizarCarrito();
    }
  });
}
