/**
 * @desc Dependencias
 */
import React, { Suspense, lazy } from "react";
import { connect } from "react-redux"
import { Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Wrapper from "../../Components/Wrapper/Wrapper";

/**
 * @desc styles
 */
import { Container } from "./Home.styles";

/**
 * @desc Compomnentes
 */
const ReviewsPage    = lazy(() => import("../Reviews/Reviews"));

/**
 * @desc controlador
 */
import HomeUI from "./HomeUI";


class Home extends HomeUI {

  render() {
    return (
      <Wrapper { ...this.props }>
       <Suspense fallback={<CircularProgress />}>
          
          { /* Pantalla de reseñas */ }
          <Route exact path={ "/reviews/" } component={ ReviewsPage } />

       </Suspense>
      </Wrapper>
    );
  }
}

/**
 * @desc Puente a redux
 * 
 * @param { Object }
 * 
 * @return { Object }
 */
const mapStateToProps = store => {

	return {

	};

};

export default connect( mapStateToProps )( Home );
