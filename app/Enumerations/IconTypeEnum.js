'use strict'

class IconTypeEnum {
  static get DASHBOARD() {
    return 'dashboard';
  }
  static get SETTING() {
    return 'setting';
  }
  static get LOGOUT() {
    return 'logout';
  }
  static get DESKTOP() {
    return 'desktop';
  }
  static get values() {
    const objects = {
      DASHBOARD: this.DASHBOARD,
      SETTING: this.SETTING,
      LOGOUT: this.LOGOUT,
      DESKTOP: this.DESKTOP,
    };
    return Object.values(objects);
  }
}

module.exports = IconTypeEnum;
