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
import Login from '../../Components/Login/Login'

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
      openLogin: false,
      user: null
    }
  }

  setOpenLogin = () => {

    this.setState({ openLogin: !this.state.openLogin })

  }
  // Evento para limpiar sessionStorage y redireccionar al login
  Logout = () => {

    // Alias de las props
    const { history = () => {}, dispatch = () => {}, location } = this.props;

    // Evento para limpiar sessionstorage
    dispatch( Logout() );
    
    // Redireccionamos
    if(location.pathname !== "/")
      history.push("/");

  }
  render() {

    // Alias del estado 
    let { openLogin }= this.state;

    // Alias de las propiedades 
    let { user }= this.props;

    return (      
        <Root>
          <CssBaseline />
          {/* NavBar */}
          <NavBar setOpenLogin={this.setOpenLogin} user={user} Logout={this.Logout} history={ this.props.history }/>

          {/* SideBar */}
          {/*  <Aside open={open} setOpen={ setOpen }/> */}
              
          <Main>
            {
              this.props.children
            }
          </Main>
          
          {/* Login */}
          {
            /* Validamos si debe mostrarse el modal */
            openLogin && 
              <Login open={openLogin} setOpenLogin={this.setOpenLogin } history={ this.props.history } />
          }
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
