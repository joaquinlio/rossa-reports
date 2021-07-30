
/**
 * @desc Guarda en el sessionStorage
 *
 * @param { String } key
 * @param { any } value 
 *
 * @return { Boolean }
 */
export const addStorage = (key, value) => {

    try {

        // Encriptamos los datos.

        let stringify   = typeof value !== "string" ? JSON.stringify( value ) : value;

        // Almacenamos los datos
        sessionStorage.setItem(key, stringify);

        return true;

    }catch (e) {

        // Lanzamos el mensaje de error
        console.error(e.stack)

        return false;

    }

}


/**
 * @desc Obtiene info del usuario
 *
 * @param { String } key
 * @param { Boolean } json
 *
 * @return { String }
 */
export const getStorage = ( key, json ) => {

    try {

        // Almacenamos los datos
        if(!sessionStorage.getItem(key)){
            return null;
        }else{

            // Obtengo el valor
            let value = sessionStorage.getItem(key);

            // Validamos el valor a mostrar.
            if( json )
                return JSON.parse( value );

            return value;
        }

    }catch (e) {

        // Lanzamos el mensaje de error
        console.error(e.stack);

        return null;

    }

};


/**
 * @desc Elimina item del sessionStorage
 *
 * @param { String } key
 *
 * @return { void }
 */
export const removeStorage = (key) => {

    // Validamos que exista el item
    if(sessionStorage.getItem(key)){

        // Eliminamos el item
        sessionStorage.removeItem(key);

    }

};

/**
 * @desc Metodo que borra todo el storage
 * 
 * @return { Void } 
 */
export const clearStorage = () => {
    try{
        sessionStorage.clear();
    }catch(err){
        console.log(err.stack)
    }
}

