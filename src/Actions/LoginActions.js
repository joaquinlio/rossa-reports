/**
 * @desc Acciones
 */
import { LOGIN, LOGOUT } from '../Reducers/LoginReducer';

/**
 * @desc Accion para Loguear al usuario
 *
 * @param { Array } data
 *
 * @return { Object }
 */
export const Login = data => {
  
  return {
    type: LOGIN,
    payload: data,
  };
};

/**
 * @desc Accion para Desloguear al usuario
 *
 * @param { Array } data
 *
 * @return { Object }
 */
export const Logout = data => {
  return {
    type: LOGOUT,
    payload: data,
  };
};