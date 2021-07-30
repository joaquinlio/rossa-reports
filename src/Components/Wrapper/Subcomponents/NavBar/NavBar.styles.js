/**
 * @desc Dependencias
 */
import styled, { css } from "styled-components";

/**
 * @desc Material design
 */
import { 
    IconButton as IconButtonMaterial,
    AppBar as AppBarMaterial,
    Button,
    Menu as MenuMaterial,
    MenuItem as MenuItemMaterial,
    Grid,
    Toolbar as ToolbarMaterial,
    Typography
} from '@material-ui/core';

export const IconButton = styled(IconButtonMaterial)`

    &.MuiIconButton-root{
        margin-right: 25px;
    }                  
`;

export const AppBar = styled(AppBarMaterial)`
    &.MuiAppBar-colorPrimary{        
        background-color: #101010;
    }
    min-height: 55px !important; 
`;

export const ButtonLogin = styled(Button)`
    &.MuiButton-root{        
        background-color: #c59d5f;
        color: white;
        font-weight: 600;       
    }    
`;

export const Menu = styled( MenuMaterial )`

    

`;

export const MenuItem = styled( MenuItemMaterial )`

    

`;

export const Toolbar = styled( ToolbarMaterial )`

    &.MuiToolbar-dense{
        min-height: 55px;    
    }

`;

export const Username = styled( Typography )`

    &.MuiTypography-root{
        cursor: pointer;
    }

`;
