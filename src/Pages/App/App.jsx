/**
 * @desc Dependencias
 */
import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect  } from "react-router-dom";
/**
 * @desc Theme
 */
import ThemeDefault from "../../Utils/theme";

// Layout
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeProvider } from "@material-ui/core/styles";

/**
 * @desc Utilidades
 */
 import { getStorage } from "../../Utils/SessionStorage";

// Componenetes
const HomePage    = lazy(() => import("../Home/Home"));
const LoginPage    = lazy(() => import("../Login/Login"));


const App = ({ ...props }) => {

  // Usuario del sessionStorage
  const user = getStorage( "user", true );

  return (
    <ThemeProvider theme={ ThemeDefault( ) }>        
      <Switch>
          <Suspense fallback={<CircularProgress />}>

            
            { /* Pantalla de login */ }
            <Route exact path={ "/reports" } component={ LoginPage } /> 

            { /* Pantalla de inicio */ }
            <Route path={ "/reports/reviews" } component={ HomePage } />

            {	/* Verifica si hay un usuario */}
            {	user === null &&
              <Route render={ () => <Redirect to="/reports" /> }  />
            }
          </Suspense>
      </Switch>
    </ThemeProvider>
  );
};

export default App ;

