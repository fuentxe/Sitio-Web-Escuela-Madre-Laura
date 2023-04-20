
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDocs, query,orderBy, where, getDoc, addDoc, doc, collection, updateDoc, serverTimestamp } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, updateCurrentUser, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth"
import { getStorage, getDownloadURL, uploadBytes, ref as refStorage, ref } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";
export {onAuthStateChanged};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1sTa3hb0VKyKgGCNkF83Ov9A9tiCHQz0",
    authDomain: "madre-laura.firebaseapp.com",
    projectId: "madre-laura",
    storageBucket: "madre-laura.appspot.com",
    messagingSenderId: "658421149134",
    appId: "1:658421149134:web:8617a4b6186c2f7caf4f9f",
    measurementId: "G-C6332CETH0"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // este, joder
const firestore = getFirestore(app);
const storage = getStorage(app);

const colleciones = ["pagos", "admisiones", "solicitudes"];

export {auth as Auth}

export const crearUsuario = async (usuario) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, usuario.email, usuario.pass);
        let user = userCredential.user;
        user.displayName = usuario.nombre + " " + usuario.apellido;
        await updateProfile(user, {
            displayName: usuario.nombre + " " + usuario.apellido
        });

        let refDoc = doc(firestore, "usuarios/" + user.uid);
        let data = await setDoc(refDoc, {
            nombre: user.displayName,
            clave: usuario.pass,
            correo: user.email
        });

        console.log(user, data);
        return { creado: true };
    } catch (err) {
        console.error(err);
        return { error: err.message }
    }
}

export const iniciarSesion = async (usuario) => {
    try {
        let user = await signInWithEmailAndPassword(auth, usuario.email, usuario.pass);
        return { user: user };
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}

export const cerrarSesion = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
        return null;
    }
}

 export default (app);

 export const guardarPago = async (pago) => {
    try {
        let comprobante = pago.comprobante;
        pago.comprobante = "";
        let ext = comprobante.name.split(".").pop();

        let rich = collection(firestore, "pagos");
        pago.fecha = serverTimestamp();
        let datos = await addDoc(rich, pago);

        let refStg = ref(storage, `pagos/${datos.id}.${ext}`);
        let stgRes = await uploadBytes(refStg, comprobante);

        let url = await getDownloadURL(stgRes.ref);

        await updateDoc(datos, { comprobante: url });

        return { result: pago };
    } catch (err) {

        console.error(err);
        return { error: err.message }
    }
}

export const verificarPago = async (id) => {
    try {
        await updateDoc(doc(firestore, "pagos/" + id), { revisado: true });
        return { result: id }
    } catch (err) {
        return { error: err.message }
    }
}

 export const verfificarCenso = async (id) => {
    try {
        await updateDoc(doc(firestore, "admisiones/" + id), { revisado: true });
        return { result: id }
    } catch (err) {
        return { error: err.message }
    }
}

 export const verificarSolicitud = async (id) => {
    try {
        await updateDoc(doc(firestore, "solicitudes/" + id), { revisado: true });
        return { result: id }
    } catch (err) {
        return { error: err.message }
    }
}

export const insertInCollection = async (coll, data) => {
    try {
        let ref = collection(firestore, coll);
        data.fecha = serverTimestamp();
        let datos = await addDoc(ref, data);

        return { id: datos.id, result: data };
    } catch (err) {
        console.error(err);
        return { error: err.message }
    }
}

export const getItems = async (coll, uid, limit = 0, init = 1) => {
    let ref = collection(firestore, coll);
    let qry = null;
    if (uid)
        qry = query(ref, where("usuario", "==", uid), orderBy("fecha"));
    else
        qry = query(ref, orderBy("fecha"));
    let list = await getDocs(qry);
    return list.docs.map((x) => { return { id: x.id, data: x.data() } });
}

 export const getAllItems = async (uid, limit = 0, init = 1) => {
    let items = [];
    for (let i = 0; i < colleciones.length; i++) {
        const col = colleciones[i];
        let ref = collection(firestore, col);
        let qry = query(ref, where("usuario", "==", uid), orderBy("fecha"));
        let list = await getDocs(qry);
        items = items.concat(list.docs.map((x) => { return { tipo: col, id: x.id, data: x.data() } }));
    }
    return items;
}

export const item = async (id) => {
    return (await getDoc(doc(firestore, "pagos/" + id))).data();
}




export const getUsuarioFirebase = async (uid) => {
    console.log(uid);
    try {
        let res =  (await getDoc(doc(firestore, "personal/" + uid)));
        if (res) {
            return res.data().rol;
        }
        return undefined;
    } catch (err) {
        console.error(err);
        return { error: err.message }
    }
}

export const crearUsuarioMaster = async (u, usuarioActual) => {
    let usCr = null;
    let error = null;
    console.log(u);
    try {
        usCr = await createUserWithEmailAndPassword(auth, u.email, u.pass);
    } catch (err) {
        console.error(err);
        error = err.message;
    } finally {
        try {
            
            if (usCr) {
                u.uid = usCr.user.uid;
                await setDoc(doc(firestore, `personal/${usCr.user.uid}`), u);
                await updateCurrentUser(auth, usuarioActual); //gei
                return { creado: usCr.user.uid }
            } else {
                let docs = collection(firestore, "usuarios");
                let qry = query(docs, where("correo", "==", u.email));
                let documento = (await getDocs(qry)).docs[0];
                console.log("sign", documento);
                if (documento) {
                    usCr = await signInWithEmailAndPassword(auth, documento.data().correo, documento.data().clave);
                    console.log("sign", usCr);
                    u.uid = usCr.user.uid;
                    u.clave = documento.data().clave;
                    console.log(usCr);
                    await setDoc(doc(firestore, `personal/${usCr.user.uid}`), u);
                    await updateCurrentUser(auth, usuarioActual);
                    console.log("FINNNNN");
                    return { creado: usCr.user.uid, info: "EL email estaba registrado, y se conservo con la siguiente contraseña: " + u.clave }

                } else {
                    return {error: "Usuario existe, pero no encontrado en la bd"}
                }       
            }
        } catch (err) {
            return { obj: err, error: err.message };
        }
    }
}

// rol: roles_usuario.value,
//                 email: correo_master.value,
//                 pass: clave_master.value,
//                 nombre: nombre_master.value,
//                 apellido: apellido_master.value
//                 uid: 21312323



