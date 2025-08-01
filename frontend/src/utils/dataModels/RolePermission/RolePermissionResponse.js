class RolePermissionResponse {
  constructor({
    id,
    urlEntrypoint,
    permissionName,
    displayName,
    isPostable,
    isPutable,
    isDeletable,
    isReadable,
  }) {
    this.id = id;
    this.urlEntrypoint = urlEntrypoint;
    this.permissionName = permissionName;
    this.displayName = displayName;
    this.isPostable = isPostable;
    this.isPutable = isPutable;
    this.isDeletable = isDeletable;
    this.isReadable = isReadable;
  }
}

export default RolePermissionResponse;
