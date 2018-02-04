export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export function changeCurrentPage(title) {
  return { type: CHANGE_CURRENT_PAGE, title };
}
