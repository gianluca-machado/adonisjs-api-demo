'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Menu = use('App/Models/Menu');
const Database = use('Database');

/**
 * Resourceful controller for interacting with menus
 */
class MenuController {
  async all() {
    return await Menu
      .query()
      .orderBy('menus.order', 'asc')
      .paginate(1, 20);
  }
}

module.exports = MenuController;
