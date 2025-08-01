/**
 * Represents a menu item.
 * @class
 */
class MenuItem {
  /**
   * @constructor
   * @param {Object} menuItemInfo
   * @param {string} menuItemInfo.name - The name of the menu item.
   * @param {string} menuItemInfo.path - The path of the menu item.
   * @param {Array<MenuItem>} menuItemInfo.subMenus - The sub menus of the menu item.
   * @param {Component} menuItemInfo.component - The component of the menu item.
   */
  constructor(menuItemInfo) {
    this.name = menuItemInfo.name;
    this.path = menuItemInfo.path;
    this.subMenus = menuItemInfo.subMenus || [];
    this.component = menuItemInfo.component || '';
    this.ignore = menuItemInfo.ignore || false;
    this.notExact = menuItemInfo.notExact || false;
    this.hide = menuItemInfo.hide || false;
    this.display = menuItemInfo.display !== undefined ? menuItemInfo.display : () => true;
    this.disableInBreadcrumb = menuItemInfo.disableInBreadcrumb || false;
  }

  /**
   * Gets the path of the menu item.
   * @function
   * @return {string} - the path of the menu item
   */
  getPath = () => `/${this.path}`;

  /**
   * Gets the sub menu item by its name.
   * @function
   * @param {string} menuName - the name of the sub menu item
   * @return {MenuItem | undefined} - the sub menu item
   */
  getSubMenu = (menuName) =>
    this.subMenus.find((menu) => menu.path === menuName);
}

export default MenuItem;
