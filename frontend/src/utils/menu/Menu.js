import { parsePath } from '../parsers/locationParser';

/**
 * Represents the menu of the website.
 * @class
 */
class Menu {
  /**
   * @constructor
   * @param {Array<MenuItem>} menu - the menu list of the website
   */
  constructor(menu) {
    this.menu = menu;
  }

  /**
   * Gets the menu list of the website.
   * @function
   * @return {Array<MenuItem>} - the menu list
   */
  getMenu = () => this.menu;

  /**
   * Gets the main menu item by its path.
   * @function
   * @param {string} mainMenuPath - the path of the main menu
   * @return {MenuItem} - the menu item of the main menu
   * @example
   * getMainMenu('human-resource')
   * returns the humanResourceMenu menu item
   */
  getMainMenu = (mainMenuPath) =>
    this.menu.find((menu) => menu.path === mainMenuPath);

  /**
   * Gets the menu item by the menu array.
   * @function
   * @param {Array<string>} menuArray - the list of menu names
   * @return {MenuItem} - the menu item
   * @example
   * getSubMenu('human-resource')
   * returns the humanResourceMenu menu item
   */
  getSubMenu = (menuArray) => {
    let subMenu;
    menuArray.every((path, index) => {
      if (index === 0) {
        subMenu = this.getMainMenu(path);
      } else if (subMenu !== undefined) {
        subMenu = subMenu.getSubMenu(path);
      }
      return subMenu !== undefined;
    });
    return subMenu;
  };

  /**
   * Gets the path of the menu item by the menu array.
   * @function
   * @param {Array<string>} menuArray - the list of menu names
   * @return {string} - the path of the menu item
   * @example
   * getMenuPath(['human-resource', 'administration'])
   * returns the administration menu item
   */
  getMenuPath = (menuArray) => {
    let subMenuPath = '';
    let subMenu;
    menuArray.forEach((path, index) => {
      if (index === 0) {
        subMenu = this.getMainMenu(path);
      } else {
        subMenu = subMenu.getSubMenu(path);
      }
      if (subMenu !== undefined) {
        subMenuPath += subMenu.getPath();
      }
    });
    return subMenuPath;
  };

  /**
   * Gets the name of the menu item by the menu array.
   * @function
   * @param {Array<string>} menuArray - the list of menu names
   * @return {string} - the name of the menu item
   * @example
   * getMenuName(['human-resource', 'administration'])
   * returns '人力管理'
   */
  getMenuName = (menuArray) => {
    let name = '';
    if (menuArray[0] === '') return name;
    let subMenu;
    const { length } = menuArray;
    menuArray.forEach((path, index) => {
      if (index === 0) {
        subMenu = this.getMainMenu(path);
      } else if (subMenu !== undefined) {
        subMenu = subMenu.getSubMenu(path);
      }
      if (index === length - 1 && subMenu !== undefined) {
        name = subMenu.name;
      }
    });
    return name;
  };

  /**
   * Gets the menu item by location path.
   * @function
   * @param {string} path - the location path of the menu item
   * @return {MenuItem} - the menu item
   * @example
   * getMenuByPath('/human-resource/administration')
   * returns the administration menu item
   */
  getMenuByPath = (path) => {
    const menuArray = parsePath(path);
    return this.getSubMenu(menuArray);
  };
}

export default Menu;
