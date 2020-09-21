export default function validarIniciarSesion(valores){
    let errores = {};

  
    
    if(!valores.email){
        errores.email = "El Email es obligatorio"
    }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "El Email no es valido"
    }

    if(!valores.password){
        errores.password = "El Password es obligatorio"
    }else if(valores.password.length < 6 ){
        errores.password = "El Password debe ser al menos 6 caracteres"
    }
    
    return errores;
}