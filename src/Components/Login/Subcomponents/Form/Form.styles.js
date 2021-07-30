/**
 * @desc Dependencias
 */
import styled, { css } from "styled-components";

/**
 * @desc Material UI
 */
import { 
    Grid, Button as ButtonMaterial, FormControl as FormControlMaterial
 } from '@material-ui/core';

 /**
 * @desc Contenido del formulario
 */
export const ContentForm = styled( Grid )`
    display:flex;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    flex-direction:column;
`;

/**
 * @desc Contenedor de botones
 */
export const ButtonContent = styled( Grid )`
    
    display:flex;    
    padding:5px;
    justify-content:space-between;
    flex-wrap:nowrap;
    flex-direction:row;
`;

export const Button = styled(ButtonMaterial)`
    &.MuiButton-root{        
        background-color: #17B159;
        color: white;
        font-weight: 600;
        &:hover{
            background-color: #3DBF74; 
        }
    }
`;

export const FormControl = styled(FormControlMaterial)`
    &.MuiFormControl-root{

        margin: 4px;
    }
`;