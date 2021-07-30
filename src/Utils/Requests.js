/**
 * @desc Solicitudes.
 */
class Requests {
  /**
   * @desc Constructor de la utilidad.
   *
   * @return { void }
   */
  constructor() {
    // Conjunto de cabeceras
    this.headersArray = new Headers();

    // Cabeceras
    this.headersArray.append("Accept", "application/json");
  }

  /**
   * @desc Realiza una solicitud de metodo GET
   *
   * @param { String } endpoint
   * @param { Object } data
   * @param { String } responseType
   * @param { String } token
   *
   * @return { Promise }
   */
  async get(endpoint, data = {}, responseType = "json", token = false) {
    try {
      // Validamos si tenemos credenciales.
      if (typeof token === "string") {
        // Validamos si tiene un token de autenticación.
        this.headersArray.append("Authorization", "JWT " + token);
      }

      // Indicamos el tipo de solicitud
      this.headersArray.append("Content-Type", "application/json");

      // Cabeceras.
      let headers = this.headersArray,
        method = "GET",
        params = new URLSearchParams(data).toString(),
        cache = "default";

      // Armamos el requester
      let request = new Request(endpoint + (params ? "?" + params : ""), {
        method,
        headers,
        cache,
      });

      // Almacenamos las cabeceras de la respuesta.
      let responseHeader = null;

      // Realizamos la solicitud
      let response = await fetch(request);

      // Almacenamos las cabecera de la respuesta.
      responseHeader = response.headers;

      if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {
        // Respuesta parseada
        let responseParsed = await response[responseType]();

        // Asignamos a la respuesta las cabeceras.
        responseParsed.headers = responseHeader;

        // Parseamos la respuesta.
        return responseParsed;
      }

      return {status: response.status, exceptions: response.error }
    } catch (error) {
      // Rechazamos la solicitud.
      return error;
    }
  }

  /**
   * @desc Realiza una solicitud de metodo POST
   *
   * @param { String } endpoint
   * @param { String } responseType
   *
   * @return { Promise }
   */
  async post(endpoint, data, responseType = 'json', token = false, contentType = 'application/json' ) {
    try {

      // Indicamos la tipo de contenido.
      this.headersArray.append('Content-Type', contentType );

      // Validamos si tenemos credenciales.
      if( typeof token === "string" ){

        // Validamos si tiene un token de autenticación.
        this.headersArray.append('Authorization', "JWT "+ token );

      }

      // Cabeceras.
      let headers = this.headersArray,
        method = 'POST',
        body = JSON.stringify(data),
        cache = 'default';
          
      
      
      // Armamos el requester
      let request = new Request( endpoint, { method, headers, cache, body });

      // Realizamos la solicitud
      let response = await fetch( request );

      if( [200, 400, 401, 403, 404].indexOf( response.status ) > -1 ) {

        // Respuesta parseada
        let responseParsed = await response[responseType]();

        // Codigo
        responseParsed.code = response.status;

        // Parseamos la respuesta.
        return responseParsed;

      }

      return {status: response.status, exceptions: response.error }


    }catch( error ){

      // Rechazamos la solicitud.
      return error;

    }

  }

  /**
   * @desc Realiza una solicitud de metodo POST
   *
   * @param { String } endpoint
   * @param { String } responseType
   *
   * @return { Promise }
   */
  async put(endpoint, data, responseType = "json") {
    try {
      // Cabeceras.
      let headers = this.headersArray,
        method = "PUT",
        body = JSON.stringify(data),
        cache = "default";

      // Realizamos la solicitud
      let response = await fetch(endpoint, { method, headers, cache, body });

      if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {
        // Respuesta parseada
        let responseParsed = await response[responseType]();

        // Codigo
        responseParsed.code = response.status;

        // Parseamos la respuesta.
        return responseParsed;
      }

      return {status: response.status, exceptions: response.error }
    } catch (error) {
      // Rechazamos la solicitud.
      return error;
    }
  }

  /**
   * @desc Realiza una solicitud de metodo DELETE
   *
   * @param { String } endpoint
   * @param { String } responseType
   *
   * @return { Promise }
   */
  /* async delete(endpoint, data, responseType = "json") {
    try {
      this.headersArray.append("Content-Type", "application/json");

      // Cabeceras.
      let headers = this.headersArray,
        method = "DELETE",
        body = JSON.stringify(data),
        cache = "default";

      // Realizamos la solicitud
      let response = await fetchTimeout(
        endpoint,
        { method, headers, cache, body },
        3000,
        "Tiempo excedido para la solicitud."
      );

      if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {
        // Respuesta parseada
        let responseParsed = await response[responseType]();

        // Codigo
        responseParsed.code = response.status;

        // Parseamos la respuesta.
        return responseParsed;
      }

      return {status: response.status, exceptions: response.error }
    } catch (error) {
      // Rechazamos la solicitud.
      return error;
    }
  } */
}

export default Requests;
