import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/layout';
import { Formulario, Campo,InputSubmit ,Error} from '../components/layout/ui/Formulario';


import firebase from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
const STATE_INICIAL = {
	nombre: '',
	empresa: '',
  imagen: '',
  url: '',
  descripcion: ''
}
const NuevoProducto = () => {  
	 
	const [error, guardarError] = useState(false);
	 const {  valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
	 const {nombre, empresa, imagen, url, descripcion  } = valores;

	 async function crearCuenta(){
		console.log('creado');
		try {
			await firebase.registrar(nombre, email, password);
			Router.push('/');
		} catch (error) {
			console.log('hubo un error al crear el usuario', error.message);
			guardarError(error.message);
		}
	 }
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
					<input
						type="file"
						id="imagen"
						name="imagen"
						value={imagen}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
					{errores.imagen && <Error>{errores.imagen}</Error> }

          <Campo>
					<label htmlFor="url">Url</label>
					<input
						type="url"
						id="url"
						name="url"
						value={url}
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
