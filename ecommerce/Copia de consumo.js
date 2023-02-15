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

