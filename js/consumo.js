
productContainer.appendChild(consumeButton);

document.body.appendChild(productContainer);


// Refactored code: 
let cart = [];
let updatedStock = {};

// Carga las categorías
const listaCategorias = document.querySelector("nav ul");
categorias.forEach((categoria) => {
const li = document.createElement("li");
const a = document.createElement("a");

// Se agregó un atributo para almacenar el id de la categoría en el elemento <a> para facilitar la búsqueda posteriormente. 
a.setAttribute("data-category-id", categoria.id);

a.setAttribute("href", "#");
a.setAttribute("class", "category");  
a.textContent = categoria.nombre;

li.appendChild(a);  
listaCategorias.appendChild(li);  

// Se agregó un event listener para detectar cuando se hace clic en una categoría y actualizar los productos correspondientes a esa categoría en la lista de productos  
a.addEventListener('click', (event) => {    												     event.preventDefault();      const categoriaId = parseInt(categoria.getAttribute('data-category-id'));      actualizarProductos(categoriaId);      document.querySelector('.selected').classList.remove('selected');      categoriaAuxiliarSeleccionada=event;      eventAuxiliarSeleccionado=event;      eventAuxiliarSeleccionado=eventAuxiliarSeleccionado+1;      eventAuxiliarSeleccionado=eventAuxiliarSeleccionado+1;     }); });

// Carga los productos   const listaProductos = document