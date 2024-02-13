//Permitir ingreso a la página
let id = localStorage.getItem('id');

if(id == null) {
    location.href = '../../index.html';
}

//Cerrar sesión
let closeSession = document.getElementById('closeSession');

closeSession.addEventListener('click', function() {
    location.href = '../index.html';

    localStorage.removeItem('id');
});

//Mostrar PQRS
let tablePqrs = document.getElementById('tablePqrs');

fetch('http://localhost:3000/pqrs')
.then(response => response.json())
.then(data => {
    data.forEach(pqrs => {
        let tr = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.setAttribute('name', 'idPqrs')
        idCell.innerHTML = pqrs.id;

        let tipoCell = document.createElement('td');
        tipoCell.setAttribute('name', 'tipoPqrs')
        tipoCell.innerHTML = pqrs.type;

        let emailCell = document.createElement('td');
        emailCell.setAttribute('name', 'emailPqrs')
        emailCell.innerHTML = pqrs.emailUser;

        let mensajeCell = document.createElement('td');
        mensajeCell.setAttribute('name', 'mensajePqrs')
        mensajeCell.innerHTML = pqrs.mensajeUser;

        let actionsCell = document.createElement('td');

        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Eliminar';
        btnDelete.classList.add('btn', 'btn-danger');
        btnDelete.addEventListener('click', function() {
            fetch(`http://localhost:3000/pqrs/${pqrs.id}`, {
                method: 'DELETE'
            }).then(response => response.json())
            .then(data => {
                console.log('Pqrs eliminado:', data);
            });
        });

        actionsCell.appendChild(btnDelete);

        tr.append(idCell, tipoCell, emailCell, mensajeCell, actionsCell);

        tablePqrs.appendChild(tr);
    });
});

//Buscar PQRS
//Con ID
let idPqrsBuscar = document.getElementById('idPqrsBuscar');

function buscarId () {
    let idPqrsBusqueda = idPqrsBuscar.value;
    let idPqrs = document.getElementsByName('idPqrs');

    idPqrsBusqueda = idPqrsBusqueda.toLowerCase();

    for(let corredor = 0; corredor < idPqrs.length; corredor++) {
        if(!idPqrs[corredor].textContent.toLowerCase().includes(idPqrsBusqueda)){
            idPqrs[corredor].parentNode.style.display = 'none';
        } else {
            idPqrs[corredor].parentNode.style.display = '';
        };
    };
};

//Con type
let typePqrsBuscar = document.getElementById('typePqrsBuscar');

typePqrsBuscar.addEventListener('change', function() {
    if (typePqrsBuscar.value == 'default') {
        let typePqrs = document.getElementsByName('tipoPqrs');
    
        for(let corredor = 0; corredor < typePqrs.length; corredor++) {
            typePqrs[corredor].parentNode.style.display = '';
        };
    } else {
        let typePqrsBusqueda = typePqrsBuscar.value;
        let typePqrs = document.getElementsByName('tipoPqrs');
    
        for(let corredor = 0; corredor < typePqrs.length; corredor++) {
            if(!typePqrs[corredor].textContent.includes(typePqrsBusqueda)){
                typePqrs[corredor].parentNode.style.display = 'none';
            } else {
                typePqrs[corredor].parentNode.style.display = '';
            };
        };
    }
});

//Con email
let emailPqrsBuscar = document.getElementById('emailPqrsBuscar');

function buscarCorreo () {
    let emailPqrsBusqueda = emailPqrsBuscar.value;
    let emailPqrs = document.getElementsByName('emailPqrs');

    emailPqrsBusqueda = emailPqrsBusqueda.toLowerCase();

    for(let corredor = 0; corredor < emailPqrs.length; corredor++) {
        if(!emailPqrs[corredor].textContent.toLowerCase().includes(emailPqrsBusqueda)){
            emailPqrs[corredor].parentNode.style.display = 'none';
        } else {
            emailPqrs[corredor].parentNode.style.display = '';
        };
    };
};

//Con mensaje
let mensajePqrsBuscar = document.getElementById('mensajePqrsBuscar');

function buscarMensaje () {
    let mensajePqrsBusqueda = mensajePqrsBuscar.value;
    let mensajePqrs = document.getElementsByName('mensajePqrs');

    mensajePqrsBusqueda = mensajePqrsBusqueda.toLowerCase();

    for(let corredor = 0; corredor < mensajePqrs.length; corredor++) {
        if(!mensajePqrs[corredor].textContent.toLowerCase().includes(mensajePqrsBusqueda)){
            mensajePqrs[corredor].parentNode.style.display = 'none';
        } else {
            mensajePqrs[corredor].parentNode.style.display = '';
        };
    };
};