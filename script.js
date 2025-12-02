//esto es para el registro//
document.getElementById('registroForm').addEventListener('submit', function(event) {   //no me salia asi que le pedi ayuda a la ia y fue esta funcion la cual me recomendo
  event.preventDefault();                                                            //Esta funcion permite que se ejecute toda la funcion en cuanto metamos los datos y apretemos el boton submit
  const nombre = document.getElementById('nombreCompleto').value;
  const correo = document.getElementById('correoUsuario').value;
  const telefono = document.getElementById('telefono').value;                //aqui registra como una constante cada id que hallamos puesto en el html
  const contrasena = document.getElementById('contrasena').value;
  const mensajeElement = document.getElementById('mensaje');
  //usando los codigos de los que usted recomendo
  const regexNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexTelefono = /^(6|7)[0-9]{7,12}$/;    // Aqui aumente el (6|7) para que solo acepte numeros tenefonicos que empiecen con unos de los dos
  const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  // Estos if son para que aparezca un mensaje cuando no halla cumplido la entrada de datos con las especificaciones del regex
  if (!regexNombre.test(nombre)) {
      mensajeElement.textContent = "El Nombre Completo solo debe contener letras y espacios.";
      return;
  }
  if (!regexCorreo.test(correo)) {
      mensajeElement.textContent = "Ese correo no es válido para el registro";
      return;
  }
  if (!regexTelefono.test(telefono)) {
      mensajeElement.textContent = "El Teléfono debe contener 8 digitos y empezar con 6 o 7.";
      return;
  }
  if (!regexContrasena.test(contrasena)) {
      mensajeElement.textContent = "La contraseña debe tener al menos 6 caracteres, incluir mayúscula, minúscula, número y un carácter especial.";
      return;
  }
  // al usuario lo volvemos un objeto 
  const usuario = {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena, 
      bloqueado: false,
      intentosFallidos: 0  // le ponemos un contador como una propiedad 
  };
  
  localStorage.setItem('usuarioSistema', JSON.stringify(usuario)); 
  mensajeElement.textContent = `¡Cuenta creada con éxito para ${nombre}! Ahora puedes iniciar sesión.`;
  mensajeElement.style.color = 'green';
  document.getElementById('registroForm').reset(); // Despues de guardar el formulario de limpiara automaticamente
});
// Con esta funcion nos permitira ver y esconder (ocultar) la contraseña 
function contra(id) {
  const input = document.getElementById(id);
  const span = input.nextElementSibling; // este codigo busca el input que este dentro del span para que se una a la accion de la funcion
  if (input.type === "password") {
      input.type = "text";
      span.textContent = '👁️‍🗨️';// el contenido del span se cambia a las letras (lo muestra)
  } else {
      input.type = "password";
      span.textContent = '👁️';// el contenidi del span solo se queda oculto
  }
}

