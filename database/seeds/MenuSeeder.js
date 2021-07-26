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
const IconThemeEnum = use('App/Enumerations/IconThemeEnum');
const IconTypeEnum = use('App/Enumerations/IconTypeEnum');

const menus = [{
    route: '/menu/dashboard',
    title: 'menu.item.dashboard',
    icon_type: IconTypeEnum.DASHBOARD,
    icon_theme: IconThemeEnum.OUTLINE,
    order: 1,
  },
  {
    route: '/menu/setting',
    title: 'menu.item.settings',
    icon_type: IconTypeEnum.SETTING,
    icon_theme: IconThemeEnum.OUTLINE,
    order: 2,
  },
  {
    route: '/login',
    title: 'menu.item.logout',
    icon_type: IconTypeEnum.LOGOUT,
    icon_theme: IconThemeEnum.OUTLINE,
    order: 3,
  },
];

class MenuSeeder {
  async run() {
    await this.createMenus();
  }

  createMenus() {
    return Menu.createMany(menus);
  }
}

module.exports = MenuSeeder;
