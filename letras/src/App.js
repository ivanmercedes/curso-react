import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Error from './components/Errror';
import axios from 'axios';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {

  // definir el state
  const [ busquedaletra, guardarBusquedaLetra ] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  const [error, guardarError] = useState(false);

  useEffect(()=>{
   
    if(Object.keys(busquedaletra).length === 0 ) return;

    const consultarApiLetra = async () =>{

      guardarLetra(false);
      guardarInfo(false);

      const { artista, cancion } = busquedaletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ]);
      
      if(informacion.data.artists){
        guardarInfo(informacion.data.artists[0])
      }else{
        guardarInfo(false);
      }

      guardarLetra(letra.data.lyrics);

    }
    consultarApiLetra();
   
  },[busquedaletra]);

  const componente = (info) ? 
    <div className="col-md-6">
      <Info 
      info={info}
      />
    </div>
  : null; 

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className="container mt-5">
         {(letra)?  <div className="row">
           {componente}
            <div className="col-md-6">
              <Cancion letra={letra} />
            </div>
          </div> : null }

      </div>
    </Fragment>
  );
}

export default App;
