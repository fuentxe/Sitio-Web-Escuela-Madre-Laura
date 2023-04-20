import { getItems, getAllItems, llenarTablaPagos } from "./firebase.js";


const tabla = document.getElementById("reportes_solicitud");

export const llenarTablaReporteSolicitud = async (usuario) => {
    if (tabla && usuario) {
        // let items = await getAllItems(usuario);
        let items = await getItems("solicitudes", usuario.uid); 
        let body = tabla.querySelector("tbody");
        body.innerHTML = "";
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let tr = document.createElement("tr");
            let html = `
            <td>${item.data.nombre || "-"}</td>
            <td>${item.data.apellido || "-"}</td>
            <td>${item.data.fecha_nacimiento ? item.data.fecha_nacimiento : "-"}</td>
            <td>${item.data.cedula ? item.data.cedula : "-"}</td>
            <td>${item.data.telefono || "-"}</td>
            <td>${item.data.fecha_egreso ? item.data.fecha_egreso : "-"}</td>
            <td>${item.data.documento || "-"}</td>
            <td>${item.data.revisado ? "Revisado" : "-"}</td>
            <td>${item.data.fecha.toDate().toLocaleDateString("es-ES")}</td>
            `;
            tr.innerHTML = html;
            body.appendChild(tr);
            tr.addEventListener("click", (e) => {
                console.log("click");
            })
        }
    }
}

