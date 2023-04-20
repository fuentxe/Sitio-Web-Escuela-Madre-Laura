import { getItems, verificarSolicitud } from "./firebase.js";

const tabla = document.getElementById("tabla_solicitud");
const modalBody = document.getElementById("modal_body");
const btnModal = document.getElementById("btn_modal");
let estadoModal = null;
let listener = null;



const showModal = (id, item, tipo, usuario) => {
    modalBody.innerHTML = "";
    let html = "";
    if (tipo == "solicitudes") {
        estadoModal = "solicitudes";
        btnModal.addEventListener("click", async (e) => {
            if (estadoModal == "solicitudes") {
                if (usuario.rol === "Solicitud" || usuario.rol === "Master") {
                        let res = await verificarSolicitud(id);
                    console.log(res);
                    if (res.result) {
                    Swal.fire(
                        '¡Muy Bien!',
                        'Solicitud Confirmada',
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
                <div class="name">Nombres</div>
                <div class="value">
                    <div class="row row-space">
                        <div class="input-group">
                            <input id="pago_estudiante" readonly class="input--style-5" type="text"
                                value="${item.nombre}">
                        </div>
                    </div>
                </div>
            </div>
    
            <div>
            <div class="form-row ">
                <div class="name">Apellidos</div>
                <div class="value">
                        <div class="input-group">
                            <input id="pago_cedula" class="input--style-5" value="${item.apellido}" readonly type="text"
                                name="cedula" minlength="8">
                        </div>
                    </div>
                </div>
            </div>
    
           <div class="form-row">
            <div class="name">Fecha de nacimiento</div>
            <div class="value">                  
                   <div class="input-group">
                       <input id="pago_estudiante" readonly class="input--style-5" type="text"
                           value="${item.fecha_nacimiento}">
                   </div>
               </div>
           </div>
    
           <div class="form-row ">
           <div class="name">Cédula</div>
           <div class="value">
                  <div class="input-group">
                      <input id="pago_estudiante" readonly class="input--style-5" type="text"
                          value="${item.cedula}">
                  </div>
              </div>
          </div>
    
    
          <div class="form-row">
          <div class="name">Teléfono</div>
          <div class="value">
                 <div class="input-group">
                     <input id="pago_estudiante" readonly class="input--style-5" type="text"
                         value="${item.telefono}">
                 </div>
             </div>
         </div>
    
    
    
    
    
         <div class="form-row">
         <div class="name">Fecha de Egreso</div>
         <div class="value">
                <div class="input-group">
                    <input id="pago_estudiante" readonly class="input--style-5" type="text"
                        value="${item.fecha_egreso}">
                </div>
            </div>
        </div>
    
        <div class="form-row">
        <div class="name">Tipo de </div>
        <div class="value">
               <div class="input-group">
                   <input id="pago_estudiante" readonly class="input--style-5" type="text"
                       value="${item.documento}"> 
               </div>
           </div>
       </div>
    
       <div class="form-row">
       <div class="name">Fecha</div>
       <div class="value">
              <div class="input-group">
                  <input id="pago_estudiante" readonly class="input--style-5" type="text"
                      value="${item.fecha.toDate().toLocaleDateString("es-ES")}"> 
              </div>
          </div>
      </div>
    
    
    
    </div>

     

            `;
    } else if (tipo == 0) {

    }
    modalBody.innerHTML = html;
    document.getElementById("lanzar_modal").click();
}

export const llenarTablaSolicitud = async (collection, usuario) => {
    if (tabla ) {
        console.log("Tabla", usuario);
        if (!usuario || (usuario.rol != "Solicitud" && usuario.rol != "Secretaria"  && usuario.rol != "Master")) {
            window.location.href = __dirname;
        }
        let items = await getItems(collection);
        let body = tabla.querySelector("tbody");
        body.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let tr = document.createElement("tr");
            let html = `
            <td>${item.data.nombre}</td>
            <td>${item.data.apellido}</td>
            <td>${item.data.fecha_nacimiento}</td>
            <td>${item.data.cedula}</td>
            <td>${item.data.telefono}</td>
            <td>${item.data.fecha_egreso}</td>
            <td>${item.data.documento}</td>
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

