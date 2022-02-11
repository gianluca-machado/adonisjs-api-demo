'use strict'

class LanguageEnum {
  static get EN() {
    return 'EN';
  }
  static get PT_BR() {
    return 'PT-BR';
  }
  static get values() {
    const objects = {
      EN: this.EN,
      PT_BR: this.PT_BR,
    };
    return Object.values(objects);
  }
}

module.exports = LanguageEnum;
