/**
 * @desc Dependencias
 */
import styled, { css } from "styled-components";

/**
 * @desc Material UI
 */
import { 
    Grid,
    Button as ButtonMaterial
 } from '@material-ui/core';

/**
 * @desc Iconos
 */
import { 
    HighlightOff as IconCloseMaterial
} from '@material-ui/icons';

/**
 * @desc Modal
 */
export const Modal = styled( Grid )`
    display:flex;
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:9999;
    justify-content:center;
    align-items:center;
`;

/**
 * @desc Capa trasera
 */
export const Overlay = styled( Grid )`
    display:flex;
    background:rgba(0,0,0,0.3);
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:98;
`;

/**
 * @desc Contenido del modal
 */
export const ModalContent = styled( Grid )`
    background:white;
    width: 500px !important;
    height: 350px;
    z-index:100;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding: 20px;
`;




/**
 * @desc Contenido del modal
 */
export const Content = styled( Grid )`
    
`;

/**
 * @desc Header
 */
export const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    align-items: center;
`;
 
/**
 * @desc Pie de pagina
 */
export const Footer = styled( Grid )`
    height: 46px;
    display:flex;
    background:#ccc;
    padding:5px;
    justify-content:space-between;
    flex-wrap:nowrap;
    flex-direction:row;
`;

  

    /**
     * @desc Boton de entregado
     */
    export const Close = styled( ButtonMaterial )`
        &.MuiButtonBase-root{
            background:#888;
            color:white;
            &:hover{
                background:#222;
            }    
        }
    `;

    /**
     * @desc Icono de cerrado
     */
    export const IconClose = styled( IconCloseMaterial )`
        & svg{
            color: white;
        }
    `;

/**
 * @desc Sección inicial del modal
 */
export const FooterStart = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
`;

/**
 * @desc Sección central del footer del modal
 */
export const FooterCenter = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    @media(max-width:425px){
        display:none;
    }
`;

/**
 * @desc Sección derecha del footer del modal
 */
export const FooterEnd = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
`;

/**
 * @desc ContentLoading
 */
export const ContentLoading = styled(Grid)`    
    display: flex;
    justify-content: center;   
    align-items: center;
`;
