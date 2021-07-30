/**
 * @desc Utilidades
 */
import Requests from "../Utils/Requests";

/**
 * @desc Modelo de paises
 */

class ReviewsModel {
    
    /**
   * @desc Obtiene las reseñas
   *
   * @return { Promise }
   */
  static async getReviews({ dateFrom, dateTo}, user) {
    try {

      // Requester
      const request = new Requests();

      // Fechas formateadas
      dateFrom = dateFrom.format( "YYYYMMDD" )

      dateTo = dateTo.format( "YYYYMMDD" )

      // Respuesta
      return await request.get(`http://localhost:3001/reviews?store=${user.store}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
      
    } catch (error) {
      
      console.log(error);

      return false;
    }
  }

  /**
   * @desc Obtiene las reseñas
   *
   * @param { String } id
   *
   * @return { Promise }
   */
   static async getReview(id) {
    try {

      // Requester
      const request = new Requests();

      // Respuesta
      return await request.get(`http://localhost:3001/reviews/${id}`);
      
    } catch (error) {
      
      console.log(error);

      return false;
    }
  }

}
export default ReviewsModel;
