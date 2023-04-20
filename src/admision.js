import { collection } from "firebase/firestore";
import { insertInCollection } from "./firebase.js"


const nombre = document.querySelector("#nombre");
const apellido= document.querySelector("#apellido");
const estudio = document.querySelector("#estudio");
const nombre_hermano = document.querySelector("#nombre_hermano");
const apellido_hermano = document.querySelector("#apellido_hermano");
const grado = document.querySelector("#grado");
const formulario_admision = document.querySelector("#formulario_admision")
const seccion_a = document.querySelector("#seccion_a");
const seccion_b = document.querySelector("#seccion_b");
const telefono = document.querySelector("#telefono");

export const agregarEventoAdmision = (usuario) => {
    if(formulario_admision && usuario)
        formulario_admision.addEventListener("submit", async (e) => {
            e.preventDefault();
            let admision = {
                nombre: nombre.value,
                apellido: apellido.value,
                telefono: telefono.value,
                nombre_hermano:nombre_hermano.value,
                apellido_hermano:apellido_hermano.value,
                grado:grado.value,
                estudio: estudio.checked ? "Si" : "No",
                seccion: seccion_a.checked ? "A" : seccion_b.checked ? "B" : "C",
                revisado: false,
                usuario: usuario.uid
            };
            let res = await insertInCollection("admisiones", admision);
            if (telefono.value.length > 11 || telefono.value.length < 11 ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Número de teléfono incorrecto!',
                 
                  })
                return;
            }
             else if ( grado.value === "Seleccione el grado del Hermano"){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Seleccione el grado del hermano!',
                 
                  })
                return;
            }

  
            if (res.result) {
                Swal.fire(
                    '¡Muy Bien!',
                    'Datos Enviados Correctamente',
                    'success'
                ).then((result) => {
                    if(result.value){
            window.location.href = __dirname;
                    }
                })

        }else {
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

