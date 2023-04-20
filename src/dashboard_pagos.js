import { getItems, verificarPago } from "./firebase.js";


const tabla = document.getElementById("tabla_pagos");
const modalBody = document.getElementById("modal_body");
const btnModal = document.getElementById("btn_modal");
let estadoModal = null;
let listener = null;



const showModal = (id, item, tipo, usuario) => {
    modalBody.innerHTML = "";
    let html = "";
    if (tipo == "pagos") {
        estadoModal = "pagos";
        btnModal.addEventListener("click", async (e) => {
            if (estadoModal == "pagos") {
                if (usuario.rol === "Pagos"  || usuario.rol === "Master"){
                    let res = await verificarPago(id); // Esto era asi?   si eso es parta confirmar el proceso
                    console.log(res);
                    if (res.result) {
                        Swal.fire(
                            '¡Muy Bien!',
                            'Pago Confirmado',
                            'success'
                            ).then((result) => {
                                if(result.value){
                                    window.location.reload();
                                }
                            })
                        }
                    }
                }
            
        })
        html = `
        <div id="descarga" >
        <div class="form-row ">
                <div class="name">Estudiante*</div>
                <div class="value">
                    <div class="row row-space">
                        <div class="input-group">
                            <input id="pago_estudiante" readonly class="input--style-5" type="text"
                                value="${item.estudiante}">
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-row ">
                <div class="name">Cédula</div>
                <div class="value">
                        <div class="input-group">
                            <input id="pago_cedula" class="input--style-5" value="${item.cedula}" readonly type="text"
                                name="cedula" minlength="8">
                        </div>
                    </div>
                </div>

           <div class="form-row">
            <div class="name">Banco*</div>
            <div class="value">                  
                   <div class="input-group">
                       <input id="pago_estudiante" readonly class="input--style-5" type="text"
                           value="${item.banco}">
                   </div>
               </div>
           </div>

           <div class="form-row ">
           <div class="name">Referencia*</div>
           <div class="value">

                  <div class="input-group">
                      <input id="pago_estudiante" readonly class="input--style-5" type="text"
                          value="${item.referencia}">
                  </div>
              </div>
          </div>


          <div class="form-row">
          <div class="name">Mes*</div>
          <div class="value">
                 <div class="input-group">
                     <input id="pago_estudiante" readonly class="input--style-5" type="text"
                         value="${item.mes}">
                 </div>
             </div>
         </div>





         <div class="form-row">
         <div class="name">Seccion*</div>
         <div class="value">
                <div class="input-group">
                    <input id="pago_estudiante" readonly class="input--style-5" type="text"
                        value="${item.seccion}">
                </div>
            </div>
        </div>

        <div class="form-row">
        <div class="name">Nivel*</div>
        <div class="value">
               <div class="input-group">
                   <input id="pago_estudiante" readonly class="input--style-5" type="text"
                       value="${item.primaria ? "Primaria" : "Bachiller"}"> 
               </div>
           </div>
       </div>

       <div class="form-row">
       <div class="name">Fecha de pago*</div>
       <div class="value">
              <div class="input-group">
                  <input id="pago_estudiante" readonly class="input--style-5" type="text"
                      value="${item.fecha.toDate().toLocaleDateString("es-ES")}"> 
              </div>
          </div>
      </div>

      <a  href="${item.comprobante}" target ="_blank" style="color: #009CFF;"  ><img id="COMPROBANTE" src="" alt="">Abrir capture de pago</a>           </div>

           


            `;
    } else if (tipo == 0) {

    }
    modalBody.innerHTML = html;
    document.getElementById("lanzar_modal").click();
}

    export const llenarTablaPagos = async (collection, usuario) => {
    if (tabla) {
        if (!usuario || (usuario.rol != "Pagos" && usuario.rol != "Secretaria" && usuario.rol != "Master")) {
            window.location.href = __dirname;
        }
        let items = await getItems(collection);
        let body = tabla.querySelector("tbody");
        body.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let tr = document.createElement("tr");
            let html = `
            <td>${item.data.estudiante}</td>
            <td>${item.data.cedula}</td>
            <td>${item.data.banco}</td>
            <td>${item.data.referencia}</td>
            <td>${item.data.mes}</td>
            <td>${item.data.seccion}</td>
            <td>${item.data.primaria ? "Primaria" : "Bachiller"}</td>
            <td>${item.data.fecha.toDate().toLocaleDateString("es-ES")}</td>
            <td>${item.data.revisado ? "Revisado" : "-"}</td>
            `;
            tr.innerHTML = html;
            body.appendChild(tr);
            tr.addEventListener("click", (e) => {
                showModal(item.id, item.data, collection, usuario);
            })
        }
    }
}

