/**
 * @desc Metodo para administrar los codigos Http
 * 
 * @param  { Object } response
 * @param  { Function } callback
 * @param  { Function } fallback
 * 
 * @return { Promise<Boolean> }
 */
export const validateHttpResponse = ( response, callback, fallback, isReconnect = true ) => {
    try{

        // Validamos que se haya procesado correctamente.
        if( response.hasOwnProperty("status") && response.status === 200) {

            callback();

            return true;

        }else if( response.hasOwnProperty("status") ){

            // Disparamos el reintento de login.
            //isReconnect && response?.status === 401 && await this.reconnect();

            // Lanzamos la función de error.
            fallback( response.status );

            return false; 

        }

        fallback( null );

    }catch( error ){

        // Informamos el error
        fallback( error );

        return false;

    }

}