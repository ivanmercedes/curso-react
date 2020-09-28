import React from 'react';
import DetalleProducto from '../components/layout/DetalleProducto';
import Layout from '../components/layout/layout';

import useProductos from '../hooks/useProductos';



const Populares = () => {

  const { productos } = useProductos('votos');
  
  return ( 
       <Layout>
         <div className="listado-productos">
           <div className="contenedor">
              <ul className="bg-white">
                {productos.map(producto => (
                  <DetalleProducto 
                  key={producto.id}
                  producto={producto}/>
                ))}
              </ul>
           </div>
         </div>
       </Layout>
  );
}
 
export default Populares;
