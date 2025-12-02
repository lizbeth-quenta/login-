document.getElementById('recuperacionForm').addEventListener('submit', function(event) {
    event.preventDefault();            //Para q no se recargue la página
    const correoInput = document.getElementById('recuperacionCorreo').value;
    const nuevaContrasena = document.getElementById('nuevaContrasena').value;
    const mensajeElement = document.getElementById('mensajeRecuperacion');
    //Para verificar y validar la nueva contraseña
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!regexContrasena.test(nuevaContrasena)) {  
        mensajeElement.textContent = "La nueva contraseña no cumple los requisitos (mayúscula, minúscula, número, caracter especial).";
        mensajeElement.style.color = 'red';
        return;
    }
    //Obtener y actualizar datos del usuario
    let usuarioGuardado = localStorage.getItem('usuarioSistema');
    if (!usuarioGuardado) {
        mensajeElement.textContent = "No hay cuentas registradas verifique la cuenta.";
        mensajeElement.style.color = 'red';
        return;
    }
    let usuario = JSON.parse(usuarioGuardado);  //llama al usuario guardado
    if (correoInput !== usuario.correo) {  // verifica si el correo (nombre de usurio) es diferente, si lo es muestra el siguiente mensaje
        mensajeElement.textContent = "El correo ingresado no coincide con el usuario registrado.";
        mensajeElement.style.color = 'red';
        return;
    }
    // hace el cambio de contraseña y lo actualiza
    usuario.contrasena = nuevaContrasena;
    usuario.bloqueado = false; // Desbloquear la cuenta
    usuario.intentosFallidos = 0; // Reiniciar el contador de intentos 
    localStorage.setItem('usuarioSistema', JSON.stringify(usuario)); // Guardar nuevo estado en el almacenamiento local para asi volver a ingresar con la nueva contraseña
    mensajeElement.textContent = "Contraseña ya fue actualizada. Ahora puede iniciar sesión.";   // cuando ya se haya ejecutado nos aparece el suiente mensaje
    mensajeElement.style.color = 'green';
    document.getElementById('recuperacionForm').reset();  // despues de guardar el nuevo estado se limpiara automaticamente
});
//Aqui hacemos para poder ocultar y mostrar la contraseña
function contra(id) {
    const input = document.getElementById(id);
    const span = input.nextElementSibling; 
    if (input.type === "password") {
        input.type = "text";
        span.textContent = '👁️‍🗨️';
    } else {
        input.type = "password";
        span.textContent = '👁️';
    }
}