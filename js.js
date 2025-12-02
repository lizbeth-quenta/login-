// Aqui es pr el inicio de secion o login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();                        //esto es para que no se recarge
    const correoInput = document.getElementById('loginCorreo').value;
    const contrasenaInput = document.getElementById('loginContrasena').value;
    const mensajeElement = document.getElementById('mensajeLogin');
    const recuperacionElement = document.getElementById('enlaceRecuperacion');
   
    let usuarioGuardado = localStorage.getItem('usuarioSistema');
   
    if (!usuarioGuardado) {    // con este if busca l cuenta que ingresmos //
        mensajeElement.textContent = "No hay una cuenta registrada a ese nombre.";
        return;
    }
    let usuario = JSON.parse(usuarioGuardado); // con este codigo llama al usuario y lo vuelve una constante
    if (usuario.bloqueado) {     // este if solo se ejecutara el bucle de abajo 
        mensajeElement.textContent = "Cuenta bloqueada .";
        mensajeElement.style.color = 'red';
        recuperacionElement.style.display = 'block';
        return; 
    }
    // Aqui usamos para verificar si son correctos los datos wue metimos
    if (correoInput === usuario.correo && contrasenaInput === usuario.contrasena) {
        usuario.intentosFallidos = 0; 
        localStorage.setItem('usuarioSistema', JSON.stringify(usuario)); // aqui vuelve a llamar al objeto usuario para la comparacion
        mensajeElement.textContent = `Bienvenido al sistema, ${usuario.nombre}`;  // es el mensaje que aparecera si el usuario es correcto
        mensajeElement.style.color = 'green';
        recuperacionElement.style.display = 'none';
        document.getElementById('loginForm').reset();
    } else {  // en caso de que nos equivocamos en el usuario o contraseña entomces entra aqui
        usuario.intentosFallidos += 1;
        if (usuario.intentosFallidos >= 3) { // si los intentos equivocado son igual a 3 o mas apararece el siguiente mensaje
            usuario.bloqueado = true;  // aqui entra el if de usuario bloquedo 
            mensajeElement.textContent = "Tu cuenta fue bloqueada por pasar el límite de intentos.";
            recuperacionElement.style.display = 'block';
        } else { // Mientras no se haya llegado al límite de 3 intentos no solo Mostrará El siguiente mensaje//
            mensajeElement.textContent = " Usuario o contraseña incorrectos.";
            recuperacionElement.style.display = 'none';
        }
        mensajeElement.style.color = 'red';
        localStorage.setItem('usuarioSistema', JSON.stringify(usuario)); // Guardar nuevo estado, si te quivocaste en los 3 intentos aqui no permitira ingresar ni aunque se ponga bien los datos
    }
});
// Con esta funcion podemos ver y ocultar el contenido de la contraseña
function contra(id) {
    const input = document.getElementById(id);
    const span = input.nextElementSibling;    // este codigo busca el input que este dentro del span para que se una a la accion de la funcion
    if (input.type === "password") {
        input.type = "text";
        span.textContent = '👁️‍🗨️';
    } else {
        input.type = "password";
        span.textContent = '👁️';
    }
}