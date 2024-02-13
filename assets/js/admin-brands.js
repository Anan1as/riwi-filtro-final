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

//ID's de modal
let exampleModal = document.getElementById('exampleModal');
let titleModal = document.getElementById('titleModal');
let modalContent = document.getElementById('modalContent');
let modalFooter = document.getElementById('modalFooter');

//Crear nueva empresa
let btnCrearMarca = document.getElementById('btnCrearMarca');

btnCrearMarca.addEventListener('click', function() {
    titleModal.innerHTML = 'Nueva marca';
    modalContent.innerHTML = `
        <div>
            <label>Logo</label>
            <input id="logoNewBrand" type="text" class="form-control" placeholder="Inserte el link del logo de su marca aquí">
        </div>
        <div>
            <label>Nombre</label>
            <input id="nombreNewBrand" type="email" class="form-control">
        </div>
        <div>
            <label>Local</label>
            <input id="localNewBrand" type="email" class="form-control">
        </div>
        <div>
            <label>Piso</label>
            <input id="pisoNewBrand" type="email" class="form-control">
        </div>
        <div>
            <label>Horarios</label>
            <input id="horariosNewBrand" type="email" class="form-control">
        </div>
        <div>
            <label>Sitio Web</label>
            <input id="webNewBrand" type="email" class="form-control">
        </div>
        <div>
            <label>Descripción</label>
            <input id="descriptionNewBrand" type="email" class="form-control">
        </div>
        <div>
            <p id="aviso"></p>
        </div>
    `;
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnAddBrand" type="button" class="btn btn-primary">Save changes</button>
    `;

    let logoNewBrand = document.getElementById('logoNewBrand');
    let nombreNewBrand = document.getElementById('nombreNewBrand');
    let localNewBrand = document.getElementById('localNewBrand');
    let pisoNewBrand = document.getElementById('pisoNewBrand');
    let horariosNewBrand = document.getElementById('horariosNewBrand');
    let webNewBrand = document.getElementById('webNewBrand');
    let descriptionNewBrand = document.getElementById('descriptionNewBrand');

    let btnAddBrand = document.getElementById('btnAddBrand');

    btnAddBrand.addEventListener('click', function() {
        let logoNewBrandValue = logoNewBrand.value;
        let nombreNewBrandValue = nombreNewBrand.value;
        let localNewBrandValue = localNewBrand.value;
        let pisoNewBrandValue = pisoNewBrand.value;
        let horariosNewBrandValue = horariosNewBrand.value;
        let webNewBrandValue = webNewBrand.value;
        let descriptionNewBrandValue = descriptionNewBrand.value;
        let aviso = document.getElementById('aviso');

        if(logoNewBrandValue == '' || nombreNewBrandValue == '' || localNewBrandValue == '' || pisoNewBrandValue == '' || horariosNewBrandValue == '' || webNewBrandValue == '' || descriptionNewBrandValue == '') {
            aviso.innerHTML = '';
            aviso.innerHTML = 'Todos los campos son obligatorios';
            logoNewBrand.classList.add('is-invalid');
            nombreNewBrand.classList.add('is-invalid');
            localNewBrand.classList.add('is-invalid');
            pisoNewBrand.classList.add('is-invalid');
            horariosNewBrand.classList.add('is-invalid');
            webNewBrand.classList.add('is-invalid');
            descriptionNewBrand.classList.add('is-invalid');
        } else {
            fetch('http://localhost:3000/brands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nombreNewBrandValue,
                    local: localNewBrandValue,
                    floor: pisoNewBrandValue,
                    schedule: horariosNewBrandValue,
                    logo: logoNewBrandValue,
                    website: webNewBrandValue,
                    description : descriptionNewBrandValue
                })
            }).then(response => response.json())
            .then(data => {
                console.log('Marca registrado como:', data);
                aviso.innerHTML = '';
                aviso.innerHTML = 'Marca registrada correctamente';

                logoNewBrand.value = '';
                nombreNewBrand.value = '';
                localNewBrand.value = '';
                pisoNewBrand.value = '';
                horariosNewBrand.value = '';
                webNewBrand.value = '';
                descriptionNewBrand.value = '';
            }) 
        }
    });
});

//Sincronizar la tabla a la base de datos
let tableBrands = document.getElementById('tableBrands');

fetch('http://localhost:3000/brands')
.then(response => response.json())
.then(data => {
    data.forEach(brand => {
        let tr = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.setAttribute('name', 'idBrand')
        idCell.innerHTML = brand.id;

        let logoCell = document.createElement('td');
        let logoImg = document.createElement('img');
        logoImg.setAttribute('src', brand.logo);
        logoImg.setAttribute('width', '100px');
        logoCell.appendChild(logoImg);

        let nameCell = document.createElement('td');
        nameCell.setAttribute('name', 'nameBrand')
        nameCell.innerHTML = brand.name;

        let localCell = document.createElement('td');
        localCell.setAttribute('name', 'localBrand')
        localCell.innerHTML = brand.local;

        let floorCell = document.createElement('td');
        floorCell.setAttribute('name', 'floorBrand')
        floorCell.innerHTML = brand.floor;

        let scheduleCell = document.createElement('td');
        scheduleCell.innerHTML = brand.schedule;

        let websiteCell = document.createElement('td');
        let website = document.createElement('a');
        website.setAttribute('href', brand.website);
        website.innerHTML = "Sitio web";
        websiteCell.appendChild(website);

        let actionsCell = document.createElement('td');

        let btnDetails = document.createElement('button');
        btnDetails.innerHTML = 'Detalles';
        btnDetails.classList.add('btn', 'btn-info');
        btnDetails.setAttribute('data-bs-toggle', 'modal');
        btnDetails.setAttribute('data-bs-target', '#exampleModal');
        btnDetails.addEventListener('click', function() {
            titleModal.innerHTML = 'Detalles';
            modalContent.innerHTML = `
            <p>ID: ${brand.id}</p>
            <p>Nombre: ${brand.name}</p>
            <p>Logo: ${brand.logo}</p>
            <p>Local: ${brand.local}</p>
            <p>Piso: ${brand.floor}</p>
            <p>Horarios: ${brand.schedule}</p>
            <p>Sitio Web: <a href="${brand.website}">${brand.website}</a></p>
            <p>Descripción: ${brand.description}</p>`
            modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`
        });

        let btnEdit = document.createElement('button');
        btnEdit.innerHTML = 'Editar';
        btnEdit.classList.add('btn', 'btn-warning');
        btnEdit.setAttribute('data-bs-toggle', 'modal');
        btnEdit.setAttribute('data-bs-target', '#exampleModal');
        btnEdit.addEventListener('click', function() {
            titleModal.innerHTML = 'Editar Marca';
            modalContent.innerHTML = `
                <div>
                    <label>Logo</label>
                    <input id="logoNewBrand" type="text" class="form-control" value="${brand.logo}">
                </div>
                <div>
                    <label>Nombre</label>
                    <input id="nombreNewBrand" type="email" class="form-control" value="${brand.name}">
                </div>
                <div>
                    <label>Local</label>
                    <input id="localNewBrand" type="email" class="form-control" value="${brand.local}">
                </div>
                <div>
                    <label>Piso</label>
                    <input id="pisoNewBrand" type="email" class="form-control" value="${brand.floor}">
                </div>
                <div>
                    <label>Horarios</label>
                    <input id="horariosNewBrand" type="email" class="form-control" value="${brand.schedule}">
                </div>
                <div>
                    <label>Sitio Web</label>
                    <input id="webNewBrand" type="email" class="form-control" value="${brand.website}">
                </div>
                <div>
                    <label>Descripción</label>
                    <input id="descriptionNewBrand" type="email" class="form-control" value="${brand.description}">
                </div>
                <div>
                    <p id="aviso"></p>
                </div>
            `;
            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button id="btnAddBrand" type="button" class="btn btn-primary">Save changes</button>
            `;

            let logoNewBrand = document.getElementById('logoNewBrand');
            let nombreNewBrand = document.getElementById('nombreNewBrand');
            let localNewBrand = document.getElementById('localNewBrand');
            let pisoNewBrand = document.getElementById('pisoNewBrand');
            let horariosNewBrand = document.getElementById('horariosNewBrand');
            let webNewBrand = document.getElementById('webNewBrand');
            let descriptionNewBrand = document.getElementById('descriptionNewBrand');

            btnAddBrand.addEventListener('click', function() {
                let logoNewBrandValue = logoNewBrand.value;
                let nombreNewBrandValue = nombreNewBrand.value;
                let localNewBrandValue = localNewBrand.value;
                let pisoNewBrandValue = pisoNewBrand.value;
                let horariosNewBrandValue = horariosNewBrand.value;
                let webNewBrandValue = webNewBrand.value;
                let descriptionNewBrandValue = descriptionNewBrand.value;
                localStorage.setItem('idUser', brand.id);
                let aviso = document.getElementById('aviso');
            
                if(logoNewBrandValue == '' || nombreNewBrandValue == '' || localNewBrandValue == '' || pisoNewBrandValue == '' || horariosNewBrandValue == '' || webNewBrandValue == '' || descriptionNewBrandValue == '') {
                    aviso.innerHTML = '';
                    aviso.innerHTML = 'Todos los campos son obligatorios';
                    logoNewBrand.classList.add('is-invalid');
                    nombreNewBrand.classList.add('is-invalid');
                    localNewBrand.classList.add('is-invalid');
                    pisoNewBrand.classList.add('is-invalid');
                    horariosNewBrand.classList.add('is-invalid');
                    webNewBrand.classList.add('is-invalid');
                    descriptionNewBrand.classList.add('is-invalid');
                } else {
                    let idBrand = localStorage.getItem('idBrand');
                    fetch(`http://localhost:3000/admins/${idBrand}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: nombreNewBrandValue,
                            local: localNewBrandValue,
                            floor: pisoNewBrandValue,
                            schedule: horariosNewBrandValue,
                            logo: logoNewBrandValue,
                            website: webNewBrandValue,
                            description : descriptionNewBrandValue
                        })
                    }).then(response => response.json())
                    .then(data => {
                        console.log('Marca cambiada como:', data);
                        aviso.innerHTML = '';
                        aviso.innerHTML = 'Marca cambiada correctamente';
                    
                        logoNewBrand.value = '';
                        nombreNewBrand.value = '';
                        localNewBrand.value = '';
                        pisoNewBrand.value = '';
                        horariosNewBrand.value = '';
                        webNewBrand.value = '';
                        localStorage.removeItem('idUser')
                    }) 
                }
            });
        });

        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Eliminar';
        btnDelete.classList.add('btn', 'btn-danger');
        btnDelete.addEventListener('click', function() {
            fetch(`http://localhost:3000/brands/${brand.id}`, {
                method: 'DELETE'
            }).then(response => response.json())
            .then(data => {
                console.log('Marca eliminada:', data);
            });
        });

        actionsCell.append(btnDetails, btnEdit, btnDelete);

        tr.append(idCell, logoCell, nameCell, localCell, floorCell, scheduleCell, websiteCell, actionsCell);

        tableBrands.appendChild(tr);
    });
});


