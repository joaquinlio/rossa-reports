/**
 * @desc Dependencias
 */
import styled from "styled-components";

/**
 * @desc Material design
 */
 import { 
    Grid,
    Typography,
    Button
} from '@material-ui/core';

export const Container = styled( Grid )`
  
  
  
`;

/**
     * @desc Titulo de la pagina
     */
 export const PageTitle = styled( Typography )`
        
    padding: 15px 30px;
    text-align:left;
`;

/**
     * @desc Contenedor de la tabla
     */
 export const Content = styled( Grid )`
    border-radius:20px 35px;
    padding:0px 20px;
`;

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
 z-index:100;
 border: 1px solid rgba(0,0,0,.2);
 border-radius: 15px;
 box-shadow: 0 5px 15px rgba(0,0,0,.5);
 padding: 20px;
`;

/**
* @desc Pie
*/
export const Footer = styled.div`
 margin-top:10px;
 display:flex;    
 padding:5px;
 justify-content:space-between;
 flex-wrap:nowrap;
 flex-direction:row-reverse;
`;

/**
* @desc Texto del tooltip
*/
export const SugestionText = styled( Typography )`
 
`;

/**
* @desc Boton de cerrado
*/
export const CloseButton = styled( Button )`
    &.MuiButton-contained{
        background-color: #c59d5f;
        color: white;
        font-weight: 600;
    }
`;




