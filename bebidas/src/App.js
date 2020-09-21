import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

import CategoriaProvider from './context/CategoriaContex';
import RecetasProvider from './context/recetasContex';
import ListaRecetas from './components/ListaRecetas';
import ModalProvider from './context/ModalContex';


function App() {
  return (
    <CategoriaProvider >
      <RecetasProvider>
        <ModalProvider>
        <Header />

          <div className="container mt-5">
            <div className="row">
                <Formulario />
            </div>

            <ListaRecetas />
          </div>
          
         </ModalProvider>
        </RecetasProvider>
    </CategoriaProvider>
  );
}

export default App;
