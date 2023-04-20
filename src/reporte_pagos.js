import { getItems, getAllItems, } from "./firebase.js";


const tabla = document.getElementById("reportes_pagos");

 export const llenarTablaReportePagos = async (usuario) => {
    if (tabla && usuario) {
        // let items = await getAllItems(usuario);
        let items = await getItems("pagos", usuario.uid);
        let body = tabla.querySelector("tbody");
        body.innerHTML = "";
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let tr = document.createElement("tr");
            let html = `
            <td>${item.data.estudiante ? item.data.estudiante : "-"}</td>
            <td>${item.data.cedula ? item.data.cedula : "-"}</td>
            <td>${item.data.telefono || "-"}</td>
            <td>${item.data.mes || "-"}</td>
            <td>${item.data.banco || "-"}</td>
            <td>${item.data.primaria ? "Primaria" : "Bachiller" || 0}</td>
            <td>${item.data.seccion || "-"}</td>
            <td>${item.data.referencia || "-"}</td>
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

