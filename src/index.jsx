import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

/**
 * @desc Moment
 */
 import MomentUtils from '@date-io/moment';
 import Moment from "moment";
 import "moment/locale/es";
 import "moment/locale/br";
 
import App from "./Pages/App/App";
/**
 * @desc Redux
 */
import { Store, History } from './Config/Store';

ReactDOM.render(
  <MuiPickersUtilsProvider libInstance={ Moment } utils={ MomentUtils } locale={ "es" }>
    <Provider store={ Store }>
      <BrowserRouter injectFirst>
        <App  history={ History }/>
      </BrowserRouter>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.querySelector("#root")
);
