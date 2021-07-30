/**
 * @desc Dependencias
 */
import React from "react";
import { MTableToolbar } from "material-table";


/**
 * @desc Estilos
 */
import {
    Root,
    Filters,
        FilterLeft,
            FilterDateFrom, FilterDateTo,
                DateFrom, DateTo,
        SearchButton,
            SearchIcon,
        FilterSubmit,
        Label,
        ErrorDates
} from "./TableHeader.styles";

/**
 * @desc Componente de la cabecera de la tabla
 */
const TableHeader = ({ ...props }) => {

    // Alias de las propiedades
    const { 

        // Evento
        onSearch = () => {},
        // Filtros
        filters = {},
        // Error de la validacion de fechas
        dateError,
        // Setea los filtros
        setFilter = () =>{}

    } = props;
    
    return (
        <Root>

        
            { /* Filtros */ }
            <Filters container direction={ "row" } wrap={ "nowrap" } alignItems={ "center" }>

                { /* Filter: Rango de fechas */ }
                <FilterLeft container item xs={ 12 }>
                    
                        { /* Filtro de fecha desde. */ }
                        <FilterDateFrom>

                            <Label>Desde</Label>

                            <DateFrom
                                    value={ filters.dateFrom }
                                    onChange={ (value) => setFilter("dateFrom", value)}
                                    autoOk showTodayButton                                                                    
                                    format={ "DD/MM/YYYY" } 
                                    todayLabel={ "Hoy" }
                                    cancelLabel={ "Cancelar" }                                  
                            />
                            
                        </FilterDateFrom>

                        { /* Filtro de fecha hasta */ }
                        <FilterDateTo>

                            <Label>Hasta</Label>

                            { /* Fecha desde. */ }
                            <DateTo  
                                value={ filters.dateTo }
                                onChange={ (value) => setFilter("dateTo", value)}
                                autoOk showTodayButton                                                          
                                format={ "DD/MM/YYYY" }   
                                todayLabel={ "Hoy" }
                                cancelLabel={ "Cancelar" }                             
                            />

                        </FilterDateTo>

                        { /* Disparador: Buscador */ }
                        <FilterSubmit>
                            <SearchButton variant="outlined" size={ "small" } onClick={ () =>  onSearch( filters ) }>
                                <SearchIcon />
                            </SearchButton>
                        </FilterSubmit>
                </FilterLeft>

                {/* mensaje de validacion de fechas */}
                { dateError && 
                    <ErrorDates container item smDown xs={ 0 } sm={ 3 }  justify={ "center" }>'Desde' no puede ser mayor a 'Hasta'</ErrorDates>
                }            
            </Filters>

            { /* Toolbar */ }
            <MTableToolbar { ...props } />

        </Root>
    );

}

export default TableHeader;