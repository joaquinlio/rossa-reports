/**
 * @desc Dependencias
 */
import styled, { css } from "styled-components";
import { withTheme } from "@material-ui/styles"
/**
 * @desc Material design
 */
import { 
    Grid, TextField, Typography,
    Button as ButtonMaterial,
    FormControl as FormControlMaterial
} from '@material-ui/core';

/**
 * @desc Cuadro contenedor del formulario
 */
export const Form = styled( Grid )`
`;


/**
 * @desc Cuadro contenedor del campos de formulario
 */
export const Fieldset = styled( Grid )`
    margin-bottom:10px;
`;

/**
 * @desc Cuadro contenedor del campos de formulario
 */
export const Input = styled( TextField )`
    & .MuiOutlinedInput-input{
        padding: 14px 10px;  
    }      
`;  


/**
 * @desc Mensaje de salida
 */
export const Output = styled( Grid )`
    display:block;
    color:#f33;
    width:calc( 100% - 20px );
    font-size: 1rem;
    padding: 10px;
    text-align: center;    
    left:0px;
    font-weight:bold;
   
`;

/**
 * @desc Mensaje de salida
 */
export const Wrapper = styled( Grid )`
    background:white;    
    min-height: 270px;
    border-radius: 30px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    position:relative;
`;

/**
 * @desc Logo
 */
export const ImgLogo = styled.img`
    margin: 10px,
    width: 160px;
    height: 60px;
`;

/**
 * @desc Contenido
 */
export const Content = styled( Grid )`
    display:grid;  
    background-color: black;  
    border-radius: 30px 30px 0 0;
`;

/**
 * @desc Contenido del formulario
 */
export const ContentForm = styled( Grid )`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    flex-direction:column;   
    padding: 30px; 
`;

/**
 * @desc Texto
 */
export const Text = styled( Typography )`
    padding-bottom: 10px;
`;

/**
 * @desc Boton 
 */
export const Button = withTheme( styled( ButtonMaterial )`
    background-color: #bd0017;
    color:white;
    &:hover{
        background-color:#bd0017;
    }
`);

/**
 * @desc Container del input 
 */
export const FormControl = styled( FormControlMaterial )`
    &.MuiFormControl-root{
        width: 80%;
    }
`;

