import React, { useState, useEffect } from 'react';
import Formulario from './components/Fomulario';
import ListaImagenes from './components/ListaImagenes';


function App() {
  
  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);


  //se ejecuta la primera vez que carga el componente
  useEffect(()=>{
    if(busqueda ==='') return;

    const consultarApi = async () =>{
      const imagenesPorPagina = 30;
      const key = '17671096-0eb00452c8a9e933e736c5aa8';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultarApi();

  },[busqueda,paginaactual]);

  // Definir la pagina anterior
  const paginaAnterior = ()=>{
     const nuevaPaginaActual = paginaactual - 1;

     if(nuevaPaginaActual ===0) return;

     guardarPaginaActual(nuevaPaginaActual);
  }
  // Definir pagina siguiente
  const paginaSiguiente = ()=>{
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
 }

  return (
    <div className="container">
      <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>

          <Formulario 
          guardarBusqueda={guardarBusqueda}
          />
      </div>

      <div className='row justify-content-center'>
          <ListaImagenes 
            imagenes={imagenes}
          />
          
          
          { (paginaactual === 1)? null : (  
          <button 
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
          >
            &laquo; Anterior 
          </button>)}
        

          { ( paginaactual === totalpaginas)? null : (
            <button 
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
          )}
      </div>
      
    </div>
  );
}

export default App;
