const header = `
<div class="container">
  <div class="row">
    <div class="col-12">
      <nav class="main-nav">
        <!-- ***** Logo Start ***** -->
        <a href="index.html" class="logo">
          <img src="assets/images/logo.jpg" style="width: 85px; border-radius: 35%;" alt="logo"> </a>
        <!-- ***** Logo End ***** -->
        <!-- ***** Menu Start ***** -->
        <ul class="nav">
          <li><a href="index.html">Inicio</a></li>
          <li style= "display:none" id="flecha" class="has-sub">
            <a style= "display:none" id="procesos" href="javascript:void(0)">Procesos</a>
            <ul class="sub-menu">
            <li style="display: none" id="elemento_pago"><a href="gestiona-tu-pago.html">~ Gestiona tu Pago</a></li>
            <li style="display: none" id="elemento_censo"><a href="censo-estudiantil.html">~ Proceso de Admisión</a></li>
            <li style="display: none" id="elemento_soli"><a href="solicitud-doc.html">~ Solicitud de Documentos</a></li>
            </ul>
            </li>

            <li style= "display:none" id="flecha_reporte" class="has-sub">
            <a style= "display:none" id="procesos_reporte" href="javascript:void(0)">Reportes</a>
            <ul class="sub-menu">
            <li style="display: none" id="reporte_pagos"><a href="./REPORTES/reporte-pagos.html">~ Reporte Pagos </a></li>
            <li style="display: none" id="reporte_censo"><a href="./REPORTES/reporte-censo.html">~ Reporte Admisión </a></li>
            <li style="display: none" id="reporte_solicitud"><a href="./REPORTES/reporte-solicitud.html" >~ Reporte Solicitud </a></li>
            </ul>
            </li>

            <li style="display: block" id="nosotros"><a href="sobre-nosotros.html">Sobre Nosotros</a></li>
              <li style="display: block" id="galeria"><a href="galeria.html">Galería</a></li>

          <li id="index_sesion"><a href="inicio-de-sesion.html">Iniciar Sesión</a></li>

          <div class="main-button-red" id="index_registrarse">
            <div><a href="registro.html">Registrarse</a></div>
          </div>
          
          <div class="main-button-red" id="index_cerrar_sesion" style="display: none;">
          <div><a href="#" id="btn_cerrar_sesion">Cerrar Sesion</a></div>
          </div>
          
          <li > <i style="font-size: 21px; color: #f5a425; display:none;" class="far fa-user-circle" id="nombre_usuario" > Usuario:</i> <a href="#" id="display_name" > </a> </li>


        </ul>
        <a class='menu-trigger'>
          <span>Menu</span>
        </a>

        <!-- ***** Menu End ***** -->
      </nav>
    </div>
  </div>
</div>`
document.querySelector("header").innerHTML = header;