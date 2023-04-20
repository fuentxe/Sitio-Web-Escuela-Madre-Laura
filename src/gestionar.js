import { guardarPago } from "./firebase";

const estudiante = document.querySelector("#estudiante");
const cedula = document.querySelector("#cedula");
const telefono = document.querySelector("#telefono");
const mes = document.querySelector("#mes");
const banco = document.querySelector("#banco");
const primaria = document.querySelector("#primaria");
const bachiller = document.querySelector("#bachiller");
const comprobante = document.querySelector("#comprobante");
const referencia = document.querySelector("#referencia"); 
const formulario_pago = document.querySelector("#formulario_pago");
const seccion_a = document.querySelector("#seccion_a");
const seccion_b = document.querySelector("#seccion_b");



export const agregarEventoPagos = (usuario) => {
    if(formulario_pago && usuario)
        formulario_pago.addEventListener("submit", async (e) => {
            e.preventDefault();
            let pago = {
                estudiante: estudiante.value,
                cedula: cedula.value || "",
                telefono: telefono.value,
                mes: mes.value,
                banco: banco.value,
                primaria: primaria.checked,
                bachiller: bachiller.checked,
                comprobante: comprobante.files[0],
                seccion: seccion_a.checked ? "A" : seccion_b.checked ? "B" : "C",
                usuario: usuario.uid,
                referencia:referencia.value,
                fecha: null,
                revisado: false
            };

            if(mes.value === "Seleccione el mes que esta pagando"){
                alert("seleccione un mes")
                return;
            } else if (banco.value === "Seleccione su banco"){
                alert("Seleccione un banco")
                return;
            }
            else if (cedula.value.length > 8 || cedula.value.length < 8){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Número de cédula incorrecto!'
                 
                  })
                return;
            }
            else if (telefono.value.length > 11 || telefono.value.length < 11 ){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El número de teléfono no puede ser mayor ni menor a 11 números!'
                  })
                return;
            }
            else if (referencia.value.length > 8 || referencia.value.length < 8){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Número de refencia incorrecto!'
                  })
                return;
            }

            let res = await guardarPago(pago);
            if (res.result) {
                Swal.fire(
                    '¡Muy Bien!',
                    'Pago Enviado Correctamente',
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

