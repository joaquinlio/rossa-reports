/**
 * @desc Backend
 */
export const Backend = {
    "HOST"      : process.env.BACKEND_API || "http://localhost:3001/",
    "APIKEY"    : "5dGp7PG47wCVRspbUiw2q6mSHEWONidv"
};

/**
 * @desc Mensajes de Errores HTTP
 */
export const MESSAGE_ERROR_HTTP = {
    400: "HTTP_ERROR_CODE_400",
    401: "HTTP_ERROR_CODE_401",
    403: "HTTP_ERROR_CODE_403",
    404: "HTTP_ERROR_CODE_404",
    500: "HTTP_ERROR_CODE_500",
    0: "HTTP_ERROR_UNKNOW"
}

/**
 * @desc Base de datos local
 */
export const DATABASE = {
    "name": "",
    "version": 1
};

// Calificaciones
export const QUALIFICATIONS = {

    DISSATISFIED: "Debe mejorar",
    NEUTRAL: "Aceptable",
    SATISFIED: "Muy bueno",
    YES: "Si",
    NO: "No"
  
};

// Locales
export const STORES = {
    ADROGUE: "ADROGUE",
    ALL: "ALL" 
};