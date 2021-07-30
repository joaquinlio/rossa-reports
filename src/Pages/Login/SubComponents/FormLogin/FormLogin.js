/**
 * @desc Dependencias
 */
import React, { useState } from "react";

/**
 * @desc Estilos
 */
import { 
    Input,
    Button,
    Output,
    Wrapper,
    ImgLogo,
    Content,
    ContentForm,
    FormControl
} from "./FormLogin.styles";

/**
 * @desc Material design
 */
import { 
	Grid, 
	InputAdornment, 
} from "@material-ui/core";

/**
 * @desc Logo
 */
import Logo from '../../../../assets/img/logo.png'


/**
 * @desc SubComponente - Layout: Formulario de login
 * 
 * @return { Material.Grid }
 */
export default ({ ...props }) => {

    // Alias de las propiedades
    const { 
        
        // Evento de submision
        onSubmit = () => {},
       
        // Set de posibles errores.
		errorSet = {}
    
    } = props;

    // Datos del usuario
    const [ email, setEmail ] = useState( "" );
    // Indicador de campo vacio del usuario
    const [ emailEmpty, setEmailEmpty ] = useState( false );

    // Datos de la contraseña
    const [ password, setPassword ] = useState( "" );
    // Indicador de campo vacio de la contraseña
    const [ passwordEmpty, setPasswordEmpty ] = useState( false );

    /**
     * @desc Dispara el evento de submision
     * 
     * @return { void }
     */
    const handleSubmit = () => {        
        // Valida si el formulario se puede enviar
        if( validateForm() ){
            onSubmit({
                "email": email,
                "password": password
            })
        }
    }
    /**
     * @desc Detecta las teclas
     * 
     * @return { void }
     */
    const handleKeyPress = e => {
        e.keyCode === 13 && handleSubmit();
    };

    /**
     * @desc Valida el formulario
     * 
     * @return { Boolean }
     */
    const validateForm = () => {

        // Validamos los datos ingresados del usuario ( email escrito en la pantalla de login )
        if( email === "" ){
            setEmailEmpty( true );
            return false;
        }else{
            emailEmpty && setEmailEmpty( false );
        }

        // Validamos los datos ingresados del usuario ( password escrito en la pantalla de login )
        if( password === "" ){
            setPasswordEmpty( true );
            return false;
        }else{
            passwordEmpty && setPasswordEmpty( false );
        }

        return true;

    };

    return (  
        <Grid container direction="row" justify={"center"} alignContent="center" alignItems={"center"} style={{ height:"100%" }}>            
            <Wrapper container item xs={ 10 } md={ 7 } lg={ 5 } xl={ 4 }>                                    
                <Grid item xs={12}> 

                    {/* Logo */}
                    <Content container justify={ "center" }>                           
                        <ImgLogo src={Logo} />
                    </Content>  

                    <ContentForm>                        
                        { /* Email */ }
                        <FormControl margin="dense">
                            <Input                                                                        
                                value={ email } 
                                onKeyDown={ handleKeyPress } 
                                onChange={ evt => setEmail( evt.target.value ) } 
                                placeholder="Email"
                                variant="outlined"
                            />

                            { /* Mensaje de error en el Email */
                                emailEmpty &&
                                    <Output>Email requerido</Output>
                            }

                        </FormControl>

                        { /* Password */ }
                        <FormControl margin="dense">
                            
                            <Input                                
                                type="password"                                                                         
                                value={ password } 
                                onKeyDown={ handleKeyPress } 
                                onChange={ evt => setPassword( evt.target.value ) } 
                                placeholder="Contraseña" 
                                variant="outlined"
                            />

                            {  /* Mensaje de error de la Contraseña */
                                passwordEmpty &&
                                    <Output>Contraseña requerida</Output>
                            }
                        
                            { /* Submit */ }                        
                            <Grid container item md={ 12 } justify={ "center" } style={{ marginTop: "10%" }}>
                                <Button onClick={ () => handleSubmit() } color="primary" variant="contained" style={{ backgroundColor : "#c59d5f" }}>Entrar</Button>
                            </Grid>                                                                                    
                        </FormControl>
                            
                        { /* Error con credenciales */
                            errorSet.notFound &&
                                <Output variant="caption">No encontramos el recurso solicitado, reintenta en unos minutos.</Output>
                        }
                        { /* Error con credenciales */
                            errorSet.credentials &&
                                <Output  variant="caption">El email y la contraseña no coinciden</Output>
                        }

                        { /* Error del servidor */
                            errorSet.internalServerError &&
                                <Output variant="caption">El servidor experimenta difucultades tecnicas en este momento, intente nuevamente en unos minutos.</Output>
                        }

                        { /* Error del servidor */
                             errorSet.notConnection &&
                                <Output variant="caption">No se detecta una conexion a internet, reintentando</Output>
                        }
                    </ContentForm>

                </Grid>								
            </Wrapper>

        </Grid>
    )

}
