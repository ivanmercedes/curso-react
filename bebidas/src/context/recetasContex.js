import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';


export const RecestasContex = createContext();


const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [ busqueda, buscarRecetas ] = useState({
        nombre:'',
        categoria:''
    });
    const [consultar,guardarConsultar] =useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(()=>{
        if(consultar){
            const obtenerRecetas = async ()=>{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

                const resultado = await Axios.get(url);
                guardarRecetas(resultado.data.drinks);
                
                
            }
            obtenerRecetas();
        }
     // eslint-disable-next-line
    },[busqueda]);
    return ( 
        <RecestasContex.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecestasContex.Provider>
     );
}
 
export default RecetasProvider;