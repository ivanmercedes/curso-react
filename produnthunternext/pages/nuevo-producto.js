import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, {useRouter} from 'next/router';
import Layout from '../components/layout/layout';
import { Formulario, Campo,InputSubmit ,Error} from '../components/layout/ui/Formulario';

import FileUploader from 'react-firebase-file-uploader';

import { FirebaseContext } from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';
const STATE_INICIAL = {
	nombre: '',
	empresa: '',
    imagen: '',
	url: '',
	urlimage: '',
    descripcion: ''
}
const NuevoProducto = () => {  
	

	// State de las imagenes
	const [nombreimagen, guardarNombre] = useState('');
	const [subiendo, guardarSubiendo] = useState(false);
	const [progreso, guardarProgreso] = useState(0);
	const [urlimagen, guardarUrlImagen] = useState('');


	 
	const [error, guardarError] = useState(false);
	const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
	const {nombre, empresa, imagen, url, descripcion  } = valores;
	
	// hook de routing para redireccionar
	const router = useRouter();

	 // context con las operaciones crud de firebase
	 const { usuario, firebase } = useContext(FirebaseContext);

	 async function crearProducto(){
		if(!usuario){
			return router.push('/login');
		}

		// crear objecto nuevo producto
		const producto ={
			nombre,
			empresa,
			url,
			descripcion,
			urlimagen,
			votos: 0,
			comentarios: [],
			creado: Date.now(),
			creador:{
				id: usuario.uid,
				nombre: usuario.displayName
			}
		}

		// insertarlo en una base de datos
		firebase.db.collection('productos').add(producto);
		
		// Cuando se inserta correctamente envia al home
		return router.push('/');
	 }
	 // inicia progreso en 0 y cambia el estado a true
	 const handleUploadStart = () => {
		guardarProgreso(0);
		guardarSubiendo(true);
	}

	 // Guardando el progreso
	 const handleProgress = progreso => guardarProgreso({ progreso });

	 // en caso de error en la carga de la imagen
	 const handleUploadError = error => {
		guardarSubiendo(error);
		console.error(error);
	};

	const handleUploadSuccess = nombre => {
		guardarProgreso(100);
		guardarSubiendo(false);
		guardarNombre(nombre)
		firebase
			.storage
			.ref("productos")
			.child(nombre)
			.getDownloadURL()
			.then(url => {
			  console.log(url);
			  guardarUrlImagen(url);
			} );
	};




	return( 
        <div>
      <Layout>
        <>
	 		<h1
				 css={css`
					 text-align: center;
					 margin-top: 5rem;
				 `}
			 >Agregar Nuevo Producto</h1>
			 <Formulario 
				 onSubmit={handleSubmit}
			 >
         <fieldset>
           <legend>Informacion General</legend>
         
				<Campo>
					<label htmlFor="nombre">Nombre</label>
					<input
						type="text"
						id="nombre"
						name="nombre"
						placeholder="Tu nombre"
						value={nombre}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
					{errores.nombre && <Error>{errores.nombre}</Error> }

          <Campo>
					<label htmlFor="empresa">Empresa</label>
					<input
						type="text"
						id="empresa"
						name="empresa"
						placeholder="Empresa o compañia"
						value={empresa}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
					{errores.empresa && <Error>{errores.empresa}</Error> }

          <Campo>
					<label htmlFor="imagen">Imagen</label>
					<FileUploader
						accept="iamge/*"
						id="imagen"
						name="imagen"
						randomizeFilename
						storageRef={firebase.storage.ref("productos")}
						onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
					/>
				</Campo>
					

          <Campo>
					<label htmlFor="url">Url</label>
					<input
						type="url"
						id="url"
						name="url"
						value={url}
						placeholder="URL de tu producto"
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
					{errores.url && <Error>{errores.url}</Error> }
          </fieldset>

          <fieldset>
            <legend>Sobre tu Producto</legend>
            <Campo>
					<label htmlFor="descripcion">descripcion</label>
					<textarea
						id="descripcion"
						name="descripcion"
						value={descripcion}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
					{errores.descripcion && <Error>{errores.descripcion}</Error> }
          </fieldset>

			

				  {error && <Error>{error}</Error>}
				<InputSubmit 
					type="submit"
					value="Crear Producto"
				/>
			 </Formulario>
        </>
       </Layout>

    </div>
);
}
 
export default NuevoProducto;
