import React, { useContext } from 'react';
import {RecestasContex} from '../context/recetasContex';
import Receta from './Receta';

const ListaRecetas = () => {

    // Extraer las recetas
    const { recetas } = useContext(RecestasContex);

    return ( 
        <div className="row mt-5">
            {recetas.map(receta =>(
                <Receta 
                key={receta.idDrink}
                receta={receta}
                />
            ))}
        </div>
        );
}
 
export default ListaRecetas;