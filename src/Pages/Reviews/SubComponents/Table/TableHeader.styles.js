/**
 * @desc Dependencias
 */
import styled from "styled-components";

/**
 * @desc Material-UI
 */
import { 
    Grid, 
    Typography,
    Button as ButtonMaterial,
    InputLabel,
} from "@material-ui/core";
import { DatePicker } from '@material-ui/pickers';

/**
 * @desc Iconos
 */
import { 
    Search as SearchIconMaterial 
} from "@material-ui/icons"

/**
 * @desc Raiz del reporte
 */
export const Root = styled( Grid )`
    display:flex;
    width:100%;
    flex-wrap:nowrap;
`;

/**
 * @desc Cabecera
 */
export const Header = styled( Grid )`
    width:100%;
    padding:10px;
    margin-top:20px;
`;

    /**
     * @desc Cabecera
     */
    export const Title = styled( Typography )`
    `;


/**
 * @desc Filtro
 */
export const Filters = styled( Grid )`
    &.MuiGrid-root{
        width:calc( 100% - 20px );
        margin: 10px 10px 10px;
        box-sizing:border-box;    
    }
`;

    /**
     * @desc Filtro de rango
     */
    export const FilterLeft = styled( Grid )`
        background:white;
        padding:10px 0px;
    `;


        /**
         * @desc Filtro de rango
         */
        export const FilterDateFrom = styled( Grid )`
            margin-right:10px;
        `;

        /**
         * @desc Filtro de rango
         */
        export const DateFrom = styled( DatePicker )`
            margin-left:10px;
        `;

        /**
         * @desc Filtro de rango
         */
        export const FilterDateTo = styled( Grid )`
        `;

        /**
         * @desc Filtro de rango
         */
        export const DateTo = styled( DatePicker )`
        `;

        
    /**
     * @desc Filtro de acción
     */
    export const FilterSubmit = styled( Grid )`
        background:#fff;
        padding:18px 20px;
    `;

    /**
     * @desc Buscador del reporte
     */
    export const SearchButton = styled( ButtonMaterial )`
        &.MuiButton-root{
            color: #c59d5f;
            border-color: #c59d5f;
        }
    
    `;

    /**
     * @desc Icono de busqueda
     */
    export const SearchIcon = styled( SearchIconMaterial )`
        & svg{
            color:#5C27AF;
        }
    `;

    /**
     * @desc Etiqueta
     */
    export const Label = styled( InputLabel )`
    `;  
  
    /**
     * @desc Contenido del reporte
     */
    export const Content = styled( Grid )`
        padding:10px;
    `;
       
    /**
     * @desc Mensaje de error en la validacion de fechas
     */
    export const ErrorDates = styled( Grid )`
        color: #f33;
        font-size: 14px;
        text-align: center;
        position: absolute;
        font-weight: bold;
        height: 20px;
        top: 75px;
        &.MuiGrid-root{
            background:transparent;            
            padding:10px 0px;           
        }        
    `;
