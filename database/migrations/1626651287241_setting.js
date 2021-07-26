'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const LanguageEnum = use('App/Enumerations/LanguageEnum');

class SettingSchema extends Schema {
  up() {
    this.create('settings', (table) => {
      table.increments();
      table.integer('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('darkmode')
        .defaultTo(false)
        .notNullable();
      table.enum('language', LanguageEnum.values)
        .defaultTo(LanguageEnum.EN)
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('settings');
  }
}

module.exports = SettingSchema
