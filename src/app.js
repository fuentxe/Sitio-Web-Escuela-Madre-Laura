

import { cerrarSesion, onAuthStateChanged, getUsuarioFirebase } from "./firebase.js"  // vale
import { agregarEventoRegistro } from "./registro"
import {agregarEventoRegistroMaster} from "./master"

import { Auth } from "./firebase.js"
import { agregarEventoLogin } from "./login.js";

import { agregarEventoPagos } from "./gestionar.js";
import { agregarEventoSolicitud } from "./solicitud.js";
import { agregarEventoAdmision } from "./admision.js";
import { llenarTablaPagos } from "./dashboard_pagos";
import { llenarTablaSolicitud } from "./dashboard_solicitud";
import { llenarTablaCenso } from "./dashboard_censo";
import { llenarTablaReportePagos } from "./reporte_pagos.js";
import { llenarTablaReporteCenso } from "./reporte-censo.js"; 
import { llenarTablaReporteSolicitud } from "./reporte_solicitud.js";




const elemento_censo = document.querySelector("#elemento_censo");
const elemento_dashbord = document.querySelector("#elemento_dashbord");
const elemento_pago = document.querySelector("#elemento_pago");
const elemento_solicitud = document.querySelector("#elemento_soli");
const dashboard_pagos = document.querySelector("#dashboard_pagos");
const dashboard_solicitud = document.querySelector("#dashboard_solicitud");
const dashboard_censo = document.querySelector("#dashboard_censo");
const proce = document.querySelector("#procesos");
const flecha = document.querySelector("#flecha");
const procesos_admin = document.querySelector("#procesos_admin");
const dashboard_pagos1 = document.querySelector("#dashboard_pagos1");
const dashboard_solicitud1 = document.querySelector("#dashboard_solicitud1");
const dashboard_censo1 = document.querySelector("#dashboard_censo1");
const proce1 = document.querySelector("#procesos1");
const procesos_admin1 = document.querySelector("#procesos_admin1");
const reporte_pagos = document.querySelector("#reporte_pagos");
const reporte_censo = document.querySelector("#reporte_censo");
const reporte_solicitud = document.querySelector("#reporte_solicitud");
const nombre = document.querySelector("#display_name");
const usuario = document.querySelector("#nombre_usuario");
const flecha_reporte = document.querySelector("#flecha_reporte");
const procesos_reporte = document.querySelector("#procesos_reporte");
const nosotros = document.querySelector("#nosotros");
const galeria = document.querySelector("#galeria");



const index_cerrar_sesion = document.getElementById("index_cerrar_sesion");
const index_registrar = document.getElementById("index_registrarse");
const index_sesion = document.getElementById("index_sesion");

const btnCerrarSesion = document.getElementById("btn_cerrar_sesion");

export const comprobarEstado = () => {
    console.log(window.location.pathname);
    if (window.location.pathname == "/inicio-de-sesion.html" && Auth.currentUser) { 
        console.log(Auth.currentUser.rol);
        if (Auth.currentUser.rol && Auth.currentUser.rol === "Secretaria") {
            window.location.href = "/dashboard/pagos_secretaria.html";
        }
        else if (Auth.currentUser.rol && Auth.currentUser.rol === "Solicitud") {
            window.location.href = "/dashboard/solicitud.html";
        }
        else if (Auth.currentUser.rol && Auth.currentUser.rol === "Pagos") {
            window.location.href = "/dashboard/pagos.html"
        }
        else if (Auth.currentUser.rol && Auth.currentUser.rol === "Censos"){
            window.location.href = "/dashboard/admision.html"
        }
        else if (Auth.currentUser.rol && Auth.currentUser.rol === "Master") {
            window.location.href = "/dashboard/pagos_master.html"
        }
        else {
            window.location.href = __dirname;
        }
    }

    if (Auth.currentUser) {
        if (nosotros && galeria) {
            nosotros.style.display = "none";
            galeria.style.display = "none";
        }
        if (index_registrar)
            index_registrar.style.display = "none";
        if (index_cerrar_sesion)
            index_cerrar_sesion.style.display = "block";
        if (index_sesion)
            index_sesion.style.display = "none";
        if (elemento_censo)
            elemento_censo.style.display = "block";
        if (elemento_pago)
            elemento_pago.style.display = "block"
        if (elemento_solicitud)
            elemento_solicitud.style.display = "block"
        if (elemento_dashbord)
            elemento_dashbord.style.display = "block";
        if (dashboard_solicitud)
            dashboard_solicitud.style.display = "block";
        if (dashboard_pagos)
            dashboard_pagos.style.display = "block";
        if (dashboard_censo)
            dashboard_censo.style.display = "block";
        if (proce)
            proce.style.display = "block";
        if (flecha)
            flecha.style.display = "block";
        if (procesos_admin)
            procesos_admin.style.display = "block";
        if (dashboard_solicitud1)
            dashboard_solicitud1.style.display = "block";
        if (dashboard_pagos1)
            dashboard_pagos1.style.display = "block";
        if (dashboard_censo1)
            dashboard_censo1.style.display = "block";
        if (proce1)
            proce1.style.display = "block";
        if (procesos_admin1)
            procesos_admin1.style.display = "block";
        if (reporte_pagos)
            reporte_pagos.style.display = "block";
        if (reporte_solicitud)
            reporte_solicitud.style.display = "block";
        if (reporte_censo)
            reporte_censo.style.display = "block";
        if (nombre) {
            nombre.style.display = "block";
            nombre.textContent = Auth.currentUser.displayName; // gei, gei gei gei
        }
        if (usuario)
            usuario.style.display = "block";
        if (flecha_reporte)
            flecha_reporte.style.display = "block";
        if (procesos_reporte)
            procesos_reporte.style.display = "block";

    }
}

if (btnCerrarSesion)
    btnCerrarSesion.addEventListener("click", async (e) => {
        await (cerrarSesion)();
        window.location.href = __dirname;
    });



      onAuthStateChanged(Auth, async (user) => {
    if (user) {
        let rol = await getUsuarioFirebase(user.uid);
        console.log("rol", rol);
        if (rol && !rol.error) {
            console.log();
            Auth.currentUser.rol = rol
        }
     }
    comprobarEstado();
    agregarEventoPagos(user);
    agregarEventoSolicitud(user);
    agregarEventoAdmision(user);
    llenarTablaPagos("pagos", user);
    llenarTablaCenso("admisiones", user);
    llenarTablaSolicitud("solicitudes", user);
    llenarTablaReportePagos(user);
    llenarTablaReporteCenso(user);
    llenarTablaReporteSolicitud(user);
    agregarEventoRegistroMaster(user);
    // PErro
}, (err) => {
    console.error(err);
});

agregarEventoRegistro();
agregarEventoLogin();
