export const APP_DRAWER_TOGGLE = 'APP_DRAWER_TOGGLE';

export function appDrawerToggle(isOpened) {
  return { type: APP_DRAWER_TOGGLE, isOpened };
}
