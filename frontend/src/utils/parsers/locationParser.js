/**
 * Parse location pathname into string array
 * @param {string} path - the location pathname
 * @return {Array<string>} - the string array of the location
 */
export const parsePath = (path) => {
  const detail = 'detail';
  const edit = 'edit';
  let menuPath = path;
  let remainPath = '';
  if (path.includes(`/${detail}`) || path.includes(`/${edit}`)) {
    const category = path.includes(`/${detail}`) ? detail : edit;
    [menuPath, remainPath] = path.split(`/${category}`);
    remainPath = `${category}${remainPath}`;
  }
  const menuArray = menuPath.split('/');
  menuArray.splice(0, 1);
  if (remainPath !== '') menuArray.push(remainPath);
  return menuArray;
};

/**
 * Parse string array to location pathname
 * @param {Array<string>} stringArray - the location pathname
 * @return {string} - the target location pathname
 */
export const parseStringArrayToPath = (stringArray) => stringArray.join('/');

export default {};
