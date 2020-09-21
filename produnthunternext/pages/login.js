import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/layout';
import { Formulario, Campo,InputSubmit ,Error} from '../components/layout/ui/Formulario';


import firebase from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
	email: '',
	password: ''
}


const Login = () => {  
	 
	const [error, guardarError] = useState(false);
	 const { valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
	 const { email, password } = valores;

	 async function iniciarSesion(){
    try {
       await firebase.login(email, password);
       Router.push('/');
    } catch (error) {
      console.log('hubo un error al autenticar el usuario', error.message);
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
			 >Iniciar Sesion</h1>
			 <Formulario 
				 onSubmit={handleSubmit}
			 >
			
				<Campo>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Tu Email"
						value={email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
				{errores.email && <Error>{errores.email}</Error> }

				<Campo>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Tu Password"
						value={password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Campo>
				{errores.password && <Error>{errores.password}</Error> }

				{error && <Error>{error}</Error>}
				<InputSubmit 
					type="submit"
					value="Iniciar Sesion"
				/>
			 </Formulario>
        </>
       </Layout>

    </div>
)
};
 
export default Login;
