class MenuRequest {
  constructor({
    menuName,
    menuType,
    parentMenuId,
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
    this.menu_name = menuName;
    this.menu_type = menuType;
    this.parent_menu_id = parentMenuId;
    this.controller = controller;
    this.action = action;
    this.url = url;
    this.param = param;
    this.sequence_number = sequenceNumber;
    this.is_visible = isVisible;
    this.is_creatable = isCreatable;
    this.is_updatable = isUpdatable;
    this.is_deletable = isDeletable;
    this.is_auditable = isAuditable;
    this.is_exportable = isExportable;
    this.is_existed = isExisted;
  }
}

export default MenuRequest;
