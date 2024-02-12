//Permitir ingreso a la página
let id = localStorage.getItem('id');

if(id == null) {
    location.href = '../index.html';
}

//Cerrar sesión
let closeSession = document.getElementById('closeSession');

closeSession.addEventListener('click', function() {
    location.href = '../index.html';

    localStorage.removeItem('id');
});


/*Contadores principales*/

//Contador Admins
let counterAdmins = document.getElementById('counterAdmins');

fetch('http://localhost:3000/admins')
.then(response => response.json())
.then(data => {
    counterAdmins.innerHTML = data.length;
});


//Contador de marcas
let counterMarcas = document.getElementById('counterMarcas');

fetch('http://localhost:3000/brands')
.then(response => response.json())
.then(data => {
    counterMarcas.innerHTML = data.length;
});


//Contador de PQRS
let counterPqrs = document.getElementById('counterPqrs');

fetch('http://localhost:3000/pqrs')
.then(response => response.json())
.then(data => {
    counterPqrs.innerHTML = data.length;
});