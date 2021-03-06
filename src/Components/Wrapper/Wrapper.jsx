/**
 * @desc Dependencias
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * @desc Material design
 */
import CssBaseline from '@material-ui/core/CssBaseline';

/**
 * @desc Componentes
 */
import NavBar from './Subcomponents/NavBar/NavBar';

/**
 * @desc Estilos
 */
import { Root, Main } from "./Wrapper.styles"

/**
 * @desc Acciones
 */
 import { Logout } from '../../Actions/LoginActions';

/**
 * Componente
 */
class Wrapper extends Component {

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
      user: null
    }
  }

  // Evento para limpiar sessionStorage y redireccionar al login
  logout = () => {
    console.log("entra aca")
    // Alias de las props
    const { history = () => {}, dispatch = () => {}, location } = this.props;

    // Evento para limpiar sessionstorage y redux
    dispatch( Logout() );
    
    // Redireccionamos   
    history.push("/login");

  }
 
  render() {
    
    // Alias de las propiedades 
    let { user }= this.props;

    return location.pathname !== "/reports/login" && (      
        <Root>
          <CssBaseline />
          {/* NavBar */}
          <NavBar setOpenLogin={this.setOpenLogin} user={user} logout={this.logout} history={ this.props.history }/>
                       
          <Main>
            {
              this.props.children
            }
          </Main>                   
        </Root>
    )
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

		// Usuario logueado
		user: store.LoginReducer.user

	};

};

export default connect(mapStateToProps)(Wrapper);
