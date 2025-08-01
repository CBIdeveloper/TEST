import MenuType from '../../constants/MenuType';

class MenuResponse {
  constructor({
    id,
    menuName,
    menuType,
    parentMenuId,
    parentMenu,
    controller,
    action,
    url,
    param,
    sequenceNumber,
    isVisible,
    isCreatable,
    isUpdatable,
    isDeletable,
    isAuditable,
    isExportable,
    isExisted,
  }) {
    const menuItem = MenuType.find((item) => item.value === menuType);

    this.id = id;
    this.menuName = menuName;
    this.menuType = menuType;
    this.parentMenuId = parentMenuId;
    this.parentMenu = parentMenu === null ? '' : parentMenu.menuName;
    this.controller = controller;
    this.action = action;
    this.url = url;
    this.param = param;
    this.sequenceNumber = sequenceNumber;
    this.isVisible = isVisible;
    this.isCreatable = isCreatable;
    this.isUpdatable = isUpdatable;
    this.isDeletable = isDeletable;
    this.isAuditable = isAuditable;
    this.isExportable = isExportable;
    this.isExisted = isExisted;

    this.menuTypeString = menuItem === undefined ? '' : menuItem.text;
  }
}

export default MenuResponse;
