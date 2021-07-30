/**
 * @desc Dependencias
 */
import React from "react";
import LoginUI from "./LoginUI";
import { connect } from 'react-redux';
/**
 * @desc Estilos
 */
import { 
    Modal,
        Overlay, ModalContent,         
        Content,
        Header,
        ContentLoading       
} from "./Login.styles";

/**
 * @desc Material design
 */
import { 
    CircularProgress
} from '@material-ui/core';

/**
 * @desc Componentes
 */
import Form from "./Subcomponents/Form/Form";

/**
 * @desc Modal de login
 */
class Login extends LoginUI {
    
    render() {
        // Alias de las propiedades 
        let {      
            // Evento del estado del modal
            setOpenLogin = () => {},            
        } = this.props;

        // Alias del estado
        let {
            // Estado de pantalla de carga
            isLoading = true
        } = this.state

        return (    
            <Modal>

                { /* Capa trasera */ }
                <Overlay onClick={ () => setOpenLogin()} />

                { /* Modal Content */ }
                <ModalContent container>                       
                    {
                        isLoading &&
                        <ContentLoading item xs={12}>
        
                            <CircularProgress/>
                            
                        </ContentLoading>
                    }
                    { /* Header */ }
                    {/* <Header>

                        <span>Ingresar</span> 
                    
                    </Header> */}
                    {
                        !isLoading &&
                            <>
                                {/* Formulario de login y register */}
                                <Content item xs={12} >
            
                                    <Form 
                                        login={ (email, password) => this.login(email, password)}
                                        formError={this.state.formError} register={ (name, email, password ) => this.register(name, email, password)}
                                        formType={this.state.formType}
                                        changeFormType={ (type) => this.changeFormType( type ) }
                                    />                                   
                                </Content>
                                
                                                                  
                            </>
                    }
                    

                </ModalContent>

            </Modal>
        )
    }
}
export default connect()(Login);