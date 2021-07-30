/**
 * @desc Dependencias
 */
import React, { useState, useEffect } from "react";

/**
 * @desc Utilidades
 */
import { 
    Icons                   as MaterialTableIcon,
    PaginationTranslation   as MaterialPaginationTranslation,
    PageSizeOptions         as ResolvePageSize
} from "../../../../Utils/MaterialTable";

/**
 * @desc Estilos
 */
import { 
    Root, 
        Content, Table
} from "./Table.styles";

import TableHeader from "./TableHeader";

/**
 * @desc SubComponente - Layout: Formulario de login
 * 
 * @return { Material.Grid }
 */
export default ({ ...props }) => {

    // Alias de las propieadades
    const {        
        // Datos de los usuarios
        columns = [],			
        // Datos del reporte
        data = [],
        // Evento de visualización
        onView = () => {}, 
        // Filtros
        filters = {},
        // Error de la validacion de fechas
        dateError,
        // Setea los filtros
        setFilter = () => {},
        // Evento para pedir datos
        onSearch = () => {}
    } = props;
    
	// Opciones
	let options = {		
      search: false,		      
      showTitle: false,
      actionsColumnIndex: -1,
      headerStyle: {
        backgroundColor: 'white',       
        zIndex: 1
      },
      sorting: true,
      filtering: true,
      pageSize:  ResolvePageSize( data?.length ?? 0 ).default,
      pageSizeOptions: ResolvePageSize( data?.length ?? 0 ).options,
      paginationType: "stepped",
    };

    // Acciones de solo lectura
    const actionsRead = [{
        icon: MaterialTableIcon.View,
        onClick: ( evt, rowData ) => onView( rowData ),
        tooltip: 'Ver respuestas',        
    }]

    return (
        <Root>
            <Table  icons={ MaterialTableIcon } 
                    options={ options } 
                    columns={ columns } 
                    actions={ actionsRead }
                    components={{
                        Toolbar: props => ( 
                            <TableHeader 
                                data={ data } 
                                filters={ filters }                                 
                                onSearch={ filters => onSearch(filters) }                                        
                                dateError={dateError}
                                setFilter={ (filter, value) => setFilter(filter, value)}
                                {...props} 
                            />
                        )
                    }}
                    data={ Array.isArray( data ) ? data : [] } 
                    title={ "Reporte de reseñas" }
                    localization={{
                        header: {
                            actions: "Respuestas"
                        }
                    }}
            />
        </Root>
    )

}
