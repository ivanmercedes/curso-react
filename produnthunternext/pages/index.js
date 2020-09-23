import React, { useEffect, useState, useContext } from 'react';
import DetalleProducto from '../components/layout/DetalleProducto';
import Layout from '../components/layout/layout';
import { FirebaseContext } from '../firebase';



const Home = () => {

  const [productos, guardarProducto] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
   const obtenerProductos = () =>{
      firebase.db.collection('productos').orderBy('creado','desc').onSnapshot(menejarSnapshot)
   }
   obtenerProductos();

   
  }, []);

  function menejarSnapshot(snapshot){
    const productos = snapshot.docs.map(doc=>{
      return {
       id: doc.id,
       ...doc.data()
      }
    });
    guardarProducto(productos);
   }
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
 
export default Home;
