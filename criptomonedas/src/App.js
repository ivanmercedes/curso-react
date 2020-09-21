import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';
import Spinner from './Components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top:80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomodena, guardarCriptomodena] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(()=>{
    
    const cotizarCriptomoneda = async () =>{
      // Evitamos la ejecucion la primera vez
      if(moneda ==='' || criptomodena === '') return;
      
      // Consultar la api para obtener la cotizacion
      
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomodena}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // mostrar el spinner
      guardarCargando(true);

      // ocultar el spinner
      setTimeout(()=>{
        //Cambiar el estado de cargando
        guardarCargando(false);
        // Guardar cotizacion 
        guardarResultado(resultado.data.DISPLAY[criptomodena][moneda]);
      },3000)
      

      
    }

    cotizarCriptomoneda();

  },[moneda,criptomodena]);

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />
  return (
    <Contenedor>
       <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
       </div>

       <div>
        <Heading>Cotiza criptomodenas al instante</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomodena={guardarCriptomodena}
        />
        { componente }
       </div>
    </Contenedor>
  );
}

export default App;
