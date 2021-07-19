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
const Route = use('Route');
const Env = use('Env');

Route.get('/', _ => Env.get('APP_NAME'));

// users controller
Route.post('/users', 'UserController.create')
  .validator('StoreUserValidator');
Route.get('/users/:id', 'UserController.show')
  .middleware(['auth']);

// sessions controller
Route.post('/sessions', 'SessionController.create');
Route.post('/sessions/validate', 'SessionController.validate')
  .middleware(['auth']);

// setting controller
Route.get('/setting', 'SettingController.index')
  .middleware(['auth']);
Route.post('/setting', 'SettingController.create')
  .validator(['StoreSettingValidator'])
  .middleware(['auth']);
Route.get('/setting/:id', 'SettingController.show')
  .middleware(['auth']);
Route.put('/setting/:id', 'SettingController.update')
  .middleware(['auth', 'validateUserId:Setting']);
Route.delete('/setting/:id', 'SettingController.destroy')
  .middleware(['auth', 'validateUserId:Setting']);
Route.get('/setting-by-user', 'SettingController.settingByUser')
  .middleware(['auth']);
