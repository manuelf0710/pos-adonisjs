'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});
Route.group(() => {
    //Route.get('modulos', 'ModuloController.index');
}).middleware('auth');

Route.group('auth', () => {
  Route.post('auth/login','AuthController.login');
})

Route.group('pos', () => {
  Route.post('categoriaslist', 'pos/CategoriaController.listado');
  Route.get('categorias', 'pos/CategoriaController.index');
  Route.post('categorias', 'pos/CategoriaController.store');
  
  Route.post('productoslist', 'pos/ProductoController.listado');
  Route.get('productos/barras/:codigo', 'pos/ProductoController.getBarcode');
  
  //Route::post('ventaslist', 'pos/VentaController.listado');
}).prefix('pos');

//Route.post('pos/categoriaslist', 'pos/CategoriaController.listado');


Route.get('modulos', 'ModuloController.index');