import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceTonow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/layout';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/layout/ui/Formulario';
import Boton from '../../components/layout/ui/Boton';

const ContenedorProducto = styled.div`
    @media (min-width:768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;

    }
`


const Producto = () => {

    // state del componente 
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: {id}} = router;

    // context de Firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(()=>{
        if(id) {
           const obtenerProducto = async () =>{
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();

                if(producto.exists){
                    guardarProducto(producto.data());
                }else{
                    guardarError(true);
                }
           }
           obtenerProducto();
        }
    },[id, producto]);

    if(Object.keys(producto).length === 0) return 'Cargando...';

    const { haVotado, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador} = producto;

    // Administar y validar los votos
    const votarProducto = () =>{
        if(!usuario){
            return router.push('/login');
        }
        // obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

       
        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return;

         // guardar el id del usuario que ha votado
         const hanVotado = [...haVotado, usuario.uid];

        // Actualizar ne la BD
        firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado:hanVotado });


        // Actulizar el sttate
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        });

        
    }
    return ( 
       <Layout>
           <>
           {error && <Error404 /> }

           <div className="contenedor">
                <h1 css={css`
                    text-align:center;
                    margin-top: 5rem;
                `}>
                    {nombre}
                </h1>

                <ContenedorProducto>
                    <div>
                    <p>Publicado hace: { formatDistanceTonow(new Date(creado), { locale:es})}</p>  
                    <p>Por: {creador.nombre} de {empresa}</p>

                      <img src={urlimagen} alt="" srcSet={urlimagen}/>
                      <p>{descripcion}</p>

                     {usuario && (
                         <>
                        <h2 >Agrega tu comentario</h2>
                          <form action="">
                               <Campo>
                                   <input 
                                    type="text"
                                    name="mensaje"
                                   />
                               </Campo>
                                   <InputSubmit 
                                       type="submit"
                                       value="Agregar Comentario"
                                   />
                          </form>
                         </>
                     )}

                       <h2 css={css`
                        margin: 2rem 0;
                      `}>Comentarios</h2>

                       {comentarios.map(comentario =>{
                           <li>
                               <p>{comentario.nombre}</p>
                       <p>Escrito por: {comentario.usuarioNombre}</p>
                           </li>
                       })}
                    </div>
                    <aside>
                        <Boton
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >
                            Visitar URL
                        </Boton>
                       
                        <div css={css`
                            margin-top: 5rem;
                        `}>
                        <p css={css`
                          text-align:center;
                        `}>{votos} Votos</p>

                       {usuario && (
                            <Boton
                            onClick={votarProducto}
                            >
                            Votar
                        </Boton>
                       )}
                        </div>
                    </aside>
                </ContenedorProducto>
           </div>
           </>
       </Layout>
     );
}
 
export default Producto;