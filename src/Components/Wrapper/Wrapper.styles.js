/**
 * @desc Dependencias
 */
import styled, { css } from "styled-components";

/**
 * @desc Material-ui
 */
 import { Container as ContainerMaterial } from "@material-ui/core";

export const Root = styled.div`
    display: flex;
    width: 100%;
`;

/* export const Main = styled.div`    
    margin: 0px;
    display: flex;
    width: 100%;
    padding-top: 55px;
`; */

export const Main = styled( ContainerMaterial )`          
    
    padding-top: 55px;
`;
