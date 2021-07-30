/**
 * @desc Dependencias
 */
import { Grid } from "@material-ui/core";
import React, { useState } from "react";

/**
 * @desc Material-ui
 */
import {
    TextField,
} from "@material-ui/core"

/**
 * @desc Estilos
 */
import { 
    ContentForm,
    ButtonContent,
    Button,
    FormControl
} from "./Form.styles";

/**
 * @desc Formulario del login
 */
export default ({ ...props }) => {

    // Alias de las propiedades
    let {
        // Evento para logearse
        login = () => {},

        // Estado del error
        formError,

        // Evento que registra al usuario
        register = () => {},

        // Tipo de formulario
        formType,
            
        // Evento que cambia el tipo de formulario
        changeFormType = () => {}
        
    } = props;

    // Estado del input de name
    const [ name, setName ] = useState("joaquinlio");

    // Estado del input de email
    const [ email, setEmail ] = useState("joaquinlio97@gmail.com");  
    
    // Estado del input de password
    const [ password, setPassword ] = useState("125678");  

    return (        
        <Grid container>

            <Grid item={ true } xs={12} >
                <ContentForm>

                    { /* Nombre */ }
                    { formType === "register" &&
                        <FormControl  fullWidth>
                            <TextField                                                            
                                value={ name }  
                                onChange={ evt => setName( evt.target.value ) } 
                                label="Nombre"
                                error={formError.error}
                            />                   
                        </FormControl>
                    }

                    { /* Email */ }
                    <FormControl  fullWidth>
                        <TextField                                                            
                            value={ email }  
                            onChange={ evt => setEmail( evt.target.value ) } 
                            label="Email"
                            error={formError.error}
                        />                   
                    </FormControl>

                    { /* Password */ }
                    <FormControl  fullWidth>
                        <TextField                                                             
                            value={ password }  
                            onChange={ evt => setPassword( evt.target.value ) } 
                            label="Password"
                            error={formError.error}
                            helperText={formError.message}
                            type="password" 
                        />                   
                    </FormControl>  
                                         
                </ContentForm>

                <ButtonContent>
                    { formType === "register" && 
                        <>
                            <a  onClick={ () => changeFormType('login')}>Sign in</a>
                            <Button variant="contained" onClick={ () => register(name, email, password )}>Create account</Button>  
                        </>

                    
                    }
                    { formType === "login" && 
                        <>
                            <a variant="contained" onClick={ () => changeFormType('register')}>Create account</a>
                            <Button variant="contained" onClick={ () => login( email, password ) }>Sign in</Button>
                        </>
                    }
                    
                </ButtonContent>
                
            </Grid>

        </Grid>
      
    );

};