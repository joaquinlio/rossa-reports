/**
 * @desc Dependencias
 */
import { createMuiTheme } from '@material-ui/core/styles';

/**
 * @desc Colores generales de la aplicación
 */
export default ( inject = {} ) => {
    
    return createMuiTheme({
        
        // Colores de la aplicación
        "colors": {
            // Generalmenne color de la marca.
            'main-color': 'black',
            'background-color': '#d00',
            'status-bar': '#ffffff',
        },

        "palette":{            
        },

        ...inject
    });

};
