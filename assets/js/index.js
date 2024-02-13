//Linkear base de datos
let brandIndex = document.getElementById('brandIndex');

fetch('http://localhost:3000/brands')
.then(response => response.json())
.then(data => {
    data.forEach(brand => {
        let caja = document.createElement('div');
        caja.classList.add('col-md-6', 'col-lg-3', 'd-flex', 'align-items-stretch', 'mb-5', 'mb-lg-0');
        brandIndex.appendChild(caja);

        let cajita = document.createElement('div');
        cajita.classList.add('icon-box');
        cajita.setAttribute('data-aos', 'fade-up');
        cajita.setAttribute('data-aos-delay', '100');
        caja.appendChild(cajita);

        let img = document.createElement('img');
        img.setAttribute('src', brand.logo);
        img.setAttribute('alt', brand.name);
        img.classList.add('img-fluid');

        let h4 = document.createElement('h4');
        h4.classList.add('title');
        h4.setAttribute('name', 'nameBrand')
        h4.innerHTML = brand.name;

        let p = document.createElement('p');
        p.innerHTML = brand.description;

        let br = document.createElement('br');

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'w-100', 'btn-sm');
        button.innerHTML = 'Ver página';
        button.addEventListener('click', () => {
            location.href = brand.website;
        });

        cajita.append(img, h4, p, br, button);
    });
});

//Busqueda de marcas
let marcaBuscar = document.getElementById('marcaBuscar');

function buscarMarca () {
    let marcaBusqueda = marcaBuscar.value;
    let nameBrand = document.getElementsByName('nameBrand');

    marcaBusqueda = marcaBusqueda.toLowerCase();

    for(let corredor = 0; corredor < nameBrand.length; corredor++) {
        if(!nameBrand[corredor].textContent.toLowerCase().includes(marcaBusqueda)){
            nameBrand[corredor].parentNode.style.display = 'none';
        } else {
            nameBrand[corredor].parentNode.style.display = '';
        };
    };
}