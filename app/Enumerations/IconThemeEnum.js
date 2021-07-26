'use strict'

class IconThemeEnum {
  static get OUTLINE() {
    return 'outline';
  }
  static get FILL() {
    return 'fill';
  }
  static get TWOTONE() {
    return 'twotone';
  }
  static get values() {
    const objects = {
      OUTLINE: this.OUTLINE,
      FILL: this.FILL,
      TWOTONE: this.TWOTONE,
    };
    return Object.values(objects);
  }
}

module.exports = IconThemeEnum;
