/**
 * @desc Utilidades
 */
import Requests from "../Utils/Requests";

/**
 * @desc Modelo de ordenes
 */

class LoginModel {

  /**
   * @desc Logeo del usuario
   *
   * @param { String } email
   * @param { String } password
   *
   * @return { Promise }
   */
  static async Login( data ) {

    try {

      // Requester
      const request = new Requests();

      // Respuesta
      return await request.post(`http://localhost:3001/auth/login`, data);
      
    } catch (error) {
      
      console.log(error);

      return false;
    }
  }  
}
export default LoginModel;
