let consumoDeMateriales = [];

function init() {
escribirBienvenida();
mostrarCategorias();
escribirMensaje();
recuperar();
}

function escribirBienvenida() {
const myH1 = document.createElement("h1");
myH1.innerHTML = "Consumo de materiales";
document.body.appendChild(myH1);
}

function mostrarCategorias() {
categorias.forEach((categoria) => {
const myBtn = document.createElement("button");
myBtn.setAttribute("class", "styledBtn");
myBtn.setAttribute("id", categoria.id);
myBtn.innerHTML = categoria.nombre;
document.body.appendChild(myBtn);
});
}

function escribirMensaje() {
const nodoMensaje = document.createElement("p");
nodoMensaje.innerHTML = "Por favor, seleccione una categoría.";
document.body.appendChild(nodoMensaje);
agregarListeners();
}

function agregarListeners() {
let div = document.createElement("div");
document.body.appendChild(div);
let div2 = document.createElement("div");
div2.setAttribute("id", "elementos");
document.body.appendChild(div2);
let botones = document.getElementsByClassName("styledBtn");

}

for (const boton of botones) {
    boton.addEventListener("click", () => {
        div.innerHTML = "";
        let categoria = categorias.find((item) => item.id == boton.id);
        div.innerHTML = `<h2>${categoria.nombre}</h2>`;
        let productosPorCategoria = productos.filter(
            (producto) => producto.categoria == boton.id
        );
        renderProductos(productosPorCategoria);
    });
}

function renderProductos(array) {
    const div = document.getElementById("elementos");
    div.innerHTML = "";
    array.map((element) => {
        let id = element.id;
        let nombre = element.nombre;
        let precio = element.precio;
        let stock = element.stock;
        let hayNoHay; 
        if (stock > 0){
            hayNoHay = `<div class="actions">
            <button class="add" id=${id}>Agregar</button>
            </div>`;
        } else{
            hayNoHay = `<div class="actions">
            Sin Stock
            </div>`;
        }
        div.innerHTML += `
            <div class="item">
            <div class="tittle">${nombre}</div>
            <div class="price">${precio}</div>
            <div class="qty">${stock} units</div>
            ${hayNoHay}
            </div>
            `;
    })
    agregarConsumo();
}

