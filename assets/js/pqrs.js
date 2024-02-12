let slPqrs = document.getElementById('slPqrs');
let emailUser = document.getElementById('emailUser');
let mensajeUser = document.getElementById('messageUser');
let btnEnviar = document.getElementById('btnEnviar');

btnEnviar.addEventListener('click', function() {
    let aviso = document.getElementById('aviso');
    let emailUserValue = emailUser.value;
    let mensajeUserValue = mensajeUser.value;
    let slPqrsValue = slPqrs.value;

    if (slPqrsValue == "default") {
        aviso.innerHTML = '';
        aviso.innerHTML = 'Debes seleccionar un tipo de PQRS';
        return;
    } else {
        if (emailUserValue == "" || mensajeUserValue == "") {
            aviso.innerHTML = '';
            aviso.innerHTML = 'Debes ingresar un correo electrónico y mensaje.';
            emailUser.classList.add('is-invalid');
            mensajeUser.classList.add('is-invalid');
            emailUser.classList.remove('is-valid');
            mensajeUser.classList.remove('is-valid');
            return;
        } else {
            aviso.innerHTML = '';
            emailUser.classList.remove('is-invalid');
            mensajeUser.classList.remove('is-invalid');
            emailUser.classList.add('is-valid');
            mensajeUser.classList.add('is-valid');

            fetch('http://localhost:3000/pqrs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        slPqrs: slPqrsValue,
                        emailUser: emailUserValue,
                        mensajeUser: mensajeUserValue
                    })
                }).then (response => response.json())
                .then(data => {
                    console.log(data);

                    aviso.innerHTML = '';
                    aviso.innerHTML = 'PQRS enviada correctamente';

                    slPqrs.value = "default";
                    emailUser.value = "";
                    mensajeUser.value = "";
            });
        };
    };
});