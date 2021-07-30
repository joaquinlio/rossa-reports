/**
 * @desc Dependencias
 */
import React, { forwardRef } from "react";

/**
 * @desc Lenguaje de date-fn para material-table
 */
import esLocale from 'date-fns/locale/es';

/**
 * @desc Iconos
 */
import {
	AddBox, ArrowUpward, Check,
	ChevronLeft, ChevronRight, Clear,
	DeleteOutline, Edit, FilterList,
	FirstPage, LastPage, Remove,
	SaveAlt, Search, ViewColumn,
	Visibility, Replay
} from "@material-ui/icons";

/**
 * @desc Iconos de la tabla.
 */
export const Icons = {
	"Add": forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	"Check": forwardRef((props, ref) => <Check {...props} ref={ref} />),
	"Clear": forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	"Delete": forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	"DetailPanel": forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	"Edit": forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	"Export": forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	"Filter": forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	"FirstPage": forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	"LastPage": forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	"NextPage": forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	"PreviousPage": forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	"ResetSearch": forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	"Search": forwardRef((props, ref) => <Search {...props} ref={ref} />),
	"SortArrow": forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
	"ThirdStateCheck": forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	"ViewColumn": forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	"View": forwardRef((props, ref) => <Visibility {...props} ref={ref} />),
	"Replay": forwardRef((props, ref) => <Replay {...props} ref={ref} />),
};

/**
 * @desc Componente del listado de usuarios.
 * 
 * @param { Object } props
 * 
 * @return { MaterialUI.Grid }
 */
export const PaginationTranslation = ( t ) => {
    return {
        header: {
            actions: t("ACTIONS")
        },
        body:{
            emptyDataSourceMessage: t("EMPTY_DATA_SOURCE_MESSAGE"),
			dateTimePickerLocalization: esLocale,
			editTooltip: t("MATERIAL_TABLE_EDIT_TOOLTIP"),
			deleteTooltip: t("MATERIAL_TABLE_DELETE_TOOLTIP"),
			addTooltip: t("MATERIAL_TABLE_ADD_TOOLTIP"),
			editRow: {
				deleteText: t("MATERIAL_TABLE_DELETE_TEXT"),
				cancelTooltip: t("MATERIAL_TABLE_EDIT_CANCEL_TOOLTIP"),
				saveTooltip: t("MATERIAL_TABLE_EDIT_SAVE_TOOLTIP")
			}
        },
        pagination: {
            labelRowsSelect: t("RESULTS"),
            labelDisplayedRows: t("MATERIAL_TABLE_LABEL_DISPLAYED_ROWS"),
            firstTooltip: t("MATERIAL_TABLE_FIRST_ARIA_LABEL"),
            previousTooltip: t("MATERIAL_TABLE_PREVIOUS_TOOLTIP"),
            nextTooltip: t("MATERIAL_TABLE_NEXT_TOOLTIP"),
            lastTooltip: t("MATERIAL_TABLE_LAST_TOOLTIP")
        }
    }
};

/**
 * @desc Resuelve la cantidad de paginas a mostrar
 * 
 * @param { Number } length
 * 
 * @return { Array<Number> }
 */
export const PageSizeOptions = ( length = 10, byDefault = 10 ) => {

	// Tamaño
	const lengthInt = parseInt( length );

	// Criterio de cantidades
	const optionsPosibless = {
		5: [ 5 ],
		10: [5,10],
		50: [5,10,15],
		75: [5,10, 15, 25],
		200: [5,10, 25, 50],
		600: [5,10,25,50, 75],
		1000: [5,10,25,50,75,100],
		10000: [5,10,25,50,75,100,250,500,1000],
		100000: [5,10,25,50,75,100,250,500,1000, 10000]
	};
	
	// Resultado
	let result = [];

	// Verificamos los limites que cumple
	if( lengthInt <= 5)
		result = [ 5 ];
	if( lengthInt > 5 && lengthInt < 10 )
		result = [ 10 ];
	if( lengthInt >= 10 )
		result = optionsPosibless[ 10 ];
	if( lengthInt >= 50 )
		result = optionsPosibless[ 50 ];
	if( lengthInt >= 75 )
		result = optionsPosibless[ 75 ];
	if( lengthInt >= 200 )
		result = optionsPosibless[ 200 ];
	if( lengthInt >= 600 )
		result = optionsPosibless[ 600 ];
	if( lengthInt >= 1000 )
		result = optionsPosibless[ 1000 ];
	if( lengthInt >= 10000 )
		result = optionsPosibless[ 10000 ];
	if( lengthInt >= 100000 )
		result = optionsPosibless[ 100000 ];
	
	// Dividimos el rango actual con la cantidad de registros
	return {
		"options": result,
		"default": byDefault
	}

}