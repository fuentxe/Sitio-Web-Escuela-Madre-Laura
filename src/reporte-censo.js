import { getItems, getAllItems, llenarTablaPagos } from "./firebase.js";


const tabla = document.getElementById("reportes_censo");

 export const llenarTablaReporteCenso = async (usuario) => {
    if (tabla && usuario) {
        // let items = await getAllItems(usuario); // trae todo
        let items = await getItems("admisiones", usuario.uid);
        let body = tabla.querySelector("tbody");
        body.innerHTML = "";
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let tr = document.createElement("tr");
            let html = `
            <td>${item.data.nombre}</td>
            <td>${item.data.apellido}</td>
            <td>${item.data.estudio}</td>
            <td>${item.data.nombre_hermano}</td>
            <td>${item.data.apellido_hermano }</td>
            <td>${item.data.grado }</td>
            <td>${item.data.seccion }</td>
            <td>${item.data.telefono }</td>
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

