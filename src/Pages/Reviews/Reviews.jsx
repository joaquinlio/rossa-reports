/**
 * @desc Dependencias
 */
import React from "react";
import { connect } from "react-redux"
import MaterialTable from 'material-table'

/**
 * @desc styles
 */
import {
  Container,
  PageTitle,
  Content,
  Modal,
  Overlay,
  ModalContent,
  Footer,
  SugestionText,
  CloseButton
} from "./Reviews.styles";

/**
 * @desc Material-ui
 */
 import {
  Typography,
  FormControl,
  Button,
  Tooltip 
} from "@material-ui/core"

/**
 * @desc SubComponentes
 */
 import Table from './SubComponents/Table/Table';

/**
 * @desc controlador
 */
import ReviewsController from "./ReviewsController";

/**
 * @desc constantes
 */
import { QUALIFICATIONS, STORES } from "../../Utils/Constants"

/**
 * @desc Utilidades
 */
 import { Capitalize } from "../../Utils/String";

class Reviews extends ReviewsController {

  orderData = (a, b) => {

    return (( a< b ) ? -1 : (( a < b ) ? 1 : 0 ))
  }

  render() {    

    // Alias del estado
    const {
      reviews,
      viewAnswers,
      reviewSelected,
      filters
    } = this.state;

    // Alias de las propiedades
    const {
      user
    } = this.props;

    // Columnas
    const Columns = [
      { 
        title: "Nombre del cliente",
        field: 'name',
        //render: rowData => <Text>{ rowData.name }</Text>,
        headerStyle: {
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
        },
        customSort:( a, b ) => this.orderData(a?.name, b?.name)
      },{ 
        title: "Sugerencias",
        field: 'suggestions',    
        headerStyle: {
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
        },
        customSort:( a, b ) => this.orderData(a?.suggestions, b?.suggestions),
        render: rowData => <Tooltip arrow title={<SugestionText variant="h6">{rowData.suggestions}</SugestionText>}><span>{rowData.suggestions.substr(0,20)}</span></Tooltip>
      },{ 
        title: "Fecha de respuesta",
        field: 'date',
        type: "date",        
      },{ 
        title: "Calificacion promedio",
        field: 'average.qualification', 
        lookup: {
          "DISSATISFIED": QUALIFICATIONS.DISSATISFIED,
          "NEUTRAL": QUALIFICATIONS.NEUTRAL,
          "SATISFIED": QUALIFICATIONS.SATISFIED
        },
        render: rowData => <span>{ QUALIFICATIONS[rowData.average.qualification] }</span>     
      }
    ];

    // Si el usuario puede ver todas las tiendas se le añade la columna de "restorant"
    if( user.store === STORES.ALL ){
      Columns.unshift(
        { 
          title: "Restorant",
          field: 'store',        
          headerStyle: {
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
          },
          lookup: function(){
            let stores = {};
            for( let store of Object.keys( STORES ) ){
                stores[store] = Capitalize( store );
            }
            return stores;
          }(),
          customSort:( a, b ) => orderData(a?.store, b?.store)
        }
      )
    }
    

    return (
      <Container>

        {/* Titulo */}
        <PageTitle variant="h6">Reporte de reseñas</PageTitle>
        
        <Table  
            user={ user }
            data={ reviews } 
            columns={ Columns } 
            filters={ filters }
            readOnly={ false }
            onView={ (review) => this.setReviewSelected(review) }
            setFilter={ (filter, value) => this.setFilter(filter, value)}
            onSearch={ (filters) => this.getReviews(filters)}
        />
        
        {
            viewAnswers &&
            <Modal>

                { /* Capa trasera */ }
                <Overlay onClick={ () => this.setState({ viewAnswers: false }) } />

                { /* Modal Content */ }
                <ModalContent>  
                    <FormControl  fullWidth>
                      
                        <MaterialTable
                          columns={[
                            {
                              title: 'Pregunta',
                              field: 'question'
                            },
                            {
                              title: 'Respuesta',
                              field: 'qualification',
                              render: rowData => <span>{ QUALIFICATIONS[rowData.qualification] }</span>
                            },                           
                          ]}
                          data={reviewSelected.answers}
                          title={`${reviewSelected.average.percent}% de las respuestas fueron ${QUALIFICATIONS[reviewSelected.average.qualification]}`}
                          options={{
                            search: false,
                            filtering: false,
                            paging: false,
                            sorting: false,
                            draggable: false                                               
                          }}
                        />   
                    </FormControl>                      
                                                                    
                    <Footer>
                        <CloseButton variant="contained" onClick={ () => this.setState({ viewAnswers: false }) }>Cerrar</CloseButton>                          
                    </Footer>    
                </ModalContent>

            </Modal>
        } 

      </Container>
    );
  }
}

/**
 * @desc Puente a redux
 * 
 * @param { Object }
 * 
 * @return { Object }
 */
const mapStateToProps = store => {

	return {
    // Usuario logueado
		user: store.LoginReducer.user
	};

};

export default connect( mapStateToProps )( Reviews );
