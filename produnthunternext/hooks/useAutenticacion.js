import React, { useEffect, useState} from 'react';
import firebase from '../firebase';


function useAutenticacionAction (){
    
    const [usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario =>{
            if(usuario){
                guardarUsuarioAutenticado(usuario);
            }else{
                guardarUsuarioAutenticado(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return usuarioAutenticado;
}

export default useAutenticacionAction;