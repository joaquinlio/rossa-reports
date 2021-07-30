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
const Moment                        = require( 'moment' );
const TerserPlugin                  = require( 'terser-webpack-plugin' );

// File of environment
let FileEnvironment = "";

switch( process.env.NODE_ENV ){
  case "development.test":
    FileEnvironment = "/test.env";
  break;
  case "test.cypress":
    FileEnvironment = "/dev.env";
  break;
  default: 
    FileEnvironment = "/dev.env";
}


// Importamos el .env
const EnvParsed = Dotenv.config({ "path": __dirname + FileEnvironment }).parsed;

// Insertamos el tiempo de creado
EnvParsed.APP_BUILD = "[Version] " + EnvParsed.APP_VERSION + " [Build] " + Moment().format("YYYYMMDD-HHmmss");

/**
 * @desc Recopilamos los modulos.
 */
const envKeys = Object.keys( EnvParsed ).reduce( ( prev, next ) => {

  prev[`process.env.${next}`] = JSON.stringify( EnvParsed[next] );
  return prev;

}, {});

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
  watch: true,

  /**
   * @desc Mapa del codigo
   */
  devtool: "cheap-module-eval-source-map",

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
    path: Path.resolve( __dirname, './public' ),

    /**
     * @desc Nombre del archivo compilado.
     */
    filename: '[name].js',

    publicPath: "/"

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
        include: Path.join(__dirname, '/src'),
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: { 
            presets: ['@babel/preset-env'],
            sourceMap: process.env.NODE_ENV !== "test.cypress"
          }
        }]
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
       * @desc File Loader: Imagenes
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
       * @desc File Loader: Fuentes
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
   * @desc Recarga en vivo.
   */
  devServer:{
    // Observa las modificaciones de la carpeta public.
    watchContentBase: true ,

    // Contenido servido.
    contentBase: Path.join(__dirname, 'public'),

    // Archivo de entrada para el servidor.
    index: 'index.html',

    // Puerto
    port: process.env.APP_PORT,

    // Recarga en vivo.
    hot: true,

    // Fallback del api de history
    historyApiFallback: true,

    // Esta propiedad activa la apertura de
    // el navegador al estar compilando.
    open: true,

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
     * @desc Insertamos las variables de entorno 
     */
    new Webpack.DefinePlugin( envKeys ),

    /**
     * @desc Genera el index.html
     */
    new HtmlWebpackPlugin({

      /**
       * @desc Titulo
       */
      title: 'Proseeker',

      /**
       * @desc Nombre del archivo de salida.
       */
      filename: 'index.html',

      /**
       * @desc Template
       */
      template: Path.resolve( __dirname, 'public/index.html' ),

      inject: true,

    }),

    /**
     * @desc Removedor de lenguajes de moment
     */
    new MomentLocalesPlugin({
      localesToKeep: ["es", "en", "br"]
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
    }),
    /**
     * @desc Actualización en vivo.
     */
    //new Webpack.HotModuleReplacementPlugin()    

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