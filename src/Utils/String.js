
/**
 * @desc Capitaliza un string.
 * 
 * @param { String } text
 * 
 * @return { String }
 */
export const Capitalize = function( text ) {
    try{

        text = text.toLowerCase();
        return text.replace(/([^ -])([^ -]*)/gi,function(v,v1,v2){ return v1.toUpperCase()+v2; });
    
    }catch( error ){

        // Logueamos el error.
        console.log( error );
        
        return null;

    }

}
