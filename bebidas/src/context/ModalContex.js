import React, { createContext, useEffect, useState } from 'react';
import Axios from 'axios';



export const ModalContext = createContext();


const ModalProvider = (props) => {

    //state del provider
    const [ idreceta, guardarIdRecetas] = useState(null);
    const [ informacion, guardarReceta ] = useState({});

    // Una vez que tenemos una receta, llamar a la api
    useEffect( () =>{
        const obtenerReceta = async () =>{
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await Axios.get(url);

            guardarReceta(resultado.data.drinks[0])
        }
        obtenerReceta();
    },[idreceta]);

    return (
        <ModalContext.Provider
        value={{
            guardarIdRecetas,
            informacion,
            guardarReceta
        }}
        >
            {props.children}
        </ModalContext.Provider>
      );
}
 
export default ModalProvider;