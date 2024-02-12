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

/*ID de Modal*/
let exampleModal = document.getElementById('exampleModal');
let titleModal = document.getElementById('titleModal');
let modalContent = document.getElementById('modalContent');
let modalFooter = document.getElementById('modalFooter');

//Modal para agregar un nuevo administrador
let btnNewAdmin = document.getElementById('btnNewAdmin');

btnNewAdmin.addEventListener('click', function() {
    titleModal.innerHTML = 'Nuevo Administrador';
    modalContent.innerHTML = `
        <div>
            <label>Nombre completo</label>
            <input id="nameNewAdmin" type="text" class="form-control">
        </div>
        <div>
            <label>Correo</label>
            <input id="emailNewAdmin" type="email" class="form-control">
        </div>
        <div>
            <p id="aviso"></p>
        </div>
    `;
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnAddAdmin" type="button" class="btn btn-primary">Save changes</button>
    `;

    let nameNewAdmin = document.getElementById('nameNewAdmin');
    let emailNewAdmin = document.getElementById('emailNewAdmin');
    let btnAddAdmin = document.getElementById('btnAddAdmin');

    btnAddAdmin.addEventListener('click', function() {
        let nameNewAdminValue = nameNewAdmin.value;
        let emailNewAdminValue = emailNewAdmin.value;
        let aviso = document.getElementById('aviso');

        if(nameNewAdminValue == '' || emailNewAdminValue == '') {
            aviso.innerHTML = '';
            aviso.innerHTML = 'Todos los campos son obligatorios';
            nameNewAdmin.classList.add('is-invalid');
            emailNewAdmin.classList.add('is-invalid');
        } else {
            fetch('http://localhost:3000/admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameNewAdminValue,
                    email: emailNewAdminValue,
                    password: "password"
                })
            }).then(response => response.json())
            .then(data => {
                console.log('Usuario registrado como:', data);
                aviso.innerHTML = '';
                aviso.innerHTML = 'Usuario registrado correctamente';

                nameNewAdmin.value = '';
                emailNewAdmin.value = '';
            }) 
        }
    });
});

//Sincronizar tabla a la base de datos
let tableAdmins = document.getElementById('tableAdmins');

fetch('http://localhost:3000/admins')
.then(response => response.json())
.then(data => {
    data.forEach(admin => {
        let tr = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.setAttribute('name', 'idAdmin')
        idCell.innerHTML = admin.id;

        let nameCell = document.createElement('td');
        nameCell.setAttribute('name', 'nameAdmin')
        nameCell.innerHTML = admin.name;

        let emailCell = document.createElement('td');
        emailCell.setAttribute('name', 'emailAdmin')
        emailCell.innerHTML = admin.email;

        let actionsCell = document.createElement('td');

        let btnDetails = document.createElement('button');
        btnDetails.innerHTML = 'Detalles';
        btnDetails.classList.add('btn', 'btn-info');
        btnDetails.setAttribute('data-bs-toggle', 'modal');
        btnDetails.setAttribute('data-bs-target', '#exampleModal');
        btnDetails.addEventListener('click', function() {
            titleModal.innerHTML = 'Detalles';
            modalContent.innerHTML = `
            <p>ID: ${admin.id}</p>
            <p>Nombre: ${admin.name}</p>
            <p>Email: ${admin.email}</p>
            <p>Password: ${admin.password}</p>`
            modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`
        });

        let btnEdit = document.createElement('button');
        btnEdit.innerHTML = 'Editar';
        btnEdit.classList.add('btn', 'btn-warning');
        btnEdit.setAttribute('data-bs-toggle', 'modal');
        btnEdit.setAttribute('data-bs-target', '#exampleModal');
        btnEdit.addEventListener('click', function() {
            titleModal.innerHTML = 'Editar Administrador';
            modalContent.innerHTML = `
                <div>
                    <label>Nombre completo</label>
                    <input id="nameNewAdmin" type="text" class="form-control" value="${admin.name}">
                </div>
                <div>
                    <label>Correo</label>
                    <input id="emailNewAdmin" type="email" class="form-control" value="${admin.email}">
                </div>
                <div>
                    <p id="aviso"></p>
                </div>
            `;
            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button id="btnAddAdmin" type="button" class="btn btn-primary">Save changes</button>
            `;

            let nameNewAdmin = document.getElementById('nameNewAdmin');
            let emailNewAdmin = document.getElementById('emailNewAdmin');
            let btnAddAdmin = document.getElementById('btnAddAdmin');

            btnAddAdmin.addEventListener('click', function() {
                let nameNewAdminValue = nameNewAdmin.value;
                let emailNewAdminValue = emailNewAdmin.value;
                localStorage.setItem('idUser', admin.id);
                let aviso = document.getElementById('aviso');
            
                if(nameNewAdminValue == '' || emailNewAdminValue == '') {
                    aviso.innerHTML = '';
                    aviso.innerHTML = 'Todos los campos son obligatorios';
                    nameNewAdmin.classList.add('is-invalid');
                    emailNewAdmin.classList.add('is-invalid');
                } else {
                    let idUser = localStorage.getItem('idUser');
                    fetch(`http://localhost:3000/admins/${idUser}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: nameNewAdminValue,
                            email: emailNewAdminValue,
                        })
                    }).then(response => response.json())
                    .then(data => {
                        console.log('Usuario cambiado como:', data);
                        aviso.innerHTML = '';
                        aviso.innerHTML = 'Usuario registrado correctamente';
                    
                        nameNewAdmin.value = '';
                        emailNewAdmin.value = '';
                        localStorage.removeItem('idUser')
                    }) 
                }
            });
        });

        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Eliminar';
        btnDelete.classList.add('btn', 'btn-danger');
        btnDelete.addEventListener('click', function() {
            fetch(`http://localhost:3000/admins/${admin.id}`, {
                method: 'DELETE'
            }).then(response => response.json())
            .then(data => {
                console.log('Usuario eliminado:', data);
            });
        });

        actionsCell.append(btnDetails, btnEdit, btnDelete);

        tr.append(idCell, nameCell, emailCell, actionsCell);

        tableAdmins.appendChild(tr);
    });
});

