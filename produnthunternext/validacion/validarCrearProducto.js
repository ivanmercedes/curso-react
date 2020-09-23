export default function validarCrearCuenta(valores){
    let errores = {};

    // validar el nombre del usaurio
    if(!valores.nombre){
        errores.nombre = "El Nombre es obligatorio"
    }
    
    // validar empresa
    if(!valores.empresa){
        errores.empresa = 'Nombre de empresa es obligatorio'
    }

    if(!valores.url){
        errores.url = "El Url es obligatoria"
    }else if(  !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)  ){
        errores.url = "Url no valida"
    }
    
    // validar descripcion.
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripcion de tu producto"
    }
    return errores;
}