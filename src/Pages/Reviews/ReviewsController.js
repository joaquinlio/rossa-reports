/**
 * @desc Dependencias
 */
import { Component } from "react";
import Moment from "moment"

import { validateHttpResponse } from "../../Utils/ValidateResponse"
import ReviewsModel from "../../Models/ReviewsModel"

/**
 * @desc Acciones
 */

class ReviewsUI extends Component {
  /**
   * @desc Constructor
   *
   * @param { Object } props
   *
   * @return { void }
   */
  constructor(props) {
    super(props);
    
    this.state = {
      reviews: [],
      viewAnswers: false,
      reviewSelected: false,
      filters: {
        dateFrom: Moment().subtract(1,"month"),
        dateTo: Moment()
      }
    }
  }

  componentDidMount(){

    // Obtiene las reseñas
    this.getReviews( this.state.filters );
    
  }

  // Obtiene las reseñas
  getReviews = async (filters = false) => {

      try{

        // Alias de las propiedades
        const {
          user
        } = this.props;

        // Mostramos el modal de carga
        this.setState({ loading: true })

        // Obtenemos los genericos
        const response = await ReviewsModel.getReviews(filters, user);

        // Ocultamos el modal de carga
        this.setState({ loading: false })
        
        // Validamos la respuesta
        await validateHttpResponse( response, async function(){

            // Datos la respuesta
            const { body : reviews } = response;
            
            // Actualizamos el estado
            await this.setState({ reviews });

        }.bind( this ));        

        return true;

      }catch( error ){

          // Logueamos el error
          console.log( error );

          return false;

      }
  }

  // Obtiene una reseña
  getReview = async (id) => {
    
    try{

      // Mostramos el modal de carga
      this.setState({ loading: true })

      // Obtenemos los genericos
      const response = await ReviewsModel.getReview(id);

      // Ocultamos el modal de carga
      this.setState({ loading: false })
      
      // Validamos la respuesta
      await validateHttpResponse( response, async function(){

          // Datos la respuesta
          const { body : reviewSelected } = response;
          console.log(reviewSelected)
          // Actualizamos el estado
          await this.setState({ viewAnswers: true, reviewSelected });

      }.bind( this ));        

      return true;

    }catch( error ){

        // Logueamos el error
        console.log( error );

        return false;

    }
  }

  // Setea la reseña seleccionada
  setReviewSelected = (review) => {

    this.setState({ viewAnswers: true, reviewSelected: review})

    return true;

  }

  // Setea los filtros
  setFilter = (filter, value) => {
    
    // Alias del estado
    const { 
      filters
    } = this.state;

    // Setea el valor del filtro
    filters[filter] = value

    // Actualiza el estado
    this.setState({filters})

    return true;

  }


}
export default ReviewsUI;
