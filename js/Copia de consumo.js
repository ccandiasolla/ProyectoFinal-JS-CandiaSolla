// Carga las categorías
const listaCategorias = document.querySelector("nav ul");
categorias.forEach((categoria) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("class", "category");
  a.setAttribute("data-category", categoria.id);
  a.textContent = categoria.nombre;
  li.appendChild(a);
  listaCategorias.appendChild(li);
});

// Carga los productos
const listaProductos = document.querySelector("#product-list");
const actualizarProductos = (categoriaId) => {
  listaProductos.innerHTML = "";
  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === categoriaId
  );
  productosFiltrados.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio} - stock: ${producto.stock}`;
    listaProductos.appendChild(li);
  });
};

// Selecciona la primera categoría
document.querySelector(".category").classList.add("selected");
actualizarProductos(1);

// Manejador de eventos para hacer clic en una categoría
const listaCategoriasA = document.querySelectorAll("nav ul li a");
listaCategoriasA.forEach((categoria) => {
  categoria.addEventListener("click", (event) => {
    event.preventDefault();
    const categoriaId = parseInt(categoria.getAttribute("data-category"));
    actualizarProductos(categoriaId);
    document.querySelector(".selected").classList.remove("selected");
    categoria.classList.add("selected");
  });
});

let cart = [];
let updatedStock = {};

function addToCart(product) {
  cart.push(product);
  console.log(`${product.name} ha sido agregado al carrito de compras.`);
}


function updateStock() {
  for (let category in products) {
    updatedStock[category] = [];
    for (let product of products[category]) {
      let remainingStock = product.stock;
      for (let item of cart) {
        if (item.name === product.name) {
          remainingStock--;
        }
      }
      updatedStock[category].push({ ...product, stock: remainingStock });
    }
  }
  products = updatedStock;
}


for (let category in products) {
  let categoryTitle = document.createElement("h2");
  categoryTitle.textContent = category;
  document.body.appendChild(categoryTitle);

  for (let product of products[category]) {
    let productContainer = document.createElement("div");

    let productName = document.createElement("h3");
    productName.textContent = product.name;
    productContainer.appendChild(productName);

    let productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productContainer.appendChild(productPrice);

    let productStock = document.createElement("p");
    productStock.textContent = `Stock: ${product.stock}`;
    productContainer.appendChild(productStock);

    let consumeButton = document.createElement("button");
    consumeButton.textContent = "CONSUMIR";
    consumeButton.addEventListener("click", function () {
      if (product.stock > 0) {
        addToCart(product);
        product.stock--;
        productStock.textContent = `Stock: ${product.stock}`;
      } else {
        alert("Este producto no está disponible en este momento.");
      }
    });
    productContainer.appendChild(consumeButton);

    document.body.appendChild(productContainer);
  }
}


