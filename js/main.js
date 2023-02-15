class Tec {
  constructor(nombre, apellido, edad, ingreso, legajo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.ingreso = ingreso;
    this.legajo = legajo;
    this.usuario = this.nombre.charAt(0).toLowerCase() + this.apellido.toLowerCase();
  }
}

const tec1 = new Tec("Gabriel", "Varesi", 45, 2012, "1");
const tec2 = new Tec("Dario", "Piñata", 58, 2016, "1");
const tec3 = new Tec("Leonardo", "Dancing", 28, 2022, "1");
const tec4 = new Tec("Daniel", "Grimoldi", 64, 1988, "1");

let credentials = [
  { username: tec1.usuario, password: tec1.legajo, tec: tec1 },
  { username: tec2.usuario, password: tec2.legajo, tec: tec2 },
  { username: tec3.usuario, password: tec3.legajo, tec: tec3 },
  { username: tec4.usuario, password: tec4.legajo, tec: tec4 },
];


function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < credentials.length; i++) {
    if (username === credentials[i].username && password === credentials[i].password) {
      let currentTec = credentials[i].tec;
      sessionStorage.setItem('currentTec', JSON.stringify(currentTec));

      Toastify({
        text: `Bienvenido ${currentTec.nombre} ${currentTec.apellido}`,
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#007bff"
      }).showToast();

      setTimeout(() => {
        window.location.href = "pages/user.html";
      }, 2000);
      
      return;
    }   
  }

  Toastify({
    text: "Nombre de usuario o contraseña incorrectos",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "#007bff"
  }).showToast();
  
}

let currentTec = JSON.parse(sessionStorage.getItem('currentTec'));


document.getElementById("employee-name").innerHTML = `${currentTec.nombre} ${currentTec.apellido}`;
document.getElementById("employee-age").innerHTML = currentTec.edad
document.getElementById("employee-position").innerHTML = "Técnico CCTV";
document.getElementById("employee-contract").innerHTML = currentTec.ingreso;

console.log(currentTec)

function pageConsumo () {
  window.location.href = "../pages/consumo.html"
};
