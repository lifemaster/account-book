export default {
  admin: [
    {
      title: 'Главная',
      iconName: 'home',
      route: '/'
    },
    {
      title: 'Admin menu item 2',
      iconName: 'home',
      nestedItems: [
        {
          title: 'Admin subitem 1',
          iconName: 'supervisor_account',
          route: '/admin-menu-subitem-1'
        },
        {
          title: 'Admin subitem 2',
          iconName: 'supervisor_account',
          route: '/admin-menu-subitem-2'
        },
        {
          title: 'Admin subitem 3',
          iconName: 'supervisor_account',
          route: '/admin-menu-subitem-3'
        }
      ]
    },
    {
      title: 'Admin menu item 3',
      iconName: 'copyright',
      route: '/admin-menu-item-3'
    },
    {
      title: 'Admin menu item 4',
      iconName: 'favorite',
      route: '/admin-menu-item-4'
    },
    {
      title: 'Admin menu item 5',
      iconName: 'face',
      route: '/admin-menu-item-5'
    }
  ],
  user: [
    {
      title: 'Главная',
      iconName: 'home',
      route: '/'
    },
    {
      title: 'User menu item 2',
      iconName: 'home',
      route: '/user-menu-item-2'
    },
    {
      title: 'User menu item 3',
      iconName: 'copyright',
      route: '/user-menu-item-3'
    },
    {
      title: 'User menu item 4',
      iconName: 'favorite',
      route: '/user-menu-item-4'
    },
    {
      title: 'User menu item 5',
      iconName: 'face',
      route: '/user-menu-item-5'
    }
  ]
};
