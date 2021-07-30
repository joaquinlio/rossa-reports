/**
 * @desc Dependencias
 */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * @desc Reducers
*/

import LoginReducer   from './LoginReducer';


export default history => (combineReducers({

    // Reductor del ruteo
    router: connectRouter( history ),
    // Reductor del login
    LoginReducer,     
}));

