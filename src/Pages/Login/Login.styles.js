/**
 * @desc Dependencias
 */
import styled, { css } from "styled-components";

/**
 * @desc Asset's
 */

/**
 * @desc Material design
 */
import { 
    Grid, Typography 
} from '@material-ui/core';

/**
 * @desc Raiz de la pantalla
 */
export const Root = styled( Grid )`
    &.MuiGrid-root{
        display:flex;        
        width:100%;
        background-size: cover;
        min-height:100vh;
        justify-content:center;
        align-content:center;
        flex-wrap:wrap;
        flex-direction:column;
    }
`;

/**
 * @desc Mensaje de salida
 */
export const Output = styled( Typography )`
    display:block;
    color:#f33;
    width:calc( 100% - 20px );
    font-size: 10px;
    padding: 10px;
    text-align: center;    
    left:0px;
    font-weight:bold;
   
`;
