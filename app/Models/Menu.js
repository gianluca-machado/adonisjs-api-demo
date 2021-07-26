'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Menu extends Model {
  static getPropertiesToUpdate() {
    return [
      'route',
      'title',
      'icon_type',
      'icon_theme',
      'order',
    ];
  }

  static get hidden() {
    return [];
  }

  static get visible() {
    return this.getPropertiesToUpdate();
  }
}

module.exports = Menu;
