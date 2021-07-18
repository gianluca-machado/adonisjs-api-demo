'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const LanguageEnum = {
  EN: "en",
  PT_BR: "pt-BR",
};

class SettingSchema extends Schema {
  up() {
    this.create('settings', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('darkmode')
        .defaultTo(false)
        .notNullable();
      table.enum('language', Object.values(LanguageEnum))
        .defaultTo(LanguageEnum.EN)
        .notNullable();
      table.timestamps();
    })
  }

  down() {
    this.drop('settings');
  }
}

module.exports = SettingSchema
