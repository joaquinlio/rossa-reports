/**
 * @desc Dependencias
 */
import { createStore } from 'redux'
import { createBrowserHistory } from 'history';
import { getStorage } from "../Utils/SessionStorage";

/**
 * @desc Reductores
 */
import Reducers from '../Reducers/Reducers';

/**
 * @desc Estado inicial
 */
const InitialState = {
	LoginReducer: {
		user: null
	}
};

/**
 * @desc Obtiene el estado general
 * 
 * @return { Object }
 */
const getState = () => {

	try{

		// Obtenemos el usuario
		const user = getStorage( "user", true );

		// Validamos el usuario
		if( user === null )
			return {};

		return {
			...InitialState,
			LoginReducer:{
				user
			}
		};

	}catch( error ){

		// console.log( error )

		return { ...InitialState };

	}

}

/**
 * @desc Api de navegación.
 */
export const History = createBrowserHistory();

/**
 * @desc Store
 */
export const Store = createStore(Reducers( History ), getState() );
