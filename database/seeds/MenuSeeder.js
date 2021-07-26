'use strict'

/*
|--------------------------------------------------------------------------
| MenuSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Menu = use('App/Models/Menu');
const menus = use('App/Constants/Menus').menus;

class MenuSeeder {
  async run() {
    await Menu.createMany(menus);
  }
}

module.exports = MenuSeeder;
