'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const IconThemeEnum = use('App/Enumerations/IconThemeEnum');
const IconTypeEnum = use('App/Enumerations/IconTypeEnum');

class MenuSchema extends Schema {
  up() {
    this.create('menus', (table) => {
      table.increments();
      table.string('route', 254)
        .notNullable()
        .unique();
      table.string('title', 254)
        .notNullable();
      table.enum('icon_type', IconTypeEnum.values)
        .notNullable();
      table.enum('icon_theme', IconThemeEnum.values)
        .defaultTo(IconThemeEnum.OUTLINE)
        .notNullable();
      table.integer('order')
        .unsigned()
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('menus')
  }
}

module.exports = MenuSchema
