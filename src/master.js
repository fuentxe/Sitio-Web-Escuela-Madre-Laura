import {crearUsuarioMaster} from "./firebase" // lo traemos de app no?


const formulario_master  = document.querySelector("#formulario_master")
const roles_usuario = document.getElementById("roles_usuario");
const  nombre_master = document.querySelector("#nombre_master"); 
const  apellido_master = document.querySelector("#apellido_master"); 
const  clave_master = document.querySelector("#contraseña_master"); 
const  confirmar_master = document.querySelector("#confirmar_master"); 
const  correo_master = document.querySelector("#correo_master"); 


function comprobar_campos() { // ta aqui
    return nombre_master.value && nombre_master.value.length >= 3 &&
        apellido_master.value &&
        apellido_master.value.length >= 3 &&
        correo_master.value &&
        correo_master.value.length >= 3 &&
        clave_master.value &&
        clave_master.value.length >= 6 &&
        confirmar_master.value === clave_master.value;
}

 export const agregarEventoRegistroMaster = (usuario) => {
    if (formulario_master)
    if (!usuario || (usuario.rol != "Master")) {
        window.location.href = __dirname;
    }
    formulario_master.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (comprobar_campos()) {
            let user = {
                rol: roles_usuario.value,
                email: correo_master.value.trim().toLowerCase(),
                pass: clave_master.value,
                nombre: nombre_master.value,
                apellido: apellido_master.value
            };
            let response = await crearUsuarioMaster(user, usuario); // no ta aqui
            console.log(response);
            if (response.creado) {
                Swal.fire(
                    '¡Muy Bien!',
                    'Usuario Creado',
                    'success'
                ).then((result) => {
                    if(result.value){
                window.location.reload();
                    }
                })
            } else {
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
        if (roles_usuario.value === "Seleccione el Rol del Usuario"){
            alert("selecione el rol del usuario");
            return;
        }
    })
}
