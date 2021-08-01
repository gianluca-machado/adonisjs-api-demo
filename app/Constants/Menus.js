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
    route: '/menu/connections',
    title: 'menu.item.connections',
    icon_type: IconTypeEnum.DESKTOP,
    icon_theme: IconThemeEnum.OUTLINE,
    order: 2,
  },
  {
    route: '/menu/setting',
    title: 'menu.item.settings',
    icon_type: IconTypeEnum.SETTING,
    icon_theme: IconThemeEnum.OUTLINE,
    order: 3,
  },
  {
    route: '/login',
    title: 'menu.item.logout',
    icon_type: IconTypeEnum.LOGOUT,
    icon_theme: IconThemeEnum.OUTLINE,
    order: 1000,
  },
];

exports.menus = menus;
