import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

import PropTypes from 'prop-types';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;


const Formulario = ({guardarMoneda, guardarCriptomodena}) => {
    // State del listado de criptomonedas
    const [listadocripto, guardarCritomonedas] = useState([]);
    const [error, guardarError] = useState(false);

     const MONEDAS = [
         { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
         { codigo: 'DOP', nombre: 'Peso Domnicano'},
         { codigo: 'EUR', nombre: 'Euro'},
         { codigo: 'GBP', nombre: 'Libra Esterlina'}
     ]
    // Utilizar useMoneda
    const [modena, SelectMoneda ] = useMoneda('Elige tu moneda: ','',MONEDAS);

    // Utilizar useCripto
     const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda:','',listadocripto);

     // Ejecutar llamado a la API
     useEffect (()=>{
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            guardarCritomonedas(resultado.data.Data);
        }
        consultarAPI();
     },[]);

     // Cuando el usario hace submit
     const cotizarMoneda = e =>{
         e.preventDefault();

         //validar si ambos campos estan llenos
         if(modena.trim() === '' || criptomoneda.trim() ===''){
            guardarError(true);
            return;
         }
         //Pasar los datos al componente principal
         guardarError(false);
         guardarMoneda(modena);
         guardarCriptomodena(criptomoneda);
     }
    return (
            <form
                onSubmit={cotizarMoneda}
            >
                {error ? <Error mensaje="Todos lo campos son obligatirios" /> : null }

                <SelectMoneda />

                <SelectCripto />

                <Boton 
                    type="submit"
                    value="Calcular"
                />
            </form>
        );
}
Formulario.prototype = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomodena: PropTypes.func.isRequired
}
export default Formulario;