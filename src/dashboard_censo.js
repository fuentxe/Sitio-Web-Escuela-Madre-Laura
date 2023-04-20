import { getItems, verfificarCenso, } from "./firebase";



const tabla = document.getElementById("tabla_censo");
const modalBody = document.getElementById("modal_body");
const btnModal = document.getElementById("btn_modal");
// const descarga = document.querySelector("#descarga");
let estadoModal = null;
let listener = null;

const showModal = (id, item, tipo, usuario) => {
    modalBody.innerHTML = "";
    let html = "";
    if (tipo == "admisiones") {
        estadoModal = "admisiones";
        btnModal.addEventListener("click", async (e) => {
            if (estadoModal == "admisiones") {
                if (usuario.rol === "Censos" || usuario.rol === "Master"){
                    let res = await verfificarCenso(id);
                    console.log(res);
                    if (res.result) {
                         Swal.fire(
                            '¡Muy Bien!',
                            'Censo Confirmado',
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

            <div class="form-row ">
                <div class="name">Apellidos</div>
                <div class="value">

                        <div class="input-group">
                            <input id="pago_cedula" class="input--style-5" value="${item.apellido}" readonly type="text"
                                name="cedula" minlength="8">
                        </div>
                    </div>
                </div>

           <div class="form-row">
            <div class="name">Escolarizado</div>
            <div class="value">                  
                   <div class="input-group">
                       <input id="pago_estudiante" readonly class="input--style-5" type="text"
                           value="${item.estudio}">
                   </div>
               </div>
           </div>

           <div class="form-row ">
           <div class="name">Nombres del hermano</div>
           <div class="value">

                  <div class="input-group">
                      <input id="pago_estudiante" readonly class="input--style-5" type="text"
                          value="${item.nombre_hermano}">
                  </div>
              </div>
          </div>


          <div class="form-row">
          <div class="name">Apellidos del hermano</div>
          <div class="value">
                 <div class="input-group">
                     <input id="pago_estudiante" readonly class="input--style-5" type="text"
                         value="${item.apellido_hermano}">
                 </div>
             </div>
         </div>





         <div class="form-row">
         <div class="name">Grado</div>
         <div class="value">
                <div class="input-group">
                    <input id="pago_estudiante" readonly class="input--style-5" type="text"
                        value="${item.grado}">
                </div>
            </div>
        </div>

        <div class="form-row">
        <div class="name">Sección</div>
        <div class="value">
               <div class="input-group">
                   <input id="pago_estudiante" readonly class="input--style-5" type="text"
                       value="${item.seccion}"> 
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

     export const llenarTablaCenso = async (collection, usuario) => {
    if (tabla) {
        if (!usuario || (usuario.rol != "Censos" && usuario.rol != "Secretaria"  && usuario.rol != "Master")) {
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
            <td>${item.data.estudio}</td>
            <td>${item.data.nombre_hermano}</td>
            <td>${item.data.apellido_hermano}</td>
            <td>${item.data.grado}</td>
            <td>${item.data.seccion}</td>
            <td>${item.data.telefono}</td>
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

