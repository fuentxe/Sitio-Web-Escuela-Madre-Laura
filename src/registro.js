import { crearUsuario, getUsuarioFirebase } from "./firebase.js"


const formularioRegistro = document.getElementById("formulario_registro");
const nombre_registro = document.querySelector("#registro_nombre");
const apellido_registro = document.querySelector("#registro_apellido");
const email_registro = document.querySelector("#registro_email");
const clave_registro = document.querySelector("#registro_contraseña");
const confirmar = document.querySelector("#registro_confirmar");

function comprobar_campos() {
    return nombre_registro.value &&
        nombre_registro.value.length >= 3 &&
        apellido_registro.value &&
        apellido_registro.value.length >= 3 &&
        email_registro.value &&
        email_registro.value.length >= 3 &&
        clave_registro.value &&
        clave_registro.value.length >= 6 &&
        confirmar.value === clave_registro.value;
}

 export const agregarEventoRegistro = () => {
    if (formularioRegistro)
    formularioRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (comprobar_campos()) {
            let response = await crearUsuario({
                email: email_registro.value,
                pass: clave_registro.value,
                nombre: nombre_registro.value,
                apellido: apellido_registro.value
            });
            if (response.creado) {
                Swal.fire(
                    '¡Muy Bien!',
                    'Usuario Creado',
                    'success'
                ).then((result) => {
                    if(result.value){
            window.location.href = __dirname;
                    }
                })
            } 
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El Correo ya Existe!',
                  
                  })
            }
            
        } else{
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Las Contraseñas NO Coinciden!',
              
              })
        }
    })
}
