/**
 * @desc Dependencias
 */
const Path                          = require( 'path' );
const Webpack                       = require( 'webpack' );
const HtmlWebpackPlugin             = require( 'html-webpack-plugin' );
const Dotenv                        = require( 'dotenv' );
const MomentLocalesPlugin           = require( 'moment-locales-webpack-plugin' );
const ImageminWebpWebpackPlugin     = require( 'imagemin-webp-webpack-plugin' );
const WebpackBar                    = require( 'webpackbar' );
const WebpackMonitor                = require( 'webpack-monitor' );
const TerserPlugin                  = require( 'terser-webpack-plugin' );
const Moment                        = require( 'moment' );
const { ESBuildPlugin }             = require('esbuild-loader')


// File of environment
let FileEnvironment = "";

switch( process.env.NODE_ENV ){
  case "production.CI":
    FileEnvironment = "/dev.env";
  break;
  default: 
    FileEnvironment = "/prod.env";
}


// Importamos el .env
const EnvParsed = Dotenv.config({ "path": __dirname + FileEnvironment }).parsed;

// Insertamos el tiempo de creado
EnvParsed.APP_BUILD = "[Version] " + EnvParsed.APP_VERSION + " [Build] " + Moment().format("YYYYMMDD-HHmmss");

/**
 * @desc Recopilamos los modulos.
 */
let envKeys = Object.keys( EnvParsed ).reduce( ( prev, next ) => {

  prev[`process.env.${next}`] = JSON.stringify( EnvParsed[next] );
  return prev;

}, {});

/**
 * @desc Parametros minimos requeridos 
 */
if( process.env.MODE === "custom" ){

  // Insertamos el tiempo de creado
  process.env.ORIGIN_TIME = Moment().format("YYYYMMDD-HHmmss");

  // Requisitos
  const required = {
    "BACKEND_API": process.env.BACKEND_API,
    "BACKEND_API_EXPRESSION": process.env.BACKEND_API_EXPRESSION,
    "BACKEND_VERSION": process.env.BACKEND_VERSION,
    "BASE_URL": "https://pastarossa.nicolasaugustolio.com.ar/reports"
  };

  // Reemplazamos las variables del prod.env por las de linea de comando
  Object.keys( required ).reduce( ( prev, next ) => {

      envKeys[`process.env.${next}`] = JSON.stringify( required[next] );

      return prev;
    
  }, {})
  

}

/**
 * @desc Agrega la contra barra
 * 
 * @param { String } url 
 * 
 * @param { String }
 */
const addBackSlash = ( url ) => url.replace( /\//g, "\/" );

/**
 * @desc Exportamos la configuración de webpack.
 */
module.exports = {

  /**
   * @desc Observa los cambios del webpack.
   */
  watch: false,

  /**
   * @desc Mapa del codigo
   */
  devtool: false,

  /**
   * @desc Archivo principal de la aplicación.
   */
  entry: [ '@babel/polyfill', Path.resolve( __dirname, './src/index.jsx' )],

  /**
   * @desc Configuración de salida.
   */
  output: {

    /**
     * @desc Carpeta de salida
     */
    path: Path.resolve( __dirname, './dist' ),

    /**
     * @desc Nombre del archivo compilado.
     */
    filename: '[name].js',

    /**
     * @desc Carpeta publica
     */
    publicPath: "https://pastarossa.nicolasaugustolio.com.ar/reports" + "/"

  },

  /**
   * @desc Resolvemos las extensiones comunes
   */
  resolve: {
    extensions: [ '.js', '.jsx', '.json']
  },

  /**
   * @desc Modulos
   */
  module: {
    rules: [

      /**
       * @desc Loader: Js
       */
      {
        test: /\.(js|jsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx', // Remove this if you're not using JSX
          target: 'es2015' // Syntax to compile to (see options below for possible values)
        }
      },

      /**
       * @desc Url Loader
       * @type's images, fonts
       */
      {
        test: /\.( png | jpg | jpeg | gif  | ttf | woff | eot | webp | x-icon )$/i, 
        use: 'url-loader'
      },

      /**
       * @desc File Loader: Musica
       */
      {
        test: /\.(mp3)$/i,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/sounds'
        }
      },

      /**
       * @desc File Loader
       */
      {
        test: /\.(jpe?g|png|gif|webp)$/i,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/img'
        }
      },
      
      /**
       * @desc File Loader
       */
      {
        test: /\.(ttf|eot|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/css/fonts'
        }
      },
      {
        test: /\.svg$/,
        enforce: "pre",
        use: ['@svgr/webpack'],
      },

    ]
  },

  /**
   * @desc Plugin's
   */
  plugins: [

    /**
     * @desc Barra de progreso de webpack
     */
    new WebpackBar(),

    /**
     * @desc Esbuild Plugin
     */
    new ESBuildPlugin(),

    (
      process.env.NODE_ENV === "performance" 
      ? new WebpackMonitor({
          capture: true,
          launch: true,
        })
      : () => {}
    ),

    /**
     * @desc Removedor de lenguajes de moment
     */
    new MomentLocalesPlugin({
      localesToKeep: ["es", "en", "pt-br"]
    }),

    /**
     * @desc Define las variables
     */
    new Webpack.DefinePlugin( envKeys ),

    /**
     * @desc Genera el index.html
     */
    new HtmlWebpackPlugin({

      /**
       * @desc Titulo
       */
      title: 'Pasta rossa',

      /**
       * @desc Nombre del archivo de salida.
       */
      filename: 'index.html',

      /**
       * @desc Template
       */
      template: Path.resolve( __dirname, 'public/index.html' ),

      inject: true

    }),      
      /**
       * @desc Plugin de conversion de imagenes
       */
      new ImageminWebpWebpackPlugin({
        "config": [{
          "test": /\.(jpe?g|png)/,
          "options": {
            "quality":  100
          }
        }],
        "overrideExtension": true,
        "detailedLogs": true,
        "silent": false,
        "strict": true
      })      
  ],

  /**
   * @desc Optmización
   */
  optimization: {
    minimize: process.env.PARALLEL == "true" ? true : false,
    minimizer: [
      new TerserPlugin({
        parallel: process.env.PARALLEL == "true" ? true : false,
        exclude: /\/node_modules/
      }),
    ],
  },

};