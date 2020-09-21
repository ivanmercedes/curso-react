import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Errror';

const Formulario = ({guardarBusquedaLetra}) => {

    const  [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    });
    const [error, guardarError] = useState(false);
    // funcion para cada input para leer su contenido
    const actualizarState = e =>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
    
    const { artista, cancion } = busqueda;

    // Consultar las apis
    const buscarInformacion = e =>{
        e.preventDefault();

        if(artista.trim() ==='' || cancion.trim() ===''){
            guardarError(true);
            return;
        }
        // Todo bien, pasar al componente principal
        guardarError(false);

        guardarBusquedaLetra(busqueda);
    }

    return ( 
        <div className="bg-info">
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="container">
                <div className="row">
                    
                    <form 
                    onSubmit={buscarInformacion}
                    className="col card text-white bg-transparent mb-5 pt-5 pb-2">
                        <fieldset>
                            <legend className="text-center">
                                Buscador Letras Canciones
                            </legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                       <input 
                                        type="text"
                                        className="form-control"
                                        name="artista"
                                        placeholder="Nombre Artista"
                                        onChange={actualizarState}
                                        value={artista}
                                       />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                   <div className="form-group">
                                       <input 
                                        type="text"
                                        className="form-control"
                                        name="cancion"
                                        placeholder="Nombre Cancion"
                                        onChange={actualizarState}
                                        value={cancion}
                                       />
                                    </div>
                                </div>
                            </div>
                            <button 
                            type="submit"
                            className="btn btn-primary float-right"
                            >
                            Buscar
                            </button>
                        </fieldset>

                    </form>
                </div>
            </div>
        </div>
    
        );
}
 Formulario.prototype ={

    guardarBusquedaLetra: PropTypes.func.isRequired
 }
export default Formulario;