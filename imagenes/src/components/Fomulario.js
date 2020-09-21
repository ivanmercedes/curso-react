import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';


const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = e =>{
        e.preventDefault();

        // Validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        // Enviar termino de busqueda al componente principal para consultar la api
        guardarBusqueda(termino);

    }

    return ( 
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una una imagen, Ejemplo: futbol o playa"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-block btn-danger"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un termino a la busqueda" /> : null }
        </form>
     );
}
 Formulario.prototype = {
    guardarBusqueda: PropTypes.func.isRequired
 }
export default Formulario;