//Buscador de administradores
//Con Id
let idAdminBuscar = document.getElementById('idAdminBuscar');

function buscarID () {
    let idAdminBusqueda = idAdminBuscar.value;
    let idAdmin = document.getElementsByName('idAdmin');

    idAdminBusqueda = idAdminBusqueda.toLowerCase();

    for(let corredor = 0; corredor < idAdmin.length; corredor++) {
        if(!idAdmin[corredor].textContent.toLowerCase().includes(idAdminBusqueda)){
            idAdmin[corredor].parentNode.style.display = 'none';
        } else {
            idAdmin[corredor].parentNode.style.display = '';
        };
    };
}

//Con Nombre
let nameAdminBuscar = document.getElementById('nameAdminBuscar');

function buscarName () {
    let nameAdminBusqueda = nameAdminBuscar.value;
    let nameAdmin = document.getElementsByName('nameAdmin');

    nameAdminBusqueda = nameAdminBusqueda.toLowerCase();

    for(let corredor = 0; corredor < nameAdmin.length; corredor++) {
        if(!nameAdmin[corredor].textContent.toLowerCase().includes(nameAdminBusqueda)){
            nameAdmin[corredor].parentNode.style.display = 'none';
        } else {
            nameAdmin[corredor].parentNode.style.display = '';
        };
    };
};


//Con Email
let emailAdminBuscar = document.getElementById('emailAdminBuscar');

function buscarEmail () {
    let emailAdminBusqueda = emailAdminBuscar.value;
    let emailAdmin = document.getElementsByName('emailAdmin');

    emailAdminBusqueda = emailAdminBusqueda.toLowerCase();

    for(let corredor = 0; corredor < emailAdmin.length; corredor++) {
        if(!emailAdmin[corredor].textContent.toLowerCase().includes(emailAdminBusqueda)){
            emailAdmin[corredor].parentNode.style.display = 'none';
        } else {
            emailAdmin[corredor].parentNode.style.display = '';
        };
    };
};