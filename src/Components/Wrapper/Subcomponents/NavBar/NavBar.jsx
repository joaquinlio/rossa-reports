import React, { useContext, useState } from "react"

/**
 * @desc Material-ui
 */
import {   
    Grid,
    Avatar
  } from "@material-ui/core";

/**
 * @desc Estilos
 */
import {
    IconButton,
    AppBar,
    ButtonLogin,
    Menu,
    MenuItem,
    Toolbar,
    Username
} from "./NavBar.styles";

import Logo from "../../../../assets/img/logo.png"

function NavBar({ ...props }) {

    // Alias de las propiedades
    let {  
        
        // Estado de apertura del menu
        setOpenLogin = () => {}

    } = props;

    const { user, logout } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    // Desloguea al usuario y cierra el menu
    const handleClose = () => {
      setAnchorEl(null);
      logout();
    };

    // Redirecciona a la url y cierra el menu
    const redirect = (url) =>{
      
      props.history.push(url)
      setAnchorEl(null);

    }

    return (
      <AppBar position="fixed">
        <Toolbar variant={ "dense" }>

          { /* Lateral izquierdo */ }
          <Grid container item xs={ 12 } direction="row" justify="flex-start" alignItems="center">

            <a href="https://www.pastarossa.com.ar/">
                <img src={Logo} alt="logo"/>
            </a>
                   
          </Grid>

          { /* Lateral derecho */ }
          <Grid container item xs={ 12 } direction="column" alignItems="flex-end">
            {
              user &&
              <>
                <Username variant="h6"  onClick={handleClick}>{user.username}</Username>                
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={ () => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  elevation={0}
                  getContentAnchorEl={null}
                >                     
                  <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>                  
                </Menu>
              </>

            } 

            {
              !user &&             
              <ButtonLogin variant="contained" onClick={ () => setOpenLogin()}>Login</ButtonLogin>              
            }               
            
            
          </Grid>

        </Toolbar>
      </AppBar>
    )
}

export default NavBar
