let email = document.getElementById('email');
let password = document.getElementById('password');
let btnAutenticarme = document.getElementById('btnAutenticarme');

btnAutenticarme.addEventListener('click', function() {
    let emailValue = email.value;
    let passwordValue = password.value;
    let aviso = document.getElementById('aviso');

    if(emailValue === '' || passwordValue === '') {
        aviso.innerHTML = '';
        aviso.innerHTML = 'Debes llenar todos los campos';
        email.classList.remove('is-valid');
        password.classList.remove('is-valid');
        email.classList.add('is-invalid');
        password.classList.add('is-invalid');
        return;
    } else {
        aviso.innerHTML = '';
        email.classList.remove('is-invalid');
        password.classList.remove('is-invalid');
        email.classList.add('is-valid');
        password.classList.add('is-valid');
    }

    fetch('http://localhost:3000/admins')
    .then(response => {
        return response.json();
    }).then(data => {
        let user = data.find(element => {
            return element.email === emailValue && element.password === passwordValue;
        });

        if(user) {
            aviso.innerHTML = '';

            localStorage.setItem('id', user.id);
            localStorage.setItem('name', user.name);

            location.href = './admin/index.html';
        } else {
            aviso.innerHTML = 'Usuario o contraseña incorrectos';
        }
    })
});