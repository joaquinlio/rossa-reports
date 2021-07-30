/**
 * @desc Dependencias.
 */
import React from 'react';

/**
 * @desc Estilos
 */
import { 
    Root, Spinner
} from "./Loader.styles";

/**
 * @desc SubComponente - Layout: Formulario de login
 * 
 * @return { Material.Grid }
 */
export default () => {

    return (
        <Root data-cy="loading">

            { /* Icono animado */ }
            <Spinner />

        </Root>
    )

}
