/**
 * @desc Utilidades
 */
import { addStorage, clearStorage, getStorage } from "../Utils/SessionStorage";

/**
 * @desc Acciones
 */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/**
 * @desc Estado inicial.
 */
const INITIAL_STATE = {
  // Usuario
  "user": getStorage( "user", true),
  // Token del usuario
  "token": getStorage( "token" )
};

/**
 * @desc Reductor.
 */
const LoginReducer = (state = INITIAL_STATE, action) => {
    
  // Evaluamos la acción
  switch (action.type) {
    
    case LOGIN:
      addStorage( "user", action.payload.user );
      addStorage( "token", action.payload.token );
      return {
        ...state,
        "user": action.payload.user,
        "token": action.payload.token
      };
    case LOGOUT:
      clearStorage();
      return {
        ...INITIAL_STATE
      };
    default:
      return {
        ...state,
      };
  }

};

export default LoginReducer;
