/**
 * @desc Dependencias
 */
import { Component } from 'react';

/**
 * @desc Modelos
 */
import LoginModel from "../../Models/LoginModel";

/**
 * @desc Acciones
 */
import { Login } from '../../Actions/LoginActions';

/**
 * @desc Controlador
 */
class LoginUI extends Component{

	/**
	 * @desc Constructor del controlador.
	 * 
	 * @param { Object } props
	 * 
	 * @return { void }
	 */
	constructor( props ){

		super( props );

		// Estado inicial.
		this.state = {

			// Nombre de usuario.
			email: {
				value: '',
				empty: false
			},

			// Contraseña.
			password: {
				value: '',
				empty: false
			},

			// Indica si es valido el formulario.
			isValid: false,

			// Indica si se esta enviando el formulario
			loading: false,

			// Set de errores posibles.
			errorSet:{
				credentials: false,
				expiredPassword: false,
				blocked: false,
				internalServerError: false,
				notFound: false,
				notConnection: false
			}			
		};

	}
		

	/**
	 * @desc Cambiamos el nombre de usuario.
	 * 
	 * @param { EventTarget } event
	 * 
	 * @return { Boolean }
	 */
	changeEmail( event ){

		try{
			
			// Alias del estado
			const { email = {} } = this.state;

			// Indicamos el nuevo valor
			email.value = event.target.value;

			// Actualizamos el nombre de usuario.
			this.setState({ email });

			return true;

		}catch( error ){

			// Logueamos el error.
			console.log( error );

			return false;

		}

	}

	/**
	 * @desc Cambiamos la contraseña.
	 * 
	 * @param { EventTarget } value
	 * 
	 * @return { Boolean }
	 */
	changePassword( event ){

		try{

			// Alias del estado
			const { password = {} } = this.state;

			// Indicamos el nuevo valor
			password.value = event.target.value;

			// Actualizamos el nombre de usuario.
			this.setState({ password });

			return true;

		}catch( error ){

			// Logueamos el error.
			console.log( error );

			return false;

		}

	}


	/**
	 * @desc Permite el acceso asincronico al setState de react.
	 * 
	 * @param { Object } state 
	 * 
	 * @return { Promise }
	 */
	setStateAsync( state ){

		return new Promise( (resolve, reject) => {
			
			try{
				
				// Actualizamos el estado.
				this.setState( state, resolve );
				
			}catch( error ){
			
				// Prevención
				//... ...
				reject( error );
			
			}
			
		})

	}

	/**
	 * @desc LoginModel
	 * 
	 * @param { Object } formData
	 * 
	 * @return { Promise<Boolean> }
	 */  
	async login(formData){

		try{
						
			// Alias del estado
			const {

				// Nombre del usuario.
				email = '',
				// Contraseña
				password = ''
			} = formData;

			// Indicamos que se esta enviando el formulario
			const loading = false;

			// Actualizamos el estado.
			await this.setStateAsync({ loading });

			// Datos a enviar
			const data = { 				
				"email": email,
				"password": password
			};

			// Solicitamos el ingreso al sistema.
			const response = await LoginModel.Login( data );
			
			// Verificamos el error
			if( response instanceof TypeError ){
				this.loginFail( response );
			}

			// Validamos la respuesta.
			if( response.status === 200 ){
				
				// Logueo exitoso.
				this.loginSuccess( response );

			}else{

				// Fallo del login.
				this.loginFail( response );

			}

			return false;

		}catch( error ){

			// Logueamos el error
			console.log( error );

			return false;

		}

	}

	/**
	 * @desc Login realizado con exito.
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	loginSuccess( response ){

		try{

			// Alias de las propiedades
			const { dispatch = () => {} } = this.props;
			
			// Alias de la respuesta.
			const { body } = response;
						
			// Guardamos el usuario en el store.
			dispatch( Login( body ) ); 
	
			// Redireccionamos al dashboard.
			this.redirect("/reviews")

			return true;

		}catch( error ){

			// Logueamos el error.
			console.log( error );

			return false;

		}

	}

	/**
	 * @desc Redireccion
	 * 
	 * @param { String } uri
	 * 
	 * @return { Boolean }
	 */
	redirect( uri ){

		try{

		// Alias de las propiedades
		const { history = {} } = this.props;

		// Redireccionamos.
		history.push( uri );

		return true;

		}catch( error ){

		// Logueamos el error.
		console.log( error );

		return false;

		}

	}
	
	/**
	 * @desc Login realizado con exito.
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	loginFail( response ){

		try{

			// Alias de la respuesta.
			const { status } = response;

			// Alias del estado
			let { errorSet = {} } = this.state;
			console.log(status)
			// Verificamos si los datos suministrados son correctos.
			if( status === 401 ){

				// Indicamos el motivo del error.
				errorSet.credentials = true;

				// Actualizamos el estado.
				this.setState({ errorSet }, () => {

					// Limpiamos el error.
					errorSet.credentials = false;

					// Limpiamos el mensaje luego de unos segundos
					/* setTimeout(() => {
						this.setState({ errorSet })
					},2000) */

				});

			// No se encuentra la ruta
			}else if( status === 404 ){

				// Indicamos el motivo del error.
				errorSet.notFound = true;

				// Actualizamos el estado.
				this.setState({ errorSet }, () => {

					// Limpiamos el error.
					errorSet.notFound = false;

					// Limpiamos el mensaje luego de unos segundos
					setTimeout(() => {
						this.setState({ errorSet })
					},6000)

				});

			// Error interno del sistema
			}else if( status === 500 ){

				// Indicamos el motivo del error.
				errorSet.internalServerError = true;

				// Actualizamos el estado.
				this.setState({ errorSet }, () => {

					// Limpiamos el error.
					errorSet.initernalServerError = false;

					// Limpiamos el mensaje luego de unos segundos
					setTimeout(() => {
						this.setState({ errorSet })
					},2000)

				});

			}

			// Verificamos si es una falta de conexion
			if( response instanceof TypeError ){
				
				// Indicamos el motivo del error.
				errorSet.notConnection = true;

				// Actualizamos el estado.
				this.setState({ errorSet }, () => {

					// Limpiamos el error.
					errorSet.notConnection = false;

					// Limpiamos el mensaje luego de unos segundos
					setTimeout(() => {
						this.setState({ errorSet })
					},5000)

				});

			}

			return true;

		}catch( error ){

			// Logueamos el error.
			console.log( error );

			return false;

		}

	}

	
}

export default LoginUI;