//Busqueda de marcas
//Con ID
let idBrandBuscar = document.getElementById('idBrandBuscar');

function buscarID () {
    let idBrandBusqueda = idBrandBuscar.value;
    let idBrand = document.getElementsByName('idBrand');

    idBrandBusqueda = idBrandBusqueda.toLowerCase();

    for(let corredor = 0; corredor < idBrand.length; corredor++) {
        if(!idBrand[corredor].textContent.toLowerCase().includes(idBrandBusqueda)){
            idBrand[corredor].parentNode.style.display = 'none';
        } else {
            idBrand[corredor].parentNode.style.display = '';
        };
    };
};

//Con nombre
let nameBrandBuscar = document.getElementById('nameBrandBuscar');

function buscaName () {
    let nameBrandBusqueda = nameBrandBuscar.value;
    let nameBrand = document.getElementsByName('nameBrand');

    nameBrandBusqueda = nameBrandBusqueda.toLowerCase();

    for(let corredor = 0; corredor < nameBrand.length; corredor++) {
        if(!nameBrand[corredor].textContent.toLowerCase().includes(nameBrandBusqueda)){
            nameBrand[corredor].parentNode.style.display = 'none';
        } else {
            nameBrand[corredor].parentNode.style.display = '';
        };
    };
};

//Con local
let localBrandBuscar = document.getElementById('localBrandBuscar');

function buscarLocal () {
    let localBrandBusqueda = localBrandBuscar.value;
    let localBrand = document.getElementsByName('localBrand');

    localBrandBusqueda = localBrandBusqueda.toLowerCase();

    for(let corredor = 0; corredor < localBrand.length; corredor++) {
        if(!localBrand[corredor].textContent.toLowerCase().includes(localBrandBusqueda)){
            localBrand[corredor].parentNode.style.display = 'none';
        } else {
            localBrand[corredor].parentNode.style.display = '';
        };
    };
};

//Con piso
let floorBrandBuscar = document.getElementById('floorBrandBuscar');

function buscarFloor () {
    let floorBrandBusqueda = floorBrandBuscar.value;
    let floorBrand = document.getElementsByName('floorBrand');

    floorBrandBusqueda = floorBrandBusqueda.toLowerCase();

    for(let corredor = 0; corredor < floorBrand.length; corredor++) {
        if(!floorBrand[corredor].textContent.toLowerCase().includes(floorBrandBusqueda)){
            floorBrand[corredor].parentNode.style.display = 'none';
        } else {
            floorBrand[corredor].parentNode.style.display = '';
        };
    };
};