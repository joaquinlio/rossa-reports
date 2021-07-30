/**
 * @desc Dependencias
 */
import styled from "styled-components";
import MaterialTable from 'material-table'

/**
 * @desc Componentes de material-ui
 */
import { Grid } from "@material-ui/core"

/**
 * @desc Raiz de la pantalla
 */
export const Root = styled( Grid )`
    background:white;
    padding:20px;
    border-radius:10px;
`;

    /**
     * @desc Tabla de material
     */
    export const Table = styled( MaterialTable )`
    `;
