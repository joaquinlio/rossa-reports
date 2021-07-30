/**
 * @desc Dependencias
 */
import { Component } from "react";
import { addStorage, getStorage} from '../../Utils/SessionStorage'

/**
 * @desc Acciones
 */
import { Login } from '../../Actions/LoginActions';

/**
 * @desc Modelo
 */
import LoginModel from "../../Models/LoginModel"

class LoginUI extends Component {
			
	/**
	 * @desc Constructor
	 *
	 * @param { Object } props
	 *
	 * @return { void }
	 */
	constructor(props) {

		super(props)

		this.state = {
			formError:{
				error: false,
				message: ""
			},
			isLoading: false,
			formType: 'login'
		}	
		 
	}


	login = async ( email, password ) => {

		try {
			// Limpiamos los errores
			this.setState({ formError: { error: false, message: ""}})
			
			// Verificamos los datos
			await this.verify({email,password})

			if( this.state.formError.error )
				return false;

			// Seteamos el cargando en true
			this.setState({ isLoading: true })

			const response = await LoginModel.Login( email, password );
		
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

			return true;
			
		} catch (error) {

			console.log(error);

			return false;
		}
	};

	/**
	 * @desc Login realizado con error.
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	loginFail( response ){

		try{

			// Seteamos el cargando en false
			this.setState({ isLoading: false })

			// Alias de la respuesta.
			const { status } = response;
			
			// Alias del estado
			let { formError = {} } = this.state;

			// Verificamos si los datos suministrados son correctos.
			if( status === 401 ){
			
				formError.error = true;
				// Indicamos el motivo del error.
				formError.message = "Email y/o Contraseña invalida"

				// Actualizamos el estado.
				this.setState({ formError });

			// No se encuentra la ruta
			}else if( status === 404 ){

				// Indicamos el motivo del error.
				formError.error = true;
				formError.message = "El recurso solicitado no existe";

				// Actualizamos el estado.
				this.setState({ formError });

			// Error interno del sistema
			}else if( status === 500 ){

				// Indicamos el motivo del error.
				formError.error = true;
				formError.message = "El servidor experimenta difucultades tecnicas.";

				// Actualizamos el estado.
				this.setState({ formError });

			}			

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
	loginSuccess( response ){

			try{
				
				// Alias de las propiedades
				const { dispatch = () => {} } = this.props;

				// Alias de las propiedades
				const { setOpenLogin = () => {} } = this.props;

				// Alias de la respuesta.
				const { body } = response;

				// Seteamos el estado de cargando en false
				this.setState({ isLoading: false})
				
				// Guardamos el usuario en el store.
				dispatch( Login( body ) );

				// Cerramos modal del login
				setOpenLogin(false);

				// Redirecciona al perfil
				//this.redirect('/profile')

				return true;

			}catch( error ){

				// Logueamos el error.
				console.log( error );

				return false;

			}

	}


	register = async ( name, email, password, avatar = null ) => {

		try {

			// Limpiamos los errores
			this.setState({ formError: { error: false, message: ""}})
			
			// Verificamos los datos
			await this.verify({name, email, password})

			if( this.state.formError.error )
				return false;

			const response = await LoginModel.Register( {name, email, password, avatar } );

			// Verificamos el error
			if( response instanceof TypeError ){
				this.registerFail( response );
			}

			// Validamos la respuesta.
			if( response.status === 200 ){

				// Logueo exitoso.
				this.registerSuccess( response );

			}else{

				// Fallo del login.
				this.registerFail( response );

			}

			return true;
			
		} catch (error) {

			console.log(error);

			return false;
		}
	};

	/**
	 * @desc Registro realizado con exito.
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	registerFail( response ){

		try{

			// Alias de la respuesta.
			const { status } = response;

			// Alias del estado
			let { formError = {} } = this.state;

			if( status === 404 ){

				// Indicamos el motivo del error.
				formError.error = true;
				formError.message = "El recurso solicitado no existe";

				// Actualizamos el estado.
				this.setState({ formError });

			// Error interno del sistema
			}else if( status === 500 ){

				// Indicamos el motivo del error.
				formError.error = true;
				formError.message = "El servidor experimenta difucultades tecnicas.";

				// Actualizamos el estado.
				this.setState({ formError });

			}

			// Verificamos si es una falta de conexion
			if( response instanceof TypeError ){
				
				// Indicamos el motivo del error.
				formError.error = true;
				formError.message = "No se detecta una conexion a internet.";

				// Actualizamos el estado.
				this.setState({ formError });

			}

			return true;

		}catch( error ){

			// Logueamos el error.
			console.log( error );

			return false;

		}

	}

	/**
	 * @desc Registro realizado con exito.
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	registerSuccess( response ){

		try{

			// Alias de las propiedades
			const { setOpenLogin = () => {}, dispatch = () => {} } = this.props;

			// Alias de la respuesta.
			const { body } = response;

			// Seteamos el estado de cargando en false
			this.setState({ isLoading: false})

			// Guardamos el usuario en el store.
			dispatch( Login( body ) );

			// Cerramos modal del login
			setOpenLogin(false)

			// Redirecciona al perfil
			this.redirect('/profile');

			return true;

		}catch( error ){

			// Logueamos el error.
			console.log( error );

			return false;

		}

	}

	/**
	 * @desc Cambia el tipo de formulario
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	changeFormType( type ){

		this.setState({ 
			formType: type, 
			formError:{
				error: false,
				message: ""
			}
		})


	}

	/**
	 * @desc Redirecciona a una uri
	 * 
	 * @param { String } uri
	 * 
	 * @return { Boolean }
	 */
	redirect ( uri ){

		try{
			let { history } = this.props;

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
	 * @desc Validacion del formulario
	 * 
	 * @param { Object } response
	 * 
	 * @return { Boolean }
	 */
	verify( data ){

		try {
			// Verificamos los campos
			Object.keys( data ).forEach(( key ) => {

				if(data[key] === '' || data[key] === null ){
					
					// Actualizamos el estado
					this.setState({ formError: { error: true, message: "Debes completar todos los campos"} });
					
				} 

			});
		} catch (error) {
			// Logueamos el error.
			console.log( error );

			return false;
		}

	}
}
export default LoginUI;
