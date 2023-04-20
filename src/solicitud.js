import { insertInCollection } from "./firebase.js"


const nombre = document.getElementById("nombre");
const apellido = document.querySelector("#apellido");
const fecha_nacimiento = document.querySelector("#fecha_nacimiento");
const cedula = document.querySelector("#cedula");
const telefono = document.querySelector("#telefono");
const fecha_egreso = document.querySelector("#fecha_egreso");
const documento = document.querySelector("#documento");
const formulario_solicitud = document.querySelector("#formulario_solicitud");

 export const agregarEventoSolicitud = (usuario) => {
    if (formulario_solicitud && usuario) {
        formulario_solicitud.addEventListener("submit", async (e) => {
            e.preventDefault();
            let solicitud = {
                nombre: nombre.value,
                apellido: apellido.value,
                cedula: cedula.value,
                telefono: telefono.value,
                documento: documento.value,
                usuario: usuario.uid,
                fecha_nacimiento: fecha_nacimiento.value,
                fecha: null,
                fecha_egreso: fecha_egreso.value,
                revisado: false
            };
            let res = await insertInCollection("solicitudes", solicitud);

            if( telefono.value.length > 11 || telefono.value.length < 11 ){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Número de teléfono incorrecto!'
                 
                  })
                return;
            }
            if (cedula.value.length > 8 || cedula.value.length < 8 ){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Número de cédula incorrecto!'
                 
                  })
                return;
            }

            if (res.result) {
                Swal.fire(
                    '¡Muy Bien!',
                    'Solicitud Enviada Correctamente',
                    'success'
                ).then((result) => {
                    if(result.value){
            window.location.href = __dirname;
                    }
                })

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Intentelo Nuevamente',
              }).then((result) => {
                    if(result.value){
            window.location.reload();
                    }
                })

        }
        }) 
    }
}

// function format(inputDate) {
//     let date, month, year;

//     date = inputDate.getDate();
//     month = inputDate.getMonth() + 1;
//     year = inputDate.getFullYear();

//     date = date
//         .toString()
//         .padStart(2, '0');

//     month = month
//         .toString()
//         .padStart(2, '0');

//     return `${date}/${month}/${year}`;
// }
