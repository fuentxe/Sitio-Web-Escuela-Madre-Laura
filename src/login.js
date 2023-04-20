import { getUsuarioFirebase, iniciarSesion } from "./firebase.js" // dice que no se esta usando... no recuerdo si era aqui

const formularioLogin = document.getElementById("login_formulario");
const emailLogin = document.querySelector("#login_email");
const claveLogin = document.querySelector("#login_clave");

export const agregarEventoLogin = () => {
    if (formularioLogin) 
        formularioLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            let res = await iniciarSesion({ email: emailLogin.value, pass: claveLogin.value });
            if (!res.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Correo No Registrado!',
                  
                  })
               
               if(res.error === "Firebase: Error (auth/wrong-password)."){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Contraseña Incorrecta!',
                  
                  })
               }
            // } else if(emailLogin.value && claveLogin.value ) {
            //     window.location.href = "/dashboard/Pagos.html";
            // }
            // else if(emailLogin.value === "admin@gmail.com" && claveLogin.value === "admin1234"){
            //     window.location.href = "/dashboard/admision.html";
            // }
            // else if (emailLogin.value === "soli@gmail.com" && claveLogin.value === "soli1234"){
            //     window.location.href = "/dashboard/solicitud-doc.html";
            // }
            // else if (emailLogin.value === "secre@gmail.com" && claveLogin.value === "secre1234"){
            //   window.location.href = "/dashboard/Pagos_secretaria.html";  
            // }
            // else if (emailLogin.value === "master@gmail.com" && claveLogin.value === "master1234"){
            //     window.location.href = "/dashboard/admision_master.html"
            // }
            // else{
            //     window.location.href = __dirname
            }
        }) 
}