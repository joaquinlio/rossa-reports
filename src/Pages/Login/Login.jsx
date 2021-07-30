/**
 * @desc Dependencias.
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

/**
 * @desc Controlador
 */
import LoginUI from './LoginUI';


/**
 *  @desc Estilos
 */
import { 
    Root, 
    Output
 } from "./Login.styles";

 /**
 * @desc SubComponentes
 */
import BackgroundSlider from 'react-background-slider'
import FormLogin from './SubComponents/FormLogin/FormLogin';
import Loading from './SubComponents/Loader/Loader';

import food from "../../assets/img/food.webp"
import food2 from "../../assets/img/food2.webp"
import food3 from "../../assets/img/food3.jpg"
/**
 * @desc Contenedor de la pantalla de login.
 */
class Login extends LoginUI{

	/**
	 * @desc Renderiza la pantalla de login.
	 *
	 * @return { HtmlDivElement }
	 */
	render(){

		// Alias del estado
		const {

			// Set de posibles errores.
			errorSet = {},
			// Indica si se esta enviando el formulario
            loading = false

        } = this.state;

		// Imagenes de fondo
		const images = [
			"https://www.pastarossa.com.ar/wp-content/uploads/2015/09/home-slider-1.jpg",
			"https://www.pastarossa.com.ar/wp-content/uploads/2015/09/home-slider-3.jpg",
			"https://www.pastarossa.com.ar/wp-content/uploads/2015/09/home-slider-4.jpg",
			"https://www.pastarossa.com.ar/wp-content/uploads/2015/09/home-slider-5.jpg",
		];

		return (
			<Root>

				{/* Carrusel de imagenes */}                              
                <BackgroundSlider
                    images={[food, food2, food3]}
                    duration={3} transition={2} 
                />

                { /* Formulario */ }
                <FormLogin onSubmit={ data => this.login( data ) } errorSet={errorSet}/>

                { /* Error del servidor */
                    errorSet.internalServerError &&
                        <Output data-cy="error.internalServerError" variant="caption" color={ "primary" }>Error en el servidor, Intente mas tarde</Output>
                }

                { /* Submit */ }
                { loading && <Loading /> }                                
                
			</Root>
		);
	}



}

export default connect( )(Login);